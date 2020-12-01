import React from 'react'
import Search from '../../components/search/search.component'
import logo from "../../images/logo.png"
import "./search.page.scss"

const SearchPage = () => {
    return (
        <div className="search__wrapper">
        <div className="search">
          <div className="search__img-box">
            <img src={logo} alt="" className="search__img" />
          </div>
            <Search/>
          <div className="search__search-bar">
            <button form="search-form" type="submit" className="search__btn btn btn--large btn--primary">
              Search
            </button>
            <div className="search__bottom-box">
              <button className="search__bottom-btn btn btn--medium btn--secondary">Clear</button>
              <button className="search__bottom-btn btn btn--medium btn--primary">Show Filters</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default SearchPage
