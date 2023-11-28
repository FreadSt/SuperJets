import './App.scss';
import {Hangar} from "./pages/Hangar";
import {Sidebar} from "./components/Sidebar";
import {Routes, Route} from "react-router-dom";
import {Missions} from "./pages/Missions";
import {Marketplace} from "./pages/Marketplace";
import {Leaderboard} from "./pages/Leaderboard";
import {Claims} from "./pages/Claims";
import {Rewards} from "./pages/Rewards";

function App() {
  return (
      <div className={"App"}>
        <Sidebar/>
        <Routes>
              <Route path={'/hangar'} element={<Hangar/>}/>
              <Route path={'/missions'} element={<Missions/>}/>
              <Route path={'/marketplace'} element={<Marketplace/>}/>
              <Route path={'/leaderboard'} element={<Leaderboard/>}/>
              <Route path={'/claims'} element={<Claims/>}/>
              <Route path={'/rewards'} element={<Rewards/>}/>
          </Routes>
      </div>
  );
}

export default App;
