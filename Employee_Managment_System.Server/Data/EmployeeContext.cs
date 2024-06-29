using Employee_Managment_System.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Employee_Managment_System.Server.Data
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options) : base(options) { }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
