import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEmployee } from '../../store/employeeSlice';
import EmployeeForm from './EmployeeForm';

export default function EmployeeList() {
  const employees = useSelector(state => state.employees.employees);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);

  const [sortBy, setSortBy] = useState(null);

  const sortedEmployees = [...employees].sort((a, b) => {
    if (!sortBy) return 0;
    return a[sortBy].localeCompare(b[sortBy]);
  });
  console.log('aaaaaaaaaa',employees)
  if(employees.length < 1) {
    return ( <div className="empty-message">
        <h5>The data empty</h5>
      </div>)
  }
  return (
    <div>
      {editing && (
        <EmployeeForm employee={editing} onClose={() => setEditing(null)} />
      )}
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={() => setSortBy('name')}>Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Email</th>
            <th onClick={() => setSortBy('address')}>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.dateOfBirth}</td>
              <td>{emp.gender}</td>
              <td>{emp.email}</td>
              <td>{emp.address}</td>
              <td>
                <button onClick={() => setEditing(emp)}>Edit</button>
                <button onClick={() => dispatch(deleteEmployee(emp.id))}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}