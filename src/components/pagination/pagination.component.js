import React from "react";

import "./pagination.component.scss";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-nav">
      <ul className="pagination">
        {pageNumbers.map((number) => {
          return <li
            key={number}
            className="page__item"
            className={number === currentPage ? "page__active" : ""}
          >
            <span onClick={() => paginate(number)} className="page__link">
              {number}
            </span>
          </li>;
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
