using ProcurementAPI.Models;

public class SupplierPredictionView
{
    public string SupplierName { get; set; }
    public bool Selected { get; set; }
    public float Probability { get; set; }
    public float LogitSum { get; set; }
    public float ProbabilityFromLogit { get; set; }
    public Explanation Explanation { get; set; }
}