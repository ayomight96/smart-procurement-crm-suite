using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using ProcurementAPI.Controllers;
using ProcurementAPI.Models;
using Xunit;

namespace ProcurementAPI.Tests.Controllers
{
    public class PredictControllerTests
    {
        private readonly Mock<ILogger<PredictController>> _loggerMock = new();
        private readonly Mock<IHttpClientFactory> _httpClientFactoryMock = new();
        private readonly HttpClient _mockHttpClient;

        public PredictControllerTests()
        {
            var handler = new MockHttpMessageHandler();
            _mockHttpClient = new HttpClient(handler)
            {
                BaseAddress = new Uri("http://localhost:8000")
            };
            _httpClientFactoryMock.Setup(f => f.CreateClient("ModelServiceClient"))
                                  .Returns(_mockHttpClient);
        }

        [Fact]
        public async Task Predict_ReturnsCorrectPredictionResult()
        {
            // Arrange
            var supplier = new SupplierFeatures
            {
                SupplierName = "Gamma Inc",
                AverageUnitPrice = 4.9f,
                AverageDeliveryDays = 2,
                Rating = 4.6f,
                DefectRate = 0.01f
            };

            var json = """
            {
                "selected": true,
                "probability": 0.91,
                "logit_sum": 3.45,
                "probability_from_logit": 0.94,
                "explanation_logit_contributions": {
                    "avg_unit_price": 1.1,
                    "avg_delivery_days": 1.2,
                    "rating": 0.8,
                    "defect_rate": 0.35
                }
            }
            """;

            MockHttpMessageHandler.SetMockResponse("/predict", json);

            var controller = new PredictController(_loggerMock.Object, _httpClientFactoryMock.Object);

            // Act
            var result = await controller.Predict(supplier);

            // Assert
            var ok = result as OkObjectResult;
            ok.Should().NotBeNull();
            var prediction = ok!.Value as PredictionResult;
            prediction.Should().NotBeNull();
            prediction!.Selected.Should().BeTrue();
            prediction.Probability.Should().Be(0.91f);
        }

        [Fact]
        public async Task Compare_ReturnsPreferredSupplier_FromBulkPredict()
        {
            var suppliers = new List<SupplierFeatures>
            {
                new SupplierFeatures { SupplierName = "Alpha", AverageUnitPrice = 5.0f, AverageDeliveryDays = 2, Rating = 4.7f, DefectRate = 0.02f },
                new SupplierFeatures { SupplierName = "Beta", AverageUnitPrice = 4.5f, AverageDeliveryDays = 1, Rating = 4.8f, DefectRate = 0.01f }
            };

            var json = """
            [
                {
                    "selected": true,
                    "probability": 0.9,
                    "logit_sum": 3.2,
                    "probability_from_logit": 0.95,
                    "explanation_logit_contributions": {
                        "avg_unit_price": 1.1,
                        "avg_delivery_days": 1.5,
                        "rating": 0.9,
                        "defect_rate": 0.3
                    }
                },
                {
                    "selected": false,
                    "probability": 0.6,
                    "logit_sum": 2.1,
                    "probability_from_logit": 0.85,
                    "explanation_logit_contributions": {
                        "avg_unit_price": 0.9,
                        "avg_delivery_days": 1.0,
                        "rating": 0.5,
                        "defect_rate": 0.2
                    }
                }
            ]
            """;

            MockHttpMessageHandler.SetMockResponse("/bulk-predict", json);

            var controller = new PredictController(_loggerMock.Object, _httpClientFactoryMock.Object);

            // Act
            var result = await controller.Compare(suppliers);

            // Assert
            var ok = result as OkObjectResult;
            ok.Should().NotBeNull();

            var dto = ok!.Value as PreferredSupplierResponse;
            dto.Should().NotBeNull();
            dto!.PreferredSupplier.Should().Be("Alpha");
            dto.RankedSuppliers.Count.Should().Be(2);
        }
    }
}