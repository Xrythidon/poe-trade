import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {updateQuery, grabAPI} from "../../redux/search/search.actions"

const Search = () => {
  /*
    Build Query Object

    Enter name of item,
    then send query to api,
    then get the search result response back,
    then send Items each id returned.
    
    */
   const search = useSelector((state) => state.search); // redux name in rootReducer
   const dispatch = useDispatch();

   const [name, setName] = useState("")

  const searchQuery = {
    query: {
      filters: {
        trade_filters: {
          disabled: false,
          filters: {
            price: {
              min: 1,
              max: 100,
            },
          },
        },
      },
      status: {
        option: "online",
      },
      stats: [
        {
          type: "and",
          filters: [],
        },
      ],
      name,
    },
    sort: {
      price: "asc",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchQuery, "QUERY JSON")
    dispatch(updateQuery(searchQuery))
    console.log(search, "AFTER SUBMIT");
    dispatch(grabAPI(searchQuery));
  };

  
  const nameChange = (e) => {
    e.preventDefault();
    setName(e.target.value)
  }



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" key="Potato" onChange={nameChange} placeholder="Search Item Here" />
        <input type="submit" value="Submit"  />
      </form>
    </div>
  );
};

export default Search;

// trace

/*

Need to get the search in here then call Item



*/
