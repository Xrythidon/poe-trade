import React from "react";

import "./pagination.component.scss";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page__item" className={ (number === currentPage) ? "page__active" : ""}>
            <a onClick={() => paginate(number)} href="!#" className="page__link">
                {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
