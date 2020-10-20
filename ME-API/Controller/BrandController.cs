using System;
using System.Security.Claims;
using System.Threading.Tasks;
using ME_API._Service.Interface;
using ME_API.DTO;
using Microsoft.AspNetCore.Mvc;

namespace ME_API.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class BrandController : ControllerBase
    {
        private readonly IBrandService _brandService;
        public BrandController(IBrandService brandService)
        {
            _brandService = brandService;
        }

        // Lấy tất cả danh sách
        [HttpGet("All", Name = "GetAllBrands")]
        public async Task<IActionResult> GetAll()
        {
            var brands = await _brandService.GetAllAsyn();
            return Ok(brands);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateBrand(BrandDto brandDto)
        {
            if (await _brandService.Add(brandDto))
            {
                // return CreatedAtRoute("GetBrand", new { });
                return Ok();
            }
            throw new Exception("Create the brand is failed.");
        }
        [HttpPut("edit")]
        public async Task<IActionResult> UpdateBrand(BrandDto brandDto)
        {
            if (await _brandService.Update(brandDto))
                return NoContent();
            return BadRequest($"Updating brand {brandDto.Brand_ID} failed on save");
        }

        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteBrand(string id)
        {
            if (await _brandService.Delete(id))
                return NoContent();
            throw new Exception("Error deleting the brand");
        }
    }
}