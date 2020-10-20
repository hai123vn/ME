using System.Threading.Tasks;
using ME_API.DTO;

namespace ME_API._Service.Interface
{
    public interface IBrandService : IMEService<BrandDto>
    {
        Task<bool> CheckBrandExists(string brandId);    
    }
}