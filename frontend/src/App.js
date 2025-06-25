import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import NewNavbaar from "./components/newNavbaar/NewNavbaar";
import Maincomponent from "./components/home/Maincomponent";
import Slide from "./components/home/Slide";
import Footer from "./components/footer/Footer";
import Routing from "./components/routing/Routing";

function App() {
  return (
    <div className="App">
      {/* <Navbar />
      <NewNavbaar />
      <Maincomponent />
      <Footer /> */}
      <Routing />
    </div>
  );
}

export default App;
