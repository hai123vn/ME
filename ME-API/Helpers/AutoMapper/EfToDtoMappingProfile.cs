using ME_API.Models;
using AutoMapper;
using ME_API.DTO;

namespace ME_API.Helpers.AutoMapper
{
    public class EfToDtoMappingProfile : Profile
    {
        public EfToDtoMappingProfile()
        {
            CreateMap<MES_Audit_Brand, BrandDto> ();
        }
        
    }
}