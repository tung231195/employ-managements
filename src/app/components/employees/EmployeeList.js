import {  useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EmployeeForm from './EmployeeForm';
import { deleteEmployee, searchEmploys, setPageSize } from '../../../store/employeeSlice';
import Pagination from './Pagination';
import Toolbar from './Toolbar';

export default function EmployeeList({setShowForm,showForm}) {
  const { employees, currentPage, pageSize } = useSelector(state => state.employees);
  const dispatch = useDispatch();
  /** state */
  const [search,setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState("asc"); // asc | desc
  const [checkItems,setCheckItems] = useState([]);
  const [isCheckAll,setIsCheckAll] = useState(false);
  /** sort */
  const sortedEmployees = [...employees].sort((a, b) => {
    if (!sortBy) return 0;

    let valA = a[sortBy];
    let valB = b[sortBy];

    // ✅ sort for date
    if (sortBy === "dateOfBirth") {
      valA = new Date(valA);
      valB = new Date(valB);
    }

    // ✅ sort number
    if (!isNaN(valA) && !isNaN(valB)) {
      return sortDir === "asc" ? valA - valB : valB - valA;
    }

    // ✅ sort string
    return sortDir === "asc"
      ? valA.toString().localeCompare(valB.toString())
      : valB.toString().localeCompare(valA.toString());
  });
  /** pagination */
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedEmployees = sortedEmployees.slice(
    startIndex,
    startIndex + pageSize
  );
  const totalPages = Math.ceil(sortedEmployees.length / pageSize);
  /** set checked for all items */
  useEffect(() => {
    if (
      paginatedEmployees.length > 0 &&
      paginatedEmployees.every(e => checkItems.includes(e.id))
    ) {
      setIsCheckAll(true);
    } else {
      setIsCheckAll(false);
    }
  }, [checkItems, paginatedEmployees]);


  //use Effect Search
  useEffect(() => {
    if (search.trim() === "") {
      dispatch(searchEmploys({ search: "" }));
    } else {
      dispatch(searchEmploys({ search }));
    }
  }, [search, dispatch]);

  /** checked item process */
  const hanldeCheckItem = (id) => {
    if(checkItems && checkItems.includes(id)) {
      setCheckItems((prev) => prev.filter((p) => p !==id))
    } else {
      setCheckItems((prev) => [...prev,id])
    }
  }
  /** checked all item  process*/
  const handleCheckAllItem = (e) => {
    const ids = paginatedEmployees.map((e) => e.id);

    if (e.target.checked) {
      setCheckItems(prev => [...new Set([...prev, ...ids])]);
    } else {
      setCheckItems(prev => prev.filter(id => !ids.includes(id))); 
    }
  };
  /** delete items selected */
  const handleDeleteSelected = () => {
    if (checkItems.length === 0) {
      return;
    }
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${checkItems.length} employees?`
    );
    if (!confirmDelete) return;
    checkItems.forEach(id => {
      dispatch(deleteEmployee(id));
    });
    setCheckItems([]);     
    setIsCheckAll(false); 
  };
  /** search  */
  const handleSearch = (e) => {
      setSearch(e.target.value)
  }
  /** add button */
  const handleAdd = () => {
    setShowForm(true);
    setEditing(null);
  }
  /** sort employs */
  const handleSort = (field) => {
      if (sortBy === field) {
        setSortDir(prev => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortBy(field);
        setSortDir("asc");
      }
    };
  return (
   <>
      {(editing || showForm) && (
        <EmployeeForm
          employee={editing}   
          onClose={() => {
            setEditing(null);
            setShowForm(false);
          }}
        />
      )}

    <div className='toolbar'>
         <div className='search'>
            <input type='text' onChange={handleSearch} placeholder='enter name to search' />
         </div>
         <Toolbar 
          pageSize={pageSize} 
          setPageSize={setPageSize} 
          handleAdd={handleAdd} 
          checkItems={checkItems}
          handleDeleteSelected = {handleDeleteSelected}
          />
    </div>
    <div>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th><input type="checkbox" checked={isCheckAll ? true : false} onChange={(e)=> handleCheckAllItem(e)} /></th>
            <th>ID</th>
            <th onClick={() => handleSort("name")} className="sortable">
              Name
              {sortBy === "name" && (
                <span className={`sort-icon ${sortDir}`}></span>
              )}
            </th>
            <th onClick={() => handleSort("dateOfBirth") }  className="sortable">
               Date of Birth
               {sortBy === "dateOfBirth" && (
              <span className={`sort-icon ${sortDir}`}></span>
            )}
            </th>
            <th onClick={() => handleSort("gender")} className="sortable">
              <span className="th-content">
                Gender
                {sortBy === "gender" && (
                  <span className={`sort-icon ${sortDir}`}></span>
                )}
              </span>
            </th>
            <th>Email</th>
            <th onClick={() => handleSort("address")} className="sortable">
            Address
            {sortBy === "address" && (
              <span className={`sort-icon ${sortDir}`}></span>
            )}
           </th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginatedEmployees.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: 20 }}>
                No data found
              </td>
            </tr>
          ) : (
            paginatedEmployees.map(emp => (
              <tr key={emp.id}>
                <td>
                  <input 
                    type="checkbox" 
                    checked={checkItems.includes(emp.id)}  
                    onChange={() => hanldeCheckItem(emp.id)}
                  />
                </td>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.dateOfBirth}</td>
                <td>{emp.gender}</td>
                <td>{emp.email}</td>
                <td>{emp.address}</td>
                <td>
                  <button onClick={() => setEditing(emp)}>Edit</button>
                  <button onClick={() => dispatch(deleteEmployee(emp.id))}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
    <Pagination currentPage={currentPage} totalPages={totalPages} /></>
  );
}
