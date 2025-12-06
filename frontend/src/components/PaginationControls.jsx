const PaginationControls = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="pagination-controls">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
