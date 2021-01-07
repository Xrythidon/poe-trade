import axios from "axios";

export default {
  getSearch(query = queryFallback, league = "Standard") {
   return post(`/api/trade/search/${league}`, query);
  },
  getItem(id = "f0e5eb2286b426aa2f9b05a6515f2d0ac87b513bceeb1328ef2f0a63a52ec362") {
    return get(`/api/trade/fetch/${id}`)

  }
};


async function get(getRequest){
  try {
    const response = await axios.get(getRequest)
    

    return response.data.result[0]
  } catch (err) {
    if (err.response) {
      // client received an error response (5xx, 4xx)
      console.log(err.response)
      return err.response.data.error;
    } else if (err.request) {
      console.log(err.request)
      // client never received a response, or request never left
    } else {
      // anything else
      console.log(err, "else")
    }
  }

}


export async function post(postRequest, query) {
  try {
    const response = await axios.post(postRequest, query);
    return response.data.result;
  } catch (err) {
    if (err.response) {
      // client received an error response (5xx, 4xx)
      console.log(err.response)
      return err.response.data.error;
    } else if (err.request) {
      console.log(err.request)
      // client never received a response, or request never left
    } else {
      // anything else
      console.log(err, "else")
    }
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