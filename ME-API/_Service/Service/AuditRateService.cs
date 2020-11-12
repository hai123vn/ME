using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ME_API._Repositories.Interfaces;
using ME_API._Service.Interface;
using ME_API.DTO;
using ME_API.Helpers;
using ME_API.Models;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Service.Service
{
    public class AuditRateService : IAuditRateService
    {
        private readonly IAuditRateDRepository _repoRateD;
        private readonly IAuditRateMRepository _repoRateM;
        private readonly IAuditTypeDRepository _repoTypeD;
        private readonly IAuditTypeRepository _repoTypeM;
        private readonly IAuditPicDRepository _repoPicD;
        private readonly IMesAuditOrgRepository _repoMesAuditOrg;
        private readonly IMesUserRepository _repoMesUser;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _config;

        public AuditRateService(IAuditRateDRepository repoRateD, IAuditRateMRepository repoRateM, IAuditTypeDRepository repoTypeD, IAuditTypeRepository repoTypeM, IAuditPicDRepository repoPicD, IMesAuditOrgRepository repoMesAuditOrg, IMesUserRepository repoMesUser, IMapper mapper, MapperConfiguration config)
        {
            _repoRateD = repoRateD;
            _repoRateM = repoRateM;
            _repoTypeD = repoTypeD;
            _repoTypeM = repoTypeM;
            _repoPicD = repoPicD;
            _repoMesAuditOrg = repoMesAuditOrg;
            _repoMesUser = repoMesUser;
            _mapper = mapper;
            _config = config;
        }

        public async Task<object> GetLanguage(string user)
        {
            var result = await _repoPicD.FindAll(x => x.Resp_ID.Trim() == user.Trim()).Select(x => new
            {
                x.Language
            }).ToListAsync();
            return result;
        }

        public async Task<List<ScoreRecordQuesDto>> GetListQuesScoreRecord(string auditTypeId)
        {
            MES_Audit_Type_M auditType;
            auditType = _repoTypeM.FindAll(x => x.Audit_Type_ID.Trim() == auditTypeId.Trim()).FirstOrDefault();
            List<ScoreRecordQuesDto> data = new List<ScoreRecordQuesDto>();

            if (auditType != null)
            {
                var queryAuditTypeD = _repoTypeD.FindAll(x => x.Audit_Item_ID.Trim() == auditType.Audit_Type_ID.Trim() && x.Visible == true);
                data = await queryAuditTypeD.Select(x => new ScoreRecordQuesDto
                {
                    Audit_Item_ID = x.Audit_Item_ID,
                    Audit_Type_ID = x.Audit_Item_ID,
                    Quesion = x.Audit_Item_LL,
                    QuesionLL = x.Audit_Item_LL,
                    QuesionEN = x.Audit_Item_EN,
                    QuesionZW = x.Audit_Item_ZW,
                    TypeDrating0 = x.Rating_0,
                    TypeDrating1 = x.Rating_1,
                    TypeDrating2 = x.Rating_2,
                    orderby = 0
                }).OrderBy(x => x.Audit_Item_ID).ToListAsync();
                data = data.Select(x =>
                {
                    x.orderby = (x.Audit_Item_ID.Split(".")).Count() == 1 ? 0 : x.Audit_Item_ID.Split(".")[1].ToInt();
                    return x;
                }).ToList();
                data = data.OrderBy(x => x.Audit_Item_ID.Split(".")[0].ToInt()).ThenBy(x => x.orderby).ToList();
            }
            return data;
        }

        public async Task<string> GetRecordIdRate()
        {
            string record_Id = "RA" + DateTime.Now.Year.ToString().Substring(2) + (DateTime.Now.Month < 10 ? ("0" + DateTime.Now.Month) : DateTime.Now.Month.ToString());
            var item = await _repoRateM.FindAll(x => x.Record_ID.Contains(record_Id)).OrderByDescending(x => x.Record_ID).FirstOrDefaultAsync();
            if (item != null)
            {
                var serinumber = item.Record_ID.Substring(7).ToInt();
                var tmp = (serinumber >= 999) ? (serinumber + 1).ToString() : (serinumber >= 99) ? ("0" + (serinumber + 1)) : (serinumber < 9) ? ("000" + (serinumber + 1)) : ("00" + (serinumber + 1));
                record_Id = "RA" + DateTime.Now.Year.ToString().Substring(2) + (DateTime.Now.Month < 10 ? ("0" + DateTime.Now.Month) : DateTime.Now.Month.ToString()) + tmp;
            }
            else
            {
                record_Id = "RA" + DateTime.Now.Year.ToString().Substring(2) + (DateTime.Now.Month < 10 ? ("0" + DateTime.Now.Month) : DateTime.Now.Month.ToString()) + "0001";
            }
            return record_Id;
        }

        public Task<ScoreRecordDetailDto> GetScoreRecoreDetail(string recordId)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> SaveScopeRecord(ScoreRecordAnsDto param)
        {
            throw new System.NotImplementedException();
        }

        public async Task<bool> UpdateListScopeRecordDetail(List<AuditRateDDto> listModel, string updateBy)
        {
            var dataModel = await _repoRateD.FindAll(x => x.Record_ID.Trim() == listModel[0].Record_ID.Trim()).ToListAsync();
            DateTime timeNow = DateTime.Now;
            if (dataModel[0] != null)
            {
                List<MES_Audit_Rate_D> listData = new List<MES_Audit_Rate_D>();
                foreach (var item in listModel)
                {
                    var data = dataModel.Where(x=>x.)
                }
            }
        }
    }
}