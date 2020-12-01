import React, { useState, useEffect } from "react";
import API from "../../search-api";

import chaosCurrency from "../../images/ChaosOrb.png";
import "./item.component.scss";

/*

Do the get request here. So you can process every single item individually without going through a redux state change.

*/

const dummyObject = {};

const Item2 = ({ itemId }) => {
  const [item, setItem] = useState({});
  const [fetched, setFetched] = useState(null);

  useEffect(() => {
    let mounted = true;

    API.getItem(itemId)
      .then((data) => {
        if (mounted) {
          setItem(data);
          console.log("THIS IS THE DATA", data);
          setFetched(!fetched);
        }
      })
      .catch((err) => {
        console.log(err);
        setFetched(false);
      });

    return () => (mounted = false);

    console.log("1");
  }, []);

  useEffect(() => {
    // Long Destructure

    if (fetched) {
      let {
        id, // rename
        item: { icon: image, ilvl: ilvl, name: itemName, explicitMods: explicitMods, corrupted: corrupted, implicitMods: implicitMods },
        listing: {
          account: { name: accountName, lastCharacterName: playerName },
          price: { amount: cost, currency: currencyCost },
        },
      } = item;

      // Putting the destructured variables back into
      // Item to destructure for render
      setItem({
        id,
        image,
        ilvl,
        itemName,
        accountName,
        playerName,
        cost,
        currencyCost,
        explicitMods,
        corrupted,
        implicitMods
      });

      console.log(item);
      console.log("2");
    }
  }, [fetched]);

  const { image, itemName, cost, currencyCost, playerName, ilvl, explicitMods, implicitMods, corrupted} = item;
  return fetched ? (
    <div className="result">
      <div className="result__container">
        <div className="icon__container">
          <img className="icon" src={image} alt="" />
          <div className="icon__text-box">
            <p className="icon__text">
              Sockets: <span className="icon__links">6w</span>
            </p>
          </div>
        </div>

        <div className="item__box">
          <h2 className="item__name">{itemName}</h2>
  <p className="item__ilvl">Item Level: {ilvl}</p>
          {implicitMods && (  implicitMods.map((implicitMod) => <p className="item__implicit">{implicitMod}</p>))} {/*Put seperator here, add conditional for implicitMods exist */}
          {corrupted && <p className="item__corrupted">Corrupted</p> }
          <ul className="item__explicits">
            {
              explicitMods && explicitMods.map((explicitMod) => <li className="item__explicit">{explicitMod}</li> )
            }
          </ul>
          <div className="item__sale-box">
            <div className="item__price-box">
              <p className="item__price">{cost + " " + currencyCost}</p>
              <img
                src={chaosCurrency}
                alt=""
                className="currency-icon"
                width="24px"
              />
            </div>
            <div className="item__status">
              <span className="status__online">Online</span>
              <span className="status__name">{" "}IGN: {playerName} {" "}</span>
              <button className="status__whisper btn"> Whisper</button>
            </div>
          </div>
        </div>
      </div>
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
