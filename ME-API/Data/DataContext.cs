using ME_API.Models;
using Microsoft.EntityFrameworkCore;

namespace ME_API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<MES_Audit_Brand> MES_Audit_Brand { get; set; }
    }
}