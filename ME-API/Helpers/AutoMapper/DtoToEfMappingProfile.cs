using ME_API.Models;
using AutoMapper;
using ME_API.DTO;

namespace ME_API.Helpers.AutoMapper
{
    public class DtoToEfMappingProfile : Profile
    {
        public DtoToEfMappingProfile()
        {
            CreateMap<BrandDto, MES_Audit_Brand> ();
            
        }
    }
}