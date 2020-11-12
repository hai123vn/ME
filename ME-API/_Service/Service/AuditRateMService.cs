using System.Threading.Tasks;
using AutoMapper;
using ME_API._Repositories.Interfaces;
using ME_API._Service.Interface;
using ME_API.DTO;
using ME_API.Models;

namespace ME_API._Service.Service
{
    public class AuditRateMService : IAuditRateMService
    {
        private readonly IAuditRateMRepository _repoRateM;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _config;

        public AuditRateMService(IAuditRateMRepository repoRateM, IMapper mapper, MapperConfiguration config)
        {
            _repoRateM = repoRateM;
            _mapper = mapper;
            _config = config;
        }

        public async Task<bool> Add(AuditRateMDto model)
        {
            var auditRateM = _mapper.Map<MES_Audit_Rate_M>(model);
            _repoRateM.Add(auditRateM);
            return await _repoRateM.SaveAll();
        }
    }
}