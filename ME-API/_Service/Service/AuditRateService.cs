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
            auditType = _repoTypeM.FindAll().Where(x => x.Audit_Type_ID.Trim() == auditTypeId.Trim()).FirstOrDefault();

            List<ScoreRecordQuesDto> data = new List<ScoreRecordQuesDto>();

            if (auditType != null)
            {

                var queryAudiiTypeD = _repoTypeD.FindAll().Where(x => x.Audit_Type_ID.Trim() == auditType.Audit_Type_ID.Trim() && x.Visible == true);
                data = await queryAudiiTypeD.Select(x => new ScoreRecordQuesDto
                {
                    Audit_Type_ID = x.Audit_Type_ID,
                    Audit_Item_ID = x.Audit_Item_ID,
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

        public async Task<ScoreRecordDetailDto> GetScoreRecoreDetail(string recordId)
        {
            var auditRateMModel = _repoRateM.FindSingle(x => x.Record_ID.Trim() == recordId);
            ScoreRecordDetailDto result = new ScoreRecordDetailDto();
            if (auditRateMModel != null)
            {
                var listAuditRateDModel = _repoRateD.FindAll(x => x.Record_ID == auditRateMModel.Record_ID);
                var listAuditRateD = await listAuditRateDModel.Select(x => new AuditRateDDetailDto
                {
                    RecordId = x.Record_ID,
                    AuditItemId = x.Audit_Item_ID,
                    Rating0 = x.Rating_0,
                    Rating1 = x.Rating_1,
                    Rating2 = x.Rating_2,
                    RatingNA = x.Rate_NA,
                    Remark = x.Remark,
                    UploadPicture = x.Upload_Picture,
                    AuditItemLL = _repoTypeD.GetAuditItemLL(auditRateMModel.Audit_Type_ID, x.Audit_Item_ID),
                    AuditItemEN = _repoTypeD.GetAuditItemEN(auditRateMModel.Audit_Type_ID, x.Audit_Item_ID),
                    AuditItemZW = _repoTypeD.GetAuditItemZW(auditRateMModel.Audit_Type_ID, x.Audit_Item_ID),
                    TypeDrating0 = _repoTypeD.GetTypeDrating0(auditRateMModel.Audit_Type_ID, x.Audit_Item_ID),
                    TypeDrating1 = _repoTypeD.GetTypeDrating1(auditRateMModel.Audit_Type_ID, x.Audit_Item_ID),
                    TypeDrating2 = _repoTypeD.GetTypeDrating2(auditRateMModel.Audit_Type_ID, x.Audit_Item_ID),
                    oderby = 0
                }).ToListAsync();
                listAuditRateD = listAuditRateD.Select(x =>
                {
                    x.oderby = (x.AuditItemId.Split(".")).Count() == 1 ? 0 : x.AuditItemId.Split(".")[1].ToInt();
                    return x;
                }).ToList();
                listAuditRateD = listAuditRateD.OrderBy(x => x.AuditItemId.Split(".")[0].ToInt()).ThenBy(x => x.oderby).ToList();

                var dataRateMmodel = _mapper.Map<AuditRateMDto>(auditRateMModel);

                var dataUser = _repoMesUser.FindAll(x => x.User_ID.Trim() == dataRateMmodel.Updated_By.Trim()).Select(x => new
                {
                    user = x.User_ID + "_" + x.User_Name
                }).FirstOrDefault();
                dataRateMmodel.Line_ID_2_Name = _repoMesAuditOrg.FindAll(x => x.Line_ID_2.Trim() == dataRateMmodel.Line.Trim()).FirstOrDefault().Line_ID_2_Name;
                dataRateMmodel.Updated_By = dataUser == null ? dataRateMmodel.Updated_By : dataUser.user;
                result.auditRateM = dataRateMmodel;
                result.listAuditRateD = listAuditRateD;
            }
            return result;
        }

        public async Task<bool> SaveScopeRecord(ScoreRecordAnsDto param)
        {
            string record_Id = await GetRecordIdRate();
            var auditTypeM = _repoTypeM.FindSingle(x => x.Audit_Type_ID.Trim() == param.auditRateM.Audit_Type_ID.Trim());
            DateTime timeNow = DateTime.Now;
            param.auditRateM.Record_ID = record_Id;
            param.auditRateM.Updated_Time = timeNow;
            param.auditRateM.Audit_Type1 = auditTypeM.Audit_Type1;
            param.auditRateM.Audit_Type2 = auditTypeM.Audit_Type2;
            param.auditRateM.Audit_Kind = auditTypeM.Audit_Kind;

            //Set value record and update all object in list
            var listAuditRateModel = param.listAuditRateD.Select(x =>
            {
                x.Record_ID = record_Id;
                x.Updated_By = param.auditRateM.Updated_By;
                x.Updated_Time = timeNow;
                return x;
            }).ToList();

            //Mapper 
            var listAuditRateD = _mapper.Map<List<AuditRateDDto>, List<MES_Audit_Rate_D>>(listAuditRateModel);
            var auditRateM = _mapper.Map<MES_Audit_Rate_M>(param.auditRateM);
            //Add Db
            _repoRateM.Add(auditRateM);
            _repoRateD.AddMultiple(listAuditRateD);
            try
            {
                //Save
                return await _repoRateD.SaveAll();
            }
            catch (System.Exception)
            {
                return false;
            }
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
                    var data = dataModel.Where(x => x.Audit_Item_ID.Trim() == item.Audit_Item_ID.Trim()).FirstOrDefault();
                    data.Updated_By = updateBy;
                    data.Updated_Time = timeNow;
                    data.Rating_0 = item.Rating_0;
                    data.Rating_1 = item.Rating_1;
                    data.Rating_2 = item.Rating_2;
                    data.Rate_NA = item.Rate_NA;
                    data.Remark = item.Remark;
                    listData.Add(data);
                }
                _repoRateD.UpdateMultiple(listData);
                return await _repoRateD.SaveAll();
            }
            else
                return false;
        }
    }
}