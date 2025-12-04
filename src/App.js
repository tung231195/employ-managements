import React, { useState } from 'react';
import EmployeeForm from './components/employees/EmployeeForm';
import EmployeeList from './components/employees/EmployeeList';

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Employee Management</h1>
      {showForm ? (
        <EmployeeForm onClose={() => setShowForm(false)} />
      ) : (
        <div style={{display:"flex",justifyContent:"center"}}>
            <button onClick={() => setShowForm(true)}>Add Employee</button>
        </div>
      )}
      <EmployeeList />
    </div>
  );
}

export default App;