import axios from "axios";
export const getPriceData=(id,days,Type)=>{
    const coinprices=axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`)
    .then((res) => {
      if (res.data) {
        console.log("Prices>>>", res.data);
        if (Type == "market_caps") {
          return res.data.market_caps;
        } else if (Type == "total_volumes") {
          return res.data.total_volumes;
        } else {
          return res.data.prices;
        }
      }
      })
      .catch((error) => {
        console.log("error is", error);
      });
     return coinprices;
}