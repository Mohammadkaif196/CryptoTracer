
import { toast } from "react-toastify";
export const saveToWatchList = (e, id) => {
  e.preventDefault();
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  if (!watchlist.includes(id)) {
    watchlist.push(id);
    toast.success(
      `${
        id.substring(0, 1).toUpperCase() + id.substring(1)
      } - added to the watchlist`
    );
  } else {
    toast.error(
      `${
        id.substring(0, 1).toUpperCase() + id.substring(1)
      } - is already added to the watchlist!`
    );
  }
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
};


