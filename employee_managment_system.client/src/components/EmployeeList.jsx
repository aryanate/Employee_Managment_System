import  { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({ name: '', jobTitle: '', department: '', contact:'' });
    const [editingEmployee, setEditingEmployee] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5203/api/employees', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setEmployees(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5203/api/employees', newEmployee, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setNewEmployee({ name: '', jobTitle: '', department: '', contact: '' });
            fetchEmployees();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateEmployee = async (employee) => {
        try {
            await axios.put(`http://localhost:5203/api/employees/${employee.id}`, employee, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setEditingEmployee(null);
            fetchEmployees();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteEmployee = async (id) => {
        try {
            await axios.delete(`http://localhost:5203/api/employees/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            fetchEmployees();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditClick = (employee) => {
        setEditingEmployee(employee);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingEmployee) {
            setEditingEmployee({ ...editingEmployee, [name]: value });
        } else {
            setNewEmployee({ ...newEmployee, [name]: value });
        }
    };

    return (
        <div>
        
            <h2>Employee List</h2>
            <form onSubmit={handleAddEmployee}>
                <input type="text" name="name" placeholder="Name" value={newEmployee.name} onChange={handleInputChange} required />
                <input type="text" name="jobtitle" placeholder="Job Title" value={newEmployee.jobTitle} onChange={handleInputChange} required />
                <input type="text" name="department" placeholder="Department" value={newEmployee.department} onChange={handleInputChange} required />
                <input type="text" name="contact" placeholder="Contact" value={newEmployee.contact} onChange={handleInputChange} required />
                <button type="submit">Add Employee</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Job Title</th>
                        <th>Department</th>
                        <th>Contact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                    <tr key ={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.jobTitle}</td>
                            <td>{employee.department}</td>
                            <td>{employee.contact}</td>
                            <td>
                        <button onClick={() => handleEditClick(employee)}>Edit</button>
                                <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
            </td>
        </tr>
    ))
}
{
    editingEmployee && (
            <tr>
                                <td><input type="text" name="name" value={editingEmployee.name} onChange={handleInputChange} /></td>
                                <td><input type="text" name="jobtitle" value={editingEmployee.jobTitle} onChange={handleInputChange} /></td>
                                <td><input type="text" name="department" value={editingEmployee.department} onChange={handleInputChange} /></td>
                                <td><input type="text" name="contact" value={editingEmployee.contact} onChange={handleInputChange} /></td>
              <td>
                <button onClick={() => handleUpdateEmployee(editingEmployee)}>Save</button>
                <button onClick={() => setEditingEmployee(null)}>Cancel</button>
              </td>
            </tr >
          )
}
        </tbody >
      </table >
    </div >
  );
};

export default EmployeeList;