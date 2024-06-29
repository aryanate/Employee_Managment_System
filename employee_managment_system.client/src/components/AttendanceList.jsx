import { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceList = () => {
    const [attendances, setAttendances] = useState([]);
    const [newAttendance, setNewAttendance] = useState({ employeeId: '', clockIn: '', clockOut: '' });
    const [editingAttendance, setEditingAttendance] = useState(null);

    useEffect(() => {
        fetchAttendances();
    }, []);

    const fetchAttendances = async () => {
        try {
            const response = await axios.get('http://localhost:5203/api/attendance', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setAttendances(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddAttendance = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5203/api/attendance', newAttendance, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setNewAttendance({ employeeId: '', clockIn: '', clockOut: '' });
            fetchAttendances();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateAttendance = async (attendance) => {
        try {
            await axios.put(`http://localhost:5203/api/attendance/${attendance.id}`, attendance, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setEditingAttendance(null);
            fetchAttendances();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteAttendance = async (id) => {
        try {
            await axios.delete(`http://localhost:5203/api/attendance/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            fetchAttendances();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditClick = (attendance) => {
        setEditingAttendance(attendance);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingAttendance) {
            setEditingAttendance({ ...editingAttendance, [name]: value });
        } else {
            setNewAttendance({ ...newAttendance, [name]: value });
        }
    };

    return (
        <div>
            <h2>Attendance List</h2>
            <form onSubmit={handleAddAttendance}>
                <input type="text" name="employeeId" placeholder="Employee ID" value={newAttendance.employeeId} onChange={handleInputChange} required />
                <input type="datetime-local" name="clockIn" placeholder="Clock In" value={newAttendance.clockIn} onChange={handleInputChange} required />
                <input type="datetime-local" name="clockOut" placeholder="Clock Out" value={newAttendance.clockOut} onChange={handleInputChange} required />
                <button type="submit">Add Attendance</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Clock In</th>
                        <th>Clock Out</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {attendances.map(attendance => (
                        <tr key={attendance.id}>
                    <td>{attendance.employeeId}</td>
                    <td>{attendance.clockIn}</td>
                    <td>{attendance.clockOut}</td>
                    <td>
                        <button onClick={() => handleEditClick(attendance)}>Edit</button>
                        <button onClick={() => handleDeleteAttendance(attendance.id)}>Delete</button>
                </td>
            </tr>
          ))}
            {editingAttendance && (
                <tr>
                    <td><input type="text" name="employeeId" value={editingAttendance.employeeId} onChange={handleInputChange} /></td>
                    <td><input type="datetime-local" name="clockIn" value={editingAttendance.clockIn} onChange={handleInputChange} /></td>
                    <td><input type="datetime-local" name="clockOut" value={editingAttendance.clockOut} onChange={handleInputChange} /></td>
                    <td>
                        <button onClick={() => handleUpdateAttendance(editingAttendance)}>Save</button>
                        <button onClick={() => setEditingAttendance(null)}>Cancel</button>
                    </td>
                </tr>
            )}
        </tbody>
      </table >
    </div >
  );
};

export default AttendanceList;