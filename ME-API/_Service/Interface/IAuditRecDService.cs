using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API.DTO;
using ME_API.Helpers;
using ME_API.ViewModel;

namespace ME_API._Service.Interface
{
    public interface IAuditRecDService : IMEService<AuditRecDDto>
    {
        Task<PagedList<AuditRecDDto>> GetAllAuditRecViewModel(PaginationParams param);
        Task<List<string>> GetAllStatus();
    }
}