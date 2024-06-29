namespace Employee_Managment_System.Server.Models
{
    public class Attendance
    {
        public int Id { get; set; }
        public int EmployeeId { get; set;}
        public DateTime ClockIn { get; set; }
        public DateTime ClockOut { get; set; }
    }
}
