using System.Collections.Generic;
using System.Threading.Tasks;
using ME_API.DTO;

namespace ME_API._Service.Interface
{
    public interface IAuditRateService
    {
        Task<List<ScoreRecordQuesDto>> GetListQuesScoreRecord(string auditTypeId);
        Task<bool> SaveScopeRecord(ScoreRecordAnsDto param);
        Task<string> GetRecordIdRate();
        Task<ScoreRecordDetailDto> GetScoreRecoreDetail(string recordId);
        Task<object> GetLanguage(string user);
        Task<bool> UpdateListScopeRecordDetail(List<AuditRateDDto> listModel, string updateBy);
    }
}