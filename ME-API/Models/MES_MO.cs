using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ME_API.Models
{
    public class MES_MO
    {
        [Key]
        [StringLength(1)]
        public string Factory_ID { get; set; }
        [StringLength(3)]
        public string Line_ID { get; set; }
        [StringLength(3)]
        public string Line_ID_ASY { get; set; }
        /// <summary>
        /// 組底線別
        /// </summary>
        [StringLength(3)]
        public string Line_ID_STF { get; set; }
        [StringLength(3)]
        public string Dept_ID { get; set; }
        [StringLength(3)]
        public string Dept_ID_STC { get; set; }
        /// <summary>
        /// 組底部門
        /// </summary>
        [StringLength(3)]
        public string Dept_ID_STF { get; set; }
        [StringLength(15)]
        public string MO_No { get; set; }
        [StringLength(3)]
        public string MO_Seq { get; set; }
        [Key]
        [StringLength(21)]
        public string Cycle_No { get; set; }
        [StringLength(15)]
        public string Style_No { get; set; }
        [StringLength(40)]
        public string Style_Name { get; set; }
        [StringLength(10)]
        public string Color_No { get; set; }
        public int? Plan_Qty { get; set; }
        public int? UTN_Yield_Qty { get; set; }
        public int? UTN_Yield_Qty_STC { get; set; }
        /// <summary>
        /// 組底產量
        /// </summary>
        public int? UTN_Yield_Qty_STF { get; set; }
        public int? UTN_Forward_Qty_STF { get; set; }
        public int? UTN_Forward_Qty_STC { get; set; }
        public int? UTN_Yield_Qty_STC_In { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Plan_Start_ASY { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Plan_End_ASY { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Plan_Start_STF { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Plan_End_STF { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Plan_Start_STC { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Plan_End_STC { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Plan_Start_CUT { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Plan_End_CUT { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Act_Start_ASY { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Act_End_ASY { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Act_Start_STF { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Act_End_STF { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Act_Start_STC { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Act_End_STC { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Act_Start_CUT { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Act_End_CUT { get; set; }
        [StringLength(50)]
        public string Destination { get; set; }
        /// <summary>
        /// 最後裝箱日
        /// </summary>
        [Column(TypeName = "date")]
        public DateTime? Comfirm_Date { get; set; }
        /// <summary>
        /// 生產季節
        /// </summary>
        [StringLength(4)]
        public string Prod_Season { get; set; }
        [StringLength(1)]
        public string Top_Model { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? Update_Time { get; set; }
        [StringLength(16)]
        public string Updated_By { get; set; }
    }
}