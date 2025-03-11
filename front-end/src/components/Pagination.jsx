import "../styles/pagination.css";

export default function Pagination({
  maxPage,
  totalPage,
  currentPage,
  setCurrentPage,
}) {
  const handleJumpPage = (type) => {
    if (type === "prev" && maxPage - 9 > 1) {
      // 페이지 단위 * 2 - 1
      setCurrentPage(maxPage - 19);
    } else if (type === "next" && maxPage < totalPage) {
      // 페이지 단위 + 1
      setCurrentPage(maxPage + 1);
    }
  };

  return (
    <div className="pagination">
      <img
        src="button_prev.png"
        onClick={() => {
          handleJumpPage("prev");
        }}
      ></img>
      {Array.from({ length: 10 }).map((_, i) => {
        const start = Math.max(0, maxPage - 9); // i의 시작점 설정
        const pageNumber = start + i;

        if (pageNumber > totalPage) return null;

        return (
          <div
            key={pageNumber}
            className={`body_2 pageNum ${
              currentPage === pageNumber ? "pageOn" : ""
            }`}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </div>
        );
      })}
      <img
        src="button_next.png"
        onClick={() => {
          handleJumpPage("next");
        }}
      ></img>
    </div>
  );
}
