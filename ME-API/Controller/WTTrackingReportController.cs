using System;
using System.IO;
using System.Threading.Tasks;
using Aspose.Cells;
using ME_API._Service.Interface;
using ME_API.Helpers;
using ME_API.ViewModel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class WTTrackingReportController : ControllerBase
    {
        private readonly IWTTrackingReportService _iWTTrackingReportService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public WTTrackingReportController(IWTTrackingReportService iWTTrackingReportService, IWebHostEnvironment webHostEnvironment)
        {
            _iWTTrackingReportService = iWTTrackingReportService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet("status")]
        public async Task<IActionResult> GetAllStatus()
        {
            var data = await _iWTTrackingReportService.GetAllStatus();
            return Ok(data);
        }

        [HttpPost("searchModel")]
        public async Task<IActionResult> SearchByModel([FromQuery] PaginationParams paginationParams, [FromBody] AuditRecSearch model)
        {
            var auditRecs = await _iWTTrackingReportService.SearchByModel(paginationParams, model);
            Response.AddPagination(auditRecs.CurrentPage, auditRecs.PageSize, auditRecs.TotalCount, auditRecs.TotalPages);
            return Ok(auditRecs);
        }
        [HttpPost("searchExcel")]
        public async Task<IActionResult> SearchExcel([FromBody] AuditRecSearch model)
        {
            var auditRecs = await _iWTTrackingReportService.SearchExcel(model);
            return Ok(auditRecs);
        }
        [HttpPost("ExportExcelWTTrackingList")]
        public async Task<IActionResult> ExportExcelWTTrackingList([FromBody] AuditRecSearch model)
        {
            var data = await _iWTTrackingReportService.SearchExcel(model, "2");
            var path = Path.Combine(_webHostEnvironment.ContentRootPath, "Resource\\Template\\WT_Tracking_List.xlsx");
            WorkbookDesigner ds = new WorkbookDesigner();
            ds.Workbook = new Workbook(path);

            Worksheet ws = ds.Workbook.Worksheets[0];
            if (data.Count != 0)
            {
                ws.Cells["B2"].PutValue(data[0].Record_Time);
                ws.Cells["B3"].PutValue(data[0].PDC);
                ws.Cells["B4"].PutValue(data[0].Attendees);
                ws.Cells["D2"].PutValue(data[0].Building);
                ws.Cells["D3"].PutValue(data[0].Line);
                ws.Cells["F2"].PutValue(data[0].Model_Name);
                ws.Cells["F3"].PutValue(data[0].Model_No);
                ws.Cells["I2"].PutValue(data[0].Chief);
                ws.Cells["I3"].PutValue(data[0].Recorder);
            }

            ds.SetDataSource("result", data);
            ds.Process();

            for (int i = 6; i < data.Count + 5; i++)
            {
                var filePathB4 = "wwwroot\\uploaded\\images\\" + data[i - 6].Before_Picture;
                var filePathAfter = "wwwroot\\uploaded\\images\\" + data[i - 6].After_Picture;
                if (System.IO.File.Exists(filePathB4))
                {
                    var pictureIndex = ws.Pictures.Add(i, 7, filePathB4);
                    Aspose.Cells.Drawing.Picture picture = ws.Pictures[pictureIndex];
                    picture.Width = 100;
                    picture.Height = 100;

                    picture.Top = 3;
                    picture.Left = 3;

                    ws.Cells.Rows[i].Height = 80;
                }
                if (System.IO.File.Exists(filePathAfter))
                {
                    var pictureIndex = ws.Pictures.Add(i, 8, filePathAfter);
                    Aspose.Cells.Drawing.Picture picture = ws.Pictures[pictureIndex];
                    picture.Width = 100;
                    picture.Height = 100;

                    picture.Top = 3;
                    picture.Left = 3;

                    ws.Cells.Rows[i].Height = 80;
                }

            }
            MemoryStream stream = new MemoryStream();
            ds.Workbook.Save(stream, SaveFormat.Xlsx);
            byte[] result = stream.ToArray();

            return File(result, "application/xlsx", "WT_Tracking_List" + DateTime.Now.ToString("dd_MM_yyyy_mm_ss") + ".xlsx");
        }
    }
}