import { useEffect } from "react";
import { PaginationNext, PaginationPrev } from "@/svg";

const Pagination = ({
  items = [],
  countOfPage = 12,
  paginatedData,
  currPage,
  setCurrPage,
}) => {
  const totalPage = Math.ceil(items.length / countOfPage); // Calculate total pages

  function setPage(idx) {
    if (idx <= 0 || idx > totalPage) {
      return; // Prevent setting invalid page numbers
    }
    setCurrPage(idx);
    window.scrollTo(0, 0); // Scroll to top
    paginatedData(items, (idx - 1) * countOfPage, countOfPage); // Update paginated data
  }

  useEffect(() => {
    paginatedData(items, (currPage - 1) * countOfPage, countOfPage); // Update paginated data on current page change
  }, [items, currPage, countOfPage]); // Dependencies

  return (
    <nav>
      {totalPage > 1 && (
        <ul>
          <li>
            <button
              onClick={() => setPage(currPage - 1)}
              className={`tp-pagination-prev prev page-numbers ${
                currPage === 1 ? "disabled" : ""
              }`}
              disabled={currPage === 1}
              style={{
                backgroundColor: "#990100",
                color: "white",
                border: "solid 1px #990100",
              }}
            >
              <PaginationPrev />
            </button>
          </li>

          {Array.from({ length: totalPage }, (_, i) => i + 1).map((n) => (
            <li key={n} onClick={() => setPage(n)}>
              <span
                style={{
                  backgroundColor: "#990100",
                  color: "white",
                  border: "solid 1px #990100",
                }}
                className={`${currPage === n ? "current" : ""}`}
              >
                {n}
              </span>
            </li>
          ))}

          <li>
            <button
              onClick={() => setPage(currPage + 1)}
              className={`next page-numbers ${
                currPage === totalPage ? "disabled" : ""
              }`}
              style={{
                backgroundColor: "#990100",
                color: "white",
                border: "solid 1px #990100",
              }}
              disabled={currPage === totalPage}
            >
              <PaginationNext />
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Pagination;
