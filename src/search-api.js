import axios from "axios";

export default {
  getSearch() {
   return post("https://www.pathofexile.com/api/trade/search/Standard");
  },
  getItem(id = "ca4bf4bbc0a2c229be0d3965861da957137291e93d3b7102a0e232f9473d1821") {
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

async function post(postRequest) {
  try {
    const response = await axios.post(postRequest, {
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
    });
    return response.data.result;
  } catch (err) {
    return err;
  }
}
