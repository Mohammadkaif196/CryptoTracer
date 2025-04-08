import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import TabComponent from "../components/Dashboard/Tabs";
import axios from "axios";
import Search from "../components/Dashboard/Search";
import PaginationComponent from "../components/Dashboard/Pagination";
import LoaderComponent from "../components/Common/Loader";
import BackToTopComponent from "../components/Common/BackToTop"
import MovingNav from "../components/Common/SecondNav";
function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
    var initialCount = (value - 1) * 10;
    setPaginatedCoins(coins.slice(initialCount, initialCount + 12));
  };
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const filterCoins = coins.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase())
  ); //for filtering coins
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        console.log(res);
        setCoins(res.data);
        setPaginatedCoins(res.data.slice(0, 12));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error is", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <MovingNav/>
      {isLoading ? 
        <LoaderComponent />
       : (
        <div>
          <Search search={search} onSearchChange={onSearchChange} />
          <TabComponent coins={search ? filterCoins : paginatedCoins} />
          {!search && (
            <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
            />
            
          )}
           <BackToTopComponent/>
        </div>
       
      )}
    </>
  );
}

export default DashboardPage;
