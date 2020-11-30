using System;
using System.Net.Mail;
using System.Threading.Tasks;
using ME_API._Service.Interface;
using ME_API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controller
{
    public class ChartMonthlyController : ControllerBase
    {
        private readonly IChartByMonthlyService _service;

        public ChartMonthlyController(IChartByMonthlyService service)
        {
            _service = service;
        }

        [HttpGet("types")]
        public async Task<IActionResult> Types()
        {
            var data = await _service.GetTypes();
            return Ok(data);
        }

        [HttpPost("chartMonthly")]
        public async Task<IActionResult> GetChart([FromBody] ChartMonthlyParam param)
        {
            var data = await _service.GetChart(param);
            return Ok(data);
        }

        [HttpGet("sendMail")]
        public IActionResult SendMail()
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("mail.shc.ssbshoes.com");
            mail.From = new MailAddress("noreply@shc.ssbshoes.com");
            // mail.To.Add("philong.nguyen@shc.ssbshoes.com");
            mail.To.Add("nam.nguyen@shc.ssbshoes.com");
            mail.Subject = "System Bottom";
            mail.Body = "- Check xem thử file đính kèm mail " + " \n\n " + "- Check xem thử file đính kèm mail ";

            System.Net.Mail.Attachment attachment;
            attachment = new System.Net.Mail.Attachment("D:\\file.txt");
            mail.Attachments.Add(attachment);

            SmtpServer.Port = 25;
            SmtpServer.Credentials = new System.Net.NetworkCredential("noreply@shc.ssbshoes.com", "p@ssw0rd");
            SmtpServer.EnableSsl = true;

            try
            {
                SmtpServer.Send(mail);
                return Ok(true);
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }
        [HttpGet("getChartPreviousMonth")]
        public async Task<IActionResult> GetChartPreviousMonth()
        {
            var result = await _service.GetChartPreviousMonth();
            return Ok(result);
        }
    }
}