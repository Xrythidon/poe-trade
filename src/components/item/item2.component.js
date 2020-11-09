import React, { useState, useEffect } from "react";
import API from "../../search-api";

/*

Do the get request here. So you can process every single item individually without going through a redux state change.

*/

const Item2 = ({ itemId }) => {
  const [item, setItem] = useState({});
  const [fetched, setFetched] = useState(null);



  useEffect(() => {
    let mounted = true;

    

    API.getItem(itemId)
      .then((data) => {
        if(mounted){
          setItem(data);
          console.log("THIS IS THE DATA", data);
          setFetched(!fetched);
        }

      })
      .catch((err) => {
        console.log(err);
        setFetched(false);
      });

    

      return () => mounted = false;

    console.log("1");
  }, []);

  useEffect(() => {
    if (fetched) {
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



          setItem({id, image, ilvl, itemName, accountName, playerName, cost, currencyCost})


      console.log(id);
      console.log("2");
    }
  }, [fetched]);


const {image, itemName, cost, currencyCost, playerName} = item;
  return fetched ? (
    <div>
      <h1>Item Name: {itemName}</h1>
      <img src={image} alt="" />
      <p>price: {cost + " " +  currencyCost}</p>
      <p>player Name: {playerName}</p>
    </div>
  ) : (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Item2;

/*

https://www.youtube.com/watch?v=d_BuEAl_CVM

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

      
        <div>
        <div>
          <h1>Item Name: {itemName}</h1>
          <img src={image} alt="" />
          <p>price: {cost + " " + currencyCost}</p>
          <p>player Name: {playerName}</p>
        </div>
      </div>




*/
