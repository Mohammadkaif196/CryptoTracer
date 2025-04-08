import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import HomePage from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import CoinPage from "./pages/CoinPage"
import ComparePage from "./pages/ComparePage";
import { ToastContainer, toast } from "react-toastify";
import WatchPage from "./pages/WatchPage";
function App() {
  return (
    <div className="App">
      <ToastContainer />
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/dashboard" element={<DashboardPage/>}></Route>
      <Route path="/coin/:id" element={<CoinPage/>}></Route>
      <Route path="/compare" element={<ComparePage/>}></Route>
      <Route path="/watchlist" element={<WatchPage/>}></Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
