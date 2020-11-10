import React from 'react'
import Search from '../../components/search/search.component'
import logo from "../../images/logo.png"
import "./search.page.scss"

const SearchPage = () => {
    return (
        <div class="search__wrapper">
        <div class="search">
          <div class="search__img-box">
            <img src={logo} alt="" class="search__img" />
          </div>
            <Search/>
          <div class="search__search-bar">
            <button form="search-form" type="submit" class="search__btn btn btn--large btn--primary">
              Search
            </button>
            <div class="search__bottom-box">
              <button class="search__bottom-btn btn btn--medium btn--secondary">Clear</button>
              <button class="search__bottom-btn btn btn--medium btn--primary">Show Filters</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default SearchPage
