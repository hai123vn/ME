using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API.DTO;
using ME_API.Helpers;

namespace ME_API._Service.Interface
{
    public interface ISMEReportService
    {
        Task<PagedList<SMEScoreRecordDto>> GetListSMEScoreRecord(PaginationParams paginationParams, ScoreRecordParam scoreRecordParam, bool isPaging = true);
        Task<List<string>> GetAuditType1BySME();
    }
}