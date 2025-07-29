using Microsoft.AspNetCore.Mvc;
using ProcurementAPI.Models;
using ProcurementAPI.Functions;
using System.Text.Json;

namespace ProcurementAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PredictController : ControllerBase
    {
        private readonly ILogger<PredictController> _logger;
        private readonly HttpClient _httpClient;

        public PredictController(ILogger<PredictController> logger, IHttpClientFactory httpClientFactory)
        {
            _logger = logger;
            _httpClient = httpClientFactory.CreateClient("ModelServiceClient");
        }

        [HttpPost("predict")]
        public async Task<IActionResult> Predict([FromBody] SupplierFeatures features)
        {
            var payload = SupplierMapper.ToPythonPayload(features);
            var response = await _httpClient.PostAsJsonAsync("/predict", payload);

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());

            var json = await response.Content.ReadFromJsonAsync<JsonElement>();
            var result = SupplierMapper.ToPredictionResult(json);

            return Ok(result);
        }

        [HttpPost("compare-suppliers")]
        public async Task<IActionResult> Compare([FromBody] List<SupplierFeatures> suppliers)
        {
            var payload = SupplierMapper.ToPythonBulkPayload(suppliers);
            var response = await _httpClient.PostAsJsonAsync("/bulk-predict", payload);

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());

            var json = await response.Content.ReadFromJsonAsync<JsonElement>();
            var predictionResults = SupplierMapper.ToPredictionResultList(json);

            if (predictionResults == null || predictionResults.Count == 0)
                return BadRequest("No predictions returned.");

            var enriched = SupplierMapper.PairSuppliersWithResults(suppliers, predictionResults);

            var sorted = enriched
                .OrderByDescending(p => p.Probability)
                .ThenByDescending(p => p.LogitSum)
                .ToList();

            var top = sorted[0];
            var second = sorted.Count > 1 ? sorted[1] : top;

            var confidence = MathF.Abs(top.Probability - second.Probability); // ✅ main logic

            return Ok(new PreferredSupplierResponse
            {
                PreferredSupplier = top.SupplierName,
                ComparisonConfidence = SupplierMapper.GetConfidenceLevel(confidence),
                RankedSuppliers = sorted
            });
        }
    }
}