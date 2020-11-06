using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API.DTO;

namespace ME_API._Service.Interface
{
    public interface IMesMoService
    {
        Task<List<string>> GetAllModelNo();
        Task<string> GetModelName(string modelNo);
    }
}