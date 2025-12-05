import { useDispatch } from "react-redux";
import { setPage } from "../../../store/employeeSlice";

const Pagination = ({ currentPage, totalPages }) => {
  const dispatch = useDispatch();

  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1));
    }
  };

  const handlePageClick = (page) => {
    dispatch(setPage(page));
  };

  return (
    <div style={{ marginTop: 20, display: "flex", gap: 6, alignItems: "center" }}>
      <button onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            style={{
              fontWeight: currentPage === page ? "bold" : "normal",
              background: currentPage === page ? "#333" : "#fff",
              color: currentPage === page ? "#fff" : "#000",
              padding: "4px 10px",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            {page}
          </button>
        );
      })}
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
