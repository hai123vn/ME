using System;

namespace ME_API.DTO
{
    public class MesOrgDto
    {
        public string Factory_ID { get; set; }
        public string PDC_ID { get; set; }
        public string Line_ID { get; set; }
        public string Dept_ID { get; set; }
        public string Building { get; set; }
        public int? Line_Seq { get; set; }
        public int? Status { get; set; }
        public string HP_Dept_ID { get; set; }
        public DateTime? Update_Time { get; set; }
        public string Updated_By { get; set; }
        public int? IsAGV { get; set; }
        public string Block { get; set; }
        public string Line_ID_2 { get; set; }

        public MesOrgDto()
        {
            Update_Time = DateTime.Now;
        }
    }
}