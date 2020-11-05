using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ME_API.Models
{
    public class MES_Audit_Org
    {
        /// <summary>
        /// 廠別
        /// </summary>
        [Key]
        [StringLength(1)]
        public string Factory_ID { get; set; }
        /// <summary>
        /// 生產部
        /// </summary>
        [Key]
        [StringLength(1)]
        public string PDC_ID { get; set; }
        /// <summary>
        /// 生產部名稱
        /// </summary>
        [StringLength(100)]
        public string PDC_Name { get; set; }
        /// <summary>
        /// 生產線別
        /// </summary>
        [Key]
        [StringLength(3)]
        public string Line_ID { get; set; }
        /// <summary>
        /// 生產線別名稱
        /// </summary>
        [StringLength(100)]
        public string Line_Name { get; set; }
        /// <summary>
        /// 生產部門
        /// </summary>
        [Key]
        [StringLength(4)]
        public string Dept_ID { get; set; }
        /// <summary>
        /// 生產部門名稱
        /// </summary>
        [StringLength(100)]
        public string Dept_Name { get; set; }
        /// <summary>
        /// 棟別
        /// </summary>
        [StringLength(10)]
        public string Building { get; set; }
        /// <summary>
        /// 棟別名稱
        /// </summary>
        [StringLength(100)]
        public string Building_Name { get; set; }
        /// <summary>
        /// 線別順序
        /// </summary>
        public int Line_Seq { get; set; }
        /// <summary>
        /// 狀態
        /// </summary>
        public int? Status { get; set; }
        /// <summary>
        /// 異動時間
        /// </summary>
        [Column(TypeName = "datetime")]
        public DateTime? Update_Time { get; set; }
        /// <summary>
        /// 異動者
        /// </summary>
        [StringLength(16)]
        public string Updated_By { get; set; }
        /// <summary>
        /// 對應HP的部門
        /// </summary>
        [Required]
        [StringLength(100)]
        public string HP_Dept_ID { get; set; }
        /// <summary>
        /// 是否有AGV
        /// </summary>
        public int? IsAGV { get; set; }
        /// <summary>
        /// Block
        /// </summary>
        [StringLength(1)]
        public string Block { get; set; }
        /// <summary>
        /// 中線部門
        /// </summary>
        [Required]
        [StringLength(3)]
        public string Line_ID_2 { get; set; }
        /// <summary>
        /// 中線部門名稱
        /// </summary>
        [StringLength(100)]
        public string Line_ID_2_Name { get; set; }
    }
}