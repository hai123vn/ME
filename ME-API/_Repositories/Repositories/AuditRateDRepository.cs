using System.Linq;
using ME_API._Repositories.Interfaces;
using ME_API.Data;
using ME_API.Models;

namespace ME_API._Repositories.Repositories
{
    public class AuditRateDRepository : MERepository<MES_Audit_Rate_D>, IAuditRateDRepository
    {
        private readonly DataContext _context;
        public AuditRateDRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public int SumEachRating0InAuditTypeDAndAuditRateD(string record_Id)
        {
            var auditTypeM = _context.MES_Audit_Rate_M.Where(x => x.Audit_Kind.Trim() == "WS").FirstOrDefault();
            var listAuditTypeD = _context.MES_Audit_Type_D.Where(x => x.Audit_Type_ID.Trim() == auditTypeM.Audit_Type_ID.Trim()).ToList();
            var listAuditRateD = _context.MES_Audit_Rate_D.Where(x => x.Record_ID == record_Id).ToList();

            //bien luu tong cua tich tung phan
            int result = 0;
            foreach (var i in listAuditTypeD)
            {
                foreach (var j in listAuditRateD)
                {
                    if (i.Audit_Item_ID == j.Audit_Item_ID)
                    {
                        result += i.Rating_1 * j.Rating_0;
                    }
                }
            }
            return result;
        }

        public int SumEachRating1InAuditTypeDAndAuditRateD(string record_Id)
        {
            var auditTypeM = _context.MES_Audit_Rate_M.Where(x => x.Audit_Kind.Trim() == "WS").FirstOrDefault();
            var listAuditTypeD = _context.MES_Audit_Type_D.Where(x => x.Audit_Item_ID.Trim() == auditTypeM.Audit_Type_ID.Trim()).ToList();
            var listAuditRateD = _context.MES_Audit_Rate_D.Where(x => x.Record_ID == record_Id).ToList();
            //bien luu tong cua tich tung phan
            int result = 0;
            foreach (var i in listAuditTypeD)
            {
                foreach (var j in listAuditRateD)
                {
                    if (i.Audit_Item_ID == j.Audit_Item_ID)
                    {
                        result += i.Rating_1 * j.Rating_1;
                    }
                }
            }
            return result;
        }

        public int? SumEachRatingNaInAuditTypeDAndAuditRateD(string record_Id)
        {
            var auditTypeM = _context.MES_Audit_Rate_M.Where(x => x.Audit_Kind.Trim() == "WS").FirstOrDefault();
            var listAuditTypeD = _context.MES_Audit_Type_D.Where(x => x.Audit_Item_ID.Trim() == auditTypeM.Audit_Type_ID.Trim()).ToList();
            var listAuditRateD = _context.MES_Audit_Rate_D.Where(x => x.Record_ID == record_Id).ToList();

            //bien luu tong cuc tich tung phan
            int? result = 0;
            foreach (var i in listAuditTypeD)
            {
                foreach (var j in listAuditRateD)
                {
                    if (i.Audit_Item_ID == j.Audit_Item_ID)
                    {
                        result += i.Rating_1 * j.Rate_NA;
                    }
                }
            }
            return result;
        }

        public int SumRating0(string record_Id)
        {
            return _context.MES_Audit_Rate_D.Where(x => x.Record_ID == record_Id).Sum(x => x.Rating_0);
        }

        public int SumRating1(string record_Id)
        {
            return _context.MES_Audit_Rate_D.Where(x => x.Record_ID == record_Id).Sum(x => x.Rating_1);
        }

        public int? SumRatingNa(string record_Id)
        {
            return _context.MES_Audit_Rate_D.Where(x => x.Record_ID == record_Id).Sum(x => x.Rate_NA);
        }
    }
}