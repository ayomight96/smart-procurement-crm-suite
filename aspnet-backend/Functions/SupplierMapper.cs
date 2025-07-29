using System.Text.Json;
using ProcurementAPI.Models;

namespace ProcurementAPI.Functions
{
    public static class SupplierMapper
    {
        public static object ToPythonPayload(SupplierFeatures supplier) => new
        {
            avg_unit_price = supplier.AverageUnitPrice,
            avg_delivery_days = supplier.AverageDeliveryDays,
            rating = supplier.Rating,
            defect_rate = supplier.DefectRate
        };

        public static IEnumerable<object> ToPythonBulkPayload(List<SupplierFeatures> suppliers) =>
            suppliers.Select(ToPythonPayload);

        public static PredictionResult ToPredictionResult(JsonElement element)
        {
            var probability = element.GetProperty("probability").GetSingle();

            return new PredictionResult
            {
                Selected = element.GetProperty("selected").GetBoolean(),
                Probability = probability,
                LogitSum = element.GetProperty("logit_sum").GetSingle(),
                ProbabilityFromLogit = element.GetProperty("probability_from_logit").GetSingle(),
                Explanation = ParseExplanationTyped(element.GetProperty("explanation_logit_contributions")),
                ConfidenceLevel = GetConfidenceLevel(probability)
            };
        }

        public static Explanation ParseExplanationTyped(JsonElement element) => new()
        {
            AverageUnitPrice = element.GetProperty("avg_unit_price").GetSingle(),
            AverageDeliveryDays = element.GetProperty("avg_delivery_days").GetSingle(),
            Rating = element.GetProperty("rating").GetSingle(),
            DefectRate = element.GetProperty("defect_rate").GetSingle()
        };

        public static List<PredictionResult> ToPredictionResultList(JsonElement root) =>
            root.EnumerateArray().Select(ToPredictionResult).ToList();

        public static List<SupplierPredictionView> PairSuppliersWithResults(
            List<SupplierFeatures> suppliers,
            List<PredictionResult> predictions)
        {
            var combined = new List<SupplierPredictionView>();

            for (int i = 0; i < suppliers.Count && i < predictions.Count; i++)
            {
                combined.Add(new SupplierPredictionView
                {
                    SupplierName = suppliers[i].SupplierName,
                    Selected = predictions[i].Selected,
                    Probability = predictions[i].Probability,
                    LogitSum = predictions[i].LogitSum,
                    ProbabilityFromLogit = predictions[i].ProbabilityFromLogit,
                    Explanation = predictions[i].Explanation
                });
            }

            return combined;
        }

        public static object ToJson(PredictionResult result) => new
        {
            selected = result.Selected,
            probability = result.Probability,
            logit_sum = result.LogitSum,
            probability_from_logit = result.ProbabilityFromLogit,
            explanation_logit_contributions = new
            {
                avg_unit_price = result.Explanation.AverageUnitPrice,
                avg_delivery_days = result.Explanation.AverageDeliveryDays,
                rating = result.Explanation.Rating,
                defect_rate = result.Explanation.DefectRate
            }
        };

        public static string GetConfidenceLevel(float probability) => probability switch
        {
            >= 0.95f => "Very High",
            >= 0.85f => "High",
            >= 0.70f => "Medium",
            _ => "Low"
        };
    }
}