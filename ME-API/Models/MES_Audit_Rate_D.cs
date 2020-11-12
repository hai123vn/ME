using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ME_API.Models
{
    public class MES_Audit_Rate_D
    {
        /// <summary>
        /// 紀錄編碼
        /// </summary>
        [Key]
        [StringLength(15)]
        public string Record_ID { get; set; }
        /// <summary>
        /// 稽核項目號
        /// </summary>
        [Key]
        [StringLength(5)]
        public string Audit_Item_ID { get; set; }
        /// <summary>
        /// 評分標準0
        /// </summary>
        public int Rating_0 { get; set; }
        /// <summary>
        /// 評分標準1
        /// </summary>
        public int Rating_1 { get; set; }
        /// <summary>
        /// 評分標準2
        /// </summary>
        public int Rating_2 { get; set; }
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
        /// 評分標準NA
        /// </summary>
        public int? Rate_NA { get; set; }
        /// <summary>
        /// 備註
        /// </summary>
        [StringLength(500)]
        public string Remark { get; set; }
        /// <summary>
        /// 照片上傳
        /// </summary>
        [StringLength(200)]
        public string Upload_Picture { get; set; }
    }
}