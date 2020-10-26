using System;

namespace ME_API.DTO
{
    public class AuditTypeDto
    {
        public string Audit_Type_ID { get; set; }
        public string Brand { get; set; }
        public string Audit_Type_1 { get; set; }
        public string Audit_Type_2 { get; set; }
        public string Audit_Type2_Name { get; set; }
        public string Audit_Num { get; set; }
        public int Version { get; set; }
        public string Status { get; set; }
        public string Updated_By { get; set; }
        public DateTime Updated_Time { get; set; }
        public string Audit_Kind { get; set; }
        public AuditTypeDto()
        {
            Updated_Time = DateTime.Now;
        }

    }
}