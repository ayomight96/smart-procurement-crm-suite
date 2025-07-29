namespace ProcurementAPI.Models;

public class PreferredSupplierResponse
{
    public string PreferredSupplier { get; set; }
    public string ComparisonConfidence { get; set; }
    public List<SupplierPredictionView> RankedSuppliers { get; set; }
}