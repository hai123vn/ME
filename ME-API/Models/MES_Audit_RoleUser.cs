using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ME_API.Models
{
    public class MES_Audit_RoleUser
    {
        /// <summary>
        /// 使用者帳號
        /// </summary>
        [Key]
        [StringLength(50)]
        public string user_account { get; set; }
        /// <summary>
        /// 功能
        /// </summary>
        [Key]
        [StringLength(50)]
        public string role_unique { get; set; }
        /// <summary>
        /// 建立者
        /// </summary>
        [Required]
        [StringLength(50)]
        public string create_by { get; set; }
        /// <summary>
        /// 建立時間
        /// </summary>
        [Column(TypeName = "datetime")]
        public DateTime create_time { get; set; }
    }
}