import React, {useState, useEffect} from "react";


/*

Do the get request here. So you can process every single item individually without going through a redux state change.

*/


const Item = ({ item }) => {
    console.log(item);

    let {
        id, // rename
        item: {
            icon: image,
            ilvl: ilvl,
            name: itemName,
        },
        listing: {
            account: {
                name: accountName,
                lastCharacterName: playerName
            },
            price: {
                amount: cost,
                currency: currencyCost

            }
        }
      } = item;
    

      console.log(id,image, ilvl, itemName, accountName, playerName, cost, currencyCost )


  return (
    <div>
      <h1>Item Name: {itemName}</h1>
      <img src={image} alt="" />
      <p>price: {cost + " " +  currencyCost}</p>
      <p>player Name: {playerName}</p>
    </div>
  );
};

export default Item;

/*

https://www.youtube.com/watch?v=d_BuEAl_CVM

  let {
    id: id, // rename
    item: {
      icon: image, // rename
      ilvl: ilvl,
      name: itemName,
    },
    listing: {
      acount: { name: playerName },
      price: {},
    },
  } = item;




*/


