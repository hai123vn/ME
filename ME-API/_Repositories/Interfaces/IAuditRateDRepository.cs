using ME_API.Data;
using ME_API.Models;

namespace ME_API._Repositories.Interfaces
{
    public interface IAuditRateDRepository : IMERepository<MES_Audit_Rate_D>
    {
        int SumRating0(string record_Id);
        int SumRating1(string record_Id);
        int? SumRatingNa(string record_Id);
        int SumEachRating1InAuditTypeDAndAuditRateD(string record_Id);
        int SumEachRating0InAuditTypeDAndAuditRateD(string record_Id);
        int? SumEachRatingNaInAuditTypeDAndAuditRateD(string record_Id);

    }
}