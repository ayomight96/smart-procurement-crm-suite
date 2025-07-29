namespace ProcurementAPI.Models;

public class PredictionResult
{
    public bool Selected { get; set; }
    public float Probability { get; set; }
    public float LogitSum { get; set; }
    public float ProbabilityFromLogit { get; set; }
    public Explanation Explanation { get; set; }
    public string ConfidenceLevel { get; set; }
}