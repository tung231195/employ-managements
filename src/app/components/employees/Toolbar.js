import { useDispatch } from "react-redux"

const Toolbar = ({pageSize,setPageSize,handleAdd,checkItems,handleDeleteSelected}) => {
  const dispatch = useDispatch();
  return (
    <div className='action'>
              <div className='perpage'>    
                  <select
                    value={pageSize}
                    onChange={(e) => dispatch(setPageSize(Number(e.target.value)))}
                  >
                  <option value={2}>2 / page</option>
                  <option value={5}>5 / page</option>
                  <option value={10}>10 / page</option>
                  <option value={20}>20 / page</option>
                  <option value={50}>50 / page</option>
                </select>
              </div>

               <button onClick={() => handleAdd(true)}>Add Employee</button>
                {checkItems.length> 0 && 
                <button 
                  className='action'
                  onClick={handleDeleteSelected}
                  disabled={checkItems.length === 0}
                  style={{
                    background: "red",
                    color: "white",
                    padding: "6px 12px",
                    cursor: checkItems.length === 0 ? "not-allowed" : "pointer"
                  }}
                >
                  Delete Selected ({checkItems.length})
                </button>
                }
          </div>
  )
}

export default Toolbar