import axios from "axios";

export default {
  getSearch(query = queryFallback) {
   return post("https://www.pathofexile.com/api/trade/search/Standard", query);
  },
  getItem(id = "f0e5eb2286b426aa2f9b05a6515f2d0ac87b513bceeb1328ef2f0a63a52ec362") {
    return get(`https://www.pathofexile.com/api/trade/fetch/${id}`)

  }
};

async function get(getRequest){
  try {
    const response = await axios.get(getRequest)
    return response.data.result[0]
  } catch (err) {
    return err;
  }

}


async function post(postRequest, query) {
  try {
    const response = await axios.post(postRequest, query);
    return response.data.result;
  } catch (err) {
    return err;
  }
}

const queryFallback = {
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
    name: "Tabula Rasa",
    type: "Simple Robe",
  },
  sort: {
    price: "asc",
  },
}