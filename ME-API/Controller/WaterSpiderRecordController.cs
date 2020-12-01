using System;
using System.IO;
using System.Threading.Tasks;
using Aspose.Cells;
using ME_API._Service.Interface;
using ME_API.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class WaterSpiderRecordController : ControllerBase
    {
        private readonly IWaterSpiderRecordService _waterSpiderRecordService;
        private readonly IAuditPicDService _auditPicDService;
        private readonly IAuditRateService _auditRateService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public WaterSpiderRecordController(IWaterSpiderRecordService waterSpiderRecordService, IAuditPicDService auditPicDService, IAuditRateService auditRateService, IWebHostEnvironment webHostEnvironment)
        {
            _waterSpiderRecordService = waterSpiderRecordService;
            _auditPicDService = auditPicDService;
            _auditRateService = auditRateService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost("waterspider-list")]
        public async Task<IActionResult> GetListWaterSpiderScoreRecord([FromQuery] PaginationParams paginationParams, ScoreRecordParam scoreRecordParam)
        {
            var data = await _waterSpiderRecordService.GetLisWaterSpiderScoreRecord(paginationParams, scoreRecordParam);
            Response.AddPagination(data.CurrentPage, data.PageSize, data.TotalCount, data.TotalPages);
            return Ok(data);
        }
        [HttpPost("ExportExcelWaterSpider")]
        public async Task<IActionResult> ExportExcelSMERecord([FromQuery] PaginationParams paginationParams, ScoreRecordParam scoreRecordParam)
        {
            var data = await _waterSpiderRecordService.GetLisWaterSpiderScoreRecord(paginationParams, scoreRecordParam);
            var path = Path.Combine(_webHostEnvironment.ContentRootPath, "Resource\\Template\\WaterSpider_Score_Record_Template.xlsx");
            WorkbookDesigner designer = new WorkbookDesigner();
            designer.Workbook = new Workbook(path);
            Worksheet ws = designer.Workbook.Worksheets[0];

            designer.SetDataSource("result", data);
            designer.Process();
            MemoryStream stream = new MemoryStream();
            designer.Workbook.Save(stream, SaveFormat.Xlsx);
            byte[] result = stream.ToArray();
            return File(result, "application/xlsx", "WaterSpider_Score_Record" + DateTime.Now.ToString("dd_MM_yyyy_HH_mm_ss") + ".xlsx");
        }

        [HttpGet("ExportExcelScoreRecordDetail")]
        public async Task<ActionResult> ExportExcelScoreRecordDetail(string recordId)
        {
            var data = await _auditRateService.GetScoreRecoreDetail(recordId);
            var Building = await _auditPicDService.GetBuildingByID(data.auditRateM.Building);
            var path = Path.Combine(_webHostEnvironment.ContentRootPath, "Resource\\Template\\WaterSpider_Score_Record_Detail_Template.xlsx");
            WorkbookDesigner designer = new WorkbookDesigner();
            designer.Workbook = new Workbook(path);
            Worksheet ws = designer.Workbook.Worksheets[0];
            // Gan gia tri tinh
            ws.Cells["B2"].PutValue(data.auditRateM.Record_Date);
            ws.Cells["D2"].PutValue(data.auditRateM.PDC);
            ws.Cells["F2"].PutValue(data.auditRateM.Building);
            ws.Cells["B3"].PutValue(data.auditRateM.Updated_By);
            ws.Cells["D3"].PutValue(data.auditRateM.Updated_Time);
            ws.Cells["F3"].PutValue(data.auditRateM.Line_ID_2_Name);

            designer.SetDataSource("result", data.listAuditRateD);
            designer.Process();

            MemoryStream stream = new MemoryStream();
            designer.Workbook.Save(stream, SaveFormat.Xlsx);

            byte[] result = stream.ToArray();
            return File(result, "application/xlsx", "WaterSpider_Score_Record_Detail" + DateTime.Now.ToString("dd_MM_yyyy_HH_mm_ss") + ".xlsx");
        }
        [HttpGet("getbrandbywaterspider")]
        public async Task<IActionResult> GetListBrandByWaterSpider()
        {
            var data = await _waterSpiderRecordService.GetBrandByWaterSpider();
            return Ok(data);
        }
        [HttpGet("getaudittypebybrandwaterspider")]
        public async Task<IActionResult> GetAuditTypeByBrandWaterSpider(string brand)
        {   
            var data = await _waterSpiderRecordService.GetAuditTypeByBrandByWaterSpider(brand);
            return Ok(data);
        }

        [HttpGet("getaudittype1bywaterspider")]
        public async Task<IActionResult> GetListAuditType1ByWaterSpider()
        {
            var data = await _waterSpiderRecordService.GetAuditType1ByWaterSpider();
            return Ok(data);
        }

    }
}