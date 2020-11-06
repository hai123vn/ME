using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ME_API.Models
{
    public class MES_Audit_Rec_M
    {
         /// <summary>
        /// 紀錄編碼
        /// </summary>
        [Key]
        [StringLength(15)]
        public string Record_ID { get; set; }
        /// <summary>
        /// 紀錄時間
        /// </summary>
        [Column(TypeName = "datetime")]
        public DateTime Record_Time { get; set; }
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
        /// 型體名稱
        /// </summary>
        [Required]
        [StringLength(150)]
        public string Model_Name { get; set; }
        /// <summary>
        /// Model_No
        /// </summary>
        [Required]
        [StringLength(15)]
        public string Model_No { get; set; }
        /// <summary>
        /// 主席
        /// </summary>
        [StringLength(50)]
        public string Chief { get; set; }
        /// <summary>
        /// 紀錄
        /// </summary>
        [StringLength(50)]
        public string Recorder { get; set; }
        /// <summary>
        /// 出席人員
        /// </summary>
        [StringLength(300)]
        public string Attendees { get; set; }
        /// <summary>
        /// 更新者
        /// </summary>
        [StringLength(15)]
        public string Updated_By { get; set; }
        /// <summary>
        /// 更新日期
        /// </summary>
        [Column(TypeName = "datetime")]
        public DateTime? Updated_Time { get; set; }
    }
}