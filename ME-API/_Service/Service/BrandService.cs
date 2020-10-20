using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ME_API._Repositories.Interfaces;
using ME_API._Service.Interface;
using ME_API.DTO;
using ME_API.Models;
using Microsoft.EntityFrameworkCore;

namespace ME_API._Service.Service
{
    public class BrandService : IBrandService
    {
        private readonly IBrandRepository _repoBrand;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public BrandService(IBrandRepository repoBrand, IMapper mapper, MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _repoBrand = repoBrand;
        }
        // Them Brand moi vao bang MES_Audit_Brand
        public async Task<bool> Add(BrandDto model)
        {
            var brand = _mapper.Map<MES_Audit_Brand>(model);
            _repoBrand.Add(brand);
            return await _repoBrand.SaveAll();
        }
        //Kiem tra ton tai cua BrandID
        public async Task<bool> CheckBrandExists(string brandId)
        {
            return await _repoBrand.CheckBrandExists(brandId);
        }

        // Xoa Brand 
        public async Task<bool> Delete(object id)
        {
            var brand = _repoBrand.FindById(id);
            _repoBrand.Remove(brand);
            return await _repoBrand.SaveAll();
        }
        
        //Lấy toàn bộ danh sách Brand 
        public async Task<List<BrandDto>> GetAllAsyn()
        {
            return await _repoBrand.FindAll().ProjectTo<BrandDto>(_configMapper).OrderByDescending(x => x.Updated_Time).ToListAsync();
        }

        //Cap nhat Brand
        public async Task<bool> Update(BrandDto model)
        {
            var brand = _mapper.Map<MES_Audit_Brand>(model);
            brand.Updated_Time = DateTime.Now;
            _repoBrand.Update(brand);
            return await _repoBrand.SaveAll();
        }
    }
}