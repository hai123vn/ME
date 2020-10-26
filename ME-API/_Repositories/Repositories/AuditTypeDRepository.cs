using System.Linq;
using ME_API._Repositories.Interfaces;
using ME_API.Data;
using ME_API.Models;

namespace ME_API._Repositories.Repositories
{
    public class AuditTypeDRepository : MERepository<MES_Audit_Type_D>, IAuditTypeDRepository
    {
        private readonly DataContext _context;
        public AuditTypeDRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public string GetAuditItemEN(string auditTypeId, string auditItemId)
        {
            return _context.MES_Audit_Type_D.Where(x=> x.Audit_Type_ID == auditItemId && x.Audit_Type_ID == auditItemId).FirstOrDefault().Audit_Item_EN;
        }

        public string GetAuditItemLL(string auditTypeId, string auditItemId)
        {
            return _context.MES_Audit_Type_D.Where(x=>x.Audit_Type_ID == auditItemId && x.Audit_Item_ID == auditItemId).FirstOrDefault().Audit_Item_LL;
        }

        public string GetAuditItemZW(string auditTypeId, string auditItemId)
        {
           return _context.MES_Audit_Type_D.Where(x=>x.Audit_Item_ID == auditItemId && x.Audit_Item_ID == auditItemId).FirstOrDefault().Audit_Item_ZW;
        }

        public int GetTypeDrating0(string auditTypeId, string auditItemId)
        {
            return _context.MES_Audit_Type_D.Where(x=> x.Audit_Item_ID == auditItemId && x.Audit_Item_ID == auditItemId).FirstOrDefault().Rating_0;
        }

        public int GetTypeDrating1(string auditTypeId, string auditItemId)
        {
            return _context.MES_Audit_Type_D.Where(x=> x.Audit_Item_ID == auditItemId && x.Audit_Item_ID == auditItemId).FirstOrDefault().Rating_1;
        }
        

        public int GetTypeDrating2(string auditTypeId, string auditItemId)
        {
            return _context.MES_Audit_Type_D.Where(x=> x.Audit_Item_ID == auditItemId && x.Audit_Item_ID == auditItemId).FirstOrDefault().Rating_2;
        }
        

        public MES_Audit_Type_D Get_Audit_Type_D(string ID, string item)
        {
           return _context.MES_Audit_Type_D.Where(x=> x.Audit_Item_ID == ID && x.Audit_Item_ID == item).FirstOrDefault();
        }
        
    }
}