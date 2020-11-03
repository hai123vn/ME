using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ME_API.Models
{
    public class MES_Audit_Roles
    {
         /// <summary>
        /// 功能
        /// </summary>
        [Key]
        [StringLength(50)]
        public string role_unique { get; set; }
        /// <summary>
        /// 功能說明
        /// </summary>
        [Required]
        [StringLength(50)]
        public string role_name { get; set; }
        /// <summary>
        /// 功能備註
        /// </summary>
        [Required]
        [StringLength(250)]
        public string role_note { get; set; }
        /// <summary>
        /// 功能排序
        /// </summary>
        public double role_sequence { get; set; }
        /// <summary>
        /// 更新者
        /// </summary>
        [Required]
        [StringLength(50)]
        public string update_by { get; set; }
        /// <summary>
        /// 更新時間
        /// </summary>
        [Column(TypeName = "datetime")]
        public DateTime update_time { get; set; }
    }
}