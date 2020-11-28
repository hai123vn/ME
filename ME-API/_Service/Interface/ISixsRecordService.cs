using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API.DTO;
using ME_API.Helpers;

namespace ME_API._Service.Interface
{
    public interface ISixsRecordService
    {
        Task<PagedList<SixsScoreRecordDto>> GetListSixsScoreRecord(PaginationParams paginationParams, ScoreRecordParam scoreRecordParam, bool isPaging = true);
        Task<List<string>> GetBrandBySixs();
        Task<object> GetAuditTypeByBrandBySixs(string brand);
        Task<List<string>> GetAuditType1BySixs();
    }
}