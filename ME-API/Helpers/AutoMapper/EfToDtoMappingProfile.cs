using ME_API.Models;
using AutoMapper;
using ME_API.DTO;

namespace ME_API.Helpers.AutoMapper
{
    public class EfToDtoMappingProfile : Profile
    {
        public EfToDtoMappingProfile()
        {
            CreateMap<MES_Audit_Brand, BrandDto>();
            CreateMap<MES_Audit_Type_M, AuditTypeDto>();
            CreateMap<MES_Audit_Type_D, AuditType_D_Dto>();
            CreateMap<MES_User, UserForDetailDto>();
            CreateMap<MES_Audit_Roles, AuditRolesDto>();
            CreateMap<MES_Audit_RoleUser, AuditRoleUserDto>();
        }

    }
}