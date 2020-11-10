import React, { useState, useEffect, lazy, Suspense } from "react";
import { useSelector } from "react-redux";

import Item2 from "../item/item2.component";
import Pagination from "../pagination/pagination.component";

import "./items.component.scss";

const Items = () => {
  const [array, setArray] = useState([]);
  const [next, setNext] = useState(5);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const search = useSelector((state) => state.search); // redux name in rootReducer

  useEffect(() => {
    if (search.loaded) {
      console.log("loaded data now ready to render");

      setArray(search.currentSearch.slice(0, 5));
    }
  }, [search.currentSearch]);

  useEffect(() => {}, []);

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  let mapArray = [];
  const itemToMap = (array) => {
    if (search.loaded) {
      mapArray = array.map((searchElement) => (
        <Item2 itemId={searchElement} key={searchElement} />
      ));
    }
    console.log(mapArray);
    return mapArray;
  };

  // PAGINATION
  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = search.currentSearch.slice(
    indexofFirstPost,
    indexOfLastPost
  );

  const lastPage = Math.ceil(search.currentSearch.length / postsPerPage);

  let totalresults = currentPosts.length * currentPage;

  if (lastPage === currentPage) {
    totalresults = currentPosts.length + postsPerPage * (currentPage - 1);
  }

  /* 
  5 <- page 1
  10 <- 2
  15 <- 3
  20 <- 4
  23 <- 5

  
  
  RESULT: 23;
  */

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    {search.loaded && (
      <h1 className="results__title">
        {" "}
        Showing {totalresults} Results ({search.currentSearch.length} Matched)
      </h1>
    )}
    <>

      {itemToMap(currentPosts)}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={search.currentSearch.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
    </>
  );
};
export default Items;
