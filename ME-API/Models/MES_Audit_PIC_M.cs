using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ME_API.Models
{
    public class MES_Audit_PIC_M
    {
        /// <summary>
        /// 責任類別_ID
        /// </summary>
        [Key]
        [StringLength(10)]
        public string PIC_Type_ID { get; set; }
        /// <summary>
        /// 責任類別-中文
        /// </summary>
        [StringLength(100)]
        public string PIC_Type_ZW { get; set; }
        /// <summary>
        /// 責任類別-英文
        /// </summary>
        [StringLength(100)]
        public string PIC_Type_EN { get; set; }
        /// <summary>
        /// 責任類別-當地
        /// </summary>
        [StringLength(100)]
        public string PIC_Type_LL { get; set; }
        /// <summary>
        /// 狀態
        /// </summary>
        [Required]
        [StringLength(1)]
        public string Status { get; set; }
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
        public DateTime Updated_Time { get; set; }
    }
}