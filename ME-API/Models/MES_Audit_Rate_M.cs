using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ME_API.Models
{
    public class MES_Audit_Rate_M
    {
        /// <summary>
        /// 稽核評分ID
        /// </summary>
        [Key]
        [StringLength(15)]
        public string Record_ID { get; set; }
        /// <summary>
        /// 稽核日期
        /// </summary>
        [Column(TypeName = "datetime")]
        public DateTime Record_Date { get; set; }
        /// <summary>
        /// 稽核類別1編碼
        /// </summary>
        [Required]
        [StringLength(10)]
        public string Audit_Type_ID { get; set; }
        /// <summary>
        /// 生產部
        /// </summary>
        [Required]
        [StringLength(1)]
        public string PDC { get; set; }
        /// <summary>
        /// 棟別
        /// </summary>
        [Required]
        [StringLength(10)]
        public string Building { get; set; }
        /// <summary>
        /// 線別
        /// </summary>
        [Required]
        [StringLength(3)]
        public string Line { get; set; }
        /// <summary>
        /// 稽核種類(SME、6S、WS)
        /// </summary>
        [StringLength(100)]
        public string Audit_Kind { get; set; }
        /// <summary>
        /// 稽核類別1
        /// </summary>
        [StringLength(100)]
        public string Audit_Type1 { get; set; }
        /// <summary>
        /// 稽核類別2
        /// </summary>
        [StringLength(100)]
        public string Audit_Type2 { get; set; }
        /// <summary>
        /// 稽查人員
        /// </summary>
        [Required]
        [StringLength(50)]
        public string ME_PIC { get; set; }
        /// <summary>
        /// 負責幹部
        /// </summary>
        [StringLength(50)]
        public string PD_RESP { get; set; }
        /// <summary>
        /// 更新者
        /// </summary>
        [Required]
        [StringLength(15)]
        public string Updated_By { get; set; }
        /// <summary>
        /// 更新日期
        /// </summary>
        [Column(TypeName = "datetime")]
        public DateTime? Updated_Time { get; set; }
        /// <summary>
        /// 停止生產
        /// </summary>
        public bool Halting_Production { get; set; }
        /// <summary>
        /// 型體名稱
        /// </summary>
        [StringLength(150)]
        public string Model_Name { get; set; }
        /// <summary>
        /// Model_No
        /// </summary>
        [StringLength(15)]
        public string Model_No { get; set; }
    }
}