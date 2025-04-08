import axios from "axios";
export const getCoinData=(id)=>{
   const coinData= axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      )
      .then((res) => {
        console.log(res);
       return res.data;
      })
      .catch((error) => {
        console.log("error is", error);
      });
      return coinData;
}