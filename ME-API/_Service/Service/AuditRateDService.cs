using System.Threading.Tasks;
using AutoMapper;
using ME_API._Repositories.Interfaces;
using ME_API._Service.Interface;
using ME_API.DTO;
using ME_API.Models;

namespace ME_API._Service.Service
{
    public class AuditRateDService : IAuditRateDService
    {
        private readonly MapperConfiguration _config;
        private readonly IAuditRateDRepository _repoRateD;
        private readonly IMapper _mapper;
        public AuditRateDService(IAuditRateDRepository repoRateD, IMapper mapper, MapperConfiguration config)
        {
            _mapper = mapper;
            _repoRateD = repoRateD;
            _config = config;
        }

        public async Task<bool> Add(AuditRateDDto model)
        {
            var auditRecD = _mapper.Map<MES_Audit_Rate_D>(model);
            _repoRateD.Add(auditRecD);
            return await _repoRateD.SaveAll();
        }

        public async Task<bool> UpdateUploadPicture(string recordId, string auditItemId, string uploadPicture)
        {
            var auditRateD = _repoRateD.FindSingle(x => x.Record_ID == recordId && x.Audit_Item_ID == auditItemId);
            if (auditRateD != null)
            {
                auditRateD.Upload_Picture = uploadPicture;
                _repoRateD.Update(auditRateD);
                return await _repoRateD.SaveAll();
            }
            else
            {
                return false;
            }
        }
    }
}