using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API.DTO;
using ME_API.Helpers;
using ME_API.ViewModel;

namespace ME_API._Service.Interface
{
    public interface IAuditRecDService : IMEService<AuditRecDDto>
    {
        Task<PagedList<AuditRecDto>> GetAllAuditRecViewModel(PaginationParams param);
        Task<List<string>> GetAllStatus();
        Task<PagedList<AuditRecDto>> SearchByModel(PaginationParams param, AuditRecSearch model);
        Task<List<AuditPicDDto>> GetAllExcel();
        Task<List<AuditPicDDto>> SearchExcel(AuditRecSearch model, string WT = "1");
        Task<bool> AddRecD(AuditRecDDto model);
        Task<bool> UpdateRecD(AuditRecDDto model);
        Task<AuditRecDDto>  GetRecDById(string record_ID, int item_no);
        Task<AuditPicDDto> GetById(string record_ID);
        Task<List<ImproveProjectDto>> ImproveProjectRecordsImplementedRateThisMonth();
        Task<List<ImproveProjectDto>> ImproveProjectRecordImplementedRateLastMonth();
        Task<List<string>> GetListMail(string line);
    }
}