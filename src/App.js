import './App.scss';
import {MainPage} from "./pages/MainPage";
import {Sidebar} from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <MainPage/>
      <Sidebar/>
    </div>
  );
}

export default App;
