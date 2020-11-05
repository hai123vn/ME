using System.Threading.Tasks;

namespace ME_API._Service.Interface
{
    public interface IMesOrgService
    {
        Task<object> GetAllPDC();
        Task<object> GetAllBuilding(string pdc);
        Task<object> GetAllLineID(string pdc, string building);
    }
}