import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Input from "./components/Input";
import Selecttheme from "./components/Selecttheme";
import Classic from "./Themes/Classic";
import Creative from "./Themes/Creative";
import Minimalist from "./Themes/Minimalist";
import Modern from "./Themes/Modern";
import Professional from "./Themes/Professional";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/input" element={<Input />} />
          <Route path="/selecttheme" element={<Selecttheme />} />
          <Route path='/theme-minimalist/download' element={<Minimalist />} />
          <Route path='/theme-professional/download' element={<Professional/>} />
          <Route path='/theme-modern/download' element={<Modern />} />
          <Route path="/theme-classic/download" element={<Classic />} />
          <Route path='/theme-creative/download' element={<Creative />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
