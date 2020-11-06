using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ME_API.Models
{
    public class MES_Audit_Rec_D
    {
        /// <summary>
        /// 紀錄編碼
        /// </summary>
        [Key]
        [StringLength(15)]
        public string Record_ID { get; set; }
        /// <summary>
        /// 項次
        /// </summary>
        [Key]
        public int Item_no { get; set; }
        /// <summary>
        /// ERCS
        /// </summary>
        [StringLength(1)]
        public string ERCS { get; set; }
        /// <summary>
        /// 稽核類別
        /// </summary>
        [StringLength(10)]
        public string Audit_Type_ID { get; set; }
        /// <summary>
        /// 稽核項目
        /// </summary>
        [StringLength(5)]
        public string Audit_Item { get; set; }
        /// <summary>
        /// 議事內容(中)
        /// </summary>
        [StringLength(500)]
        public string Issue_ZW { get; set; }
        /// <summary>
        /// 議事內容(越)
        /// </summary>
        [Required]
        [StringLength(500)]
        public string Issue_LL { get; set; }
        /// <summary>
        /// 議事內容(英)
        /// </summary>
        [StringLength(500)]
        public string Issue_EN { get; set; }
        /// <summary>
        /// 改善前圖片
        /// </summary>
        [StringLength(300)]
        public string Before_Picture { get; set; }
        /// <summary>
        /// 改善後圖片
        /// </summary>
        [StringLength(300)]
        public string After_Picture { get; set; }
        /// <summary>
        /// 現場負責人
        /// </summary>
        [StringLength(15)]
        public string PD_PIC { get; set; }
        /// <summary>
        /// 負責人
        /// </summary>
        [StringLength(50)]
        public string PD_Department { get; set; }
        /// <summary>
        /// 現場棟別
        /// </summary>
        [StringLength(50)]
        public string PD_Building { get; set; }
        /// <summary>
        /// ME負責人
        /// </summary>
        [StringLength(15)]
        public string ME_PIC { get; set; }
        /// <summary>
        /// 完成日期
        /// </summary>
        [Column(TypeName = "datetime")]
        public DateTime? Finished_Date { get; set; }
        /// <summary>
        /// 狀態
        /// </summary>
        [StringLength(20)]
        public string Status { get; set; }
        /// <summary>
        /// 備註
        /// </summary>
        [StringLength(500)]
        public string Remark { get; set; }
        /// <summary>
        /// 更新者
        /// </summary>
        [StringLength(15)]
        public string Updated_By { get; set; }
        /// <summary>
        /// 新增日期
        /// </summary>
        [Column(TypeName = "datetime")]
        public DateTime? Updated_Time { get; set; }
        /// <summary>
        /// 審核者
        /// </summary>
        [StringLength(15)]
        public string Implement_User { get; set; }
        /// <summary>
        /// 審核日期
        /// </summary>
        [Column(TypeName = "datetime")]
        public DateTime? Implement_Time { get; set; }
    }
}