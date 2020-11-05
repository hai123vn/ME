using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ME_API.Models
{
    public class MES_Org
    {
        [Key]
        [StringLength(1)]
        public string Factory_ID { get; set; }
        [Key]
        [StringLength(1)]
        public string PDC_ID { get; set; }
        [Key]
        [StringLength(3)]
        public string Line_ID { get; set; }
        [Key]
        [StringLength(4)]
        public string Dept_ID { get; set; }
        [StringLength(10)]
        public string Building { get; set; }
        public int? Line_Seq { get; set; }
        public int? Status { get; set; }
        [StringLength(4)]
        public string HP_Dept_ID { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Update_Time { get; set; }
        [StringLength(16)]
        public string Updated_By { get; set; }
        public int? IsAGV { get; set; }
        [StringLength(1)]
        public string Block { get; set; }
        [StringLength(3)]
        public string Line_ID_2 { get; set; }
    }
}