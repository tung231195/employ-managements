import React, {  useState } from 'react';

import EmployeeList from './app/components/employees/EmployeeList';

function App() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className='employs'>
      <h1>Employee Management</h1>
      <EmployeeList setShowForm={setShowForm} showForm={showForm} />
    </div>
  );
}

export default App;