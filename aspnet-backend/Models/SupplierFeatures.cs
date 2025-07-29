namespace ProcurementAPI.Models;

public class SupplierFeatures
{
    public string SupplierName { get; set; }
    public float AverageUnitPrice { get; set; }
    public float AverageDeliveryDays { get; set; }
    public float Rating { get; set; }
    public float DefectRate { get; set; }
}