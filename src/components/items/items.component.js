import React, { useState, useEffect} from "react";
import { useSelector } from "react-redux";

import Item2 from "../item/item2.component";

const Items = () => {
  const [array, setArray] = useState([]);
  const search = useSelector((state) => state.search); // redux name in rootReducer  


  useEffect(() => {

    if (search.loaded) {
      console.log("loaded data now ready to render");

      setArray(search.currentSearch.slice(0, 5));
    }
  }, [search.loaded]);

  return (
    <div>
      {search.loaded &&
        array.map((searchElement) => <Item2 itemId={searchElement} />)}
    </div>
  );
};
export default Items;
