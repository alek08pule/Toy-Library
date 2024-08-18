import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Library from "./Pages/Library";
import MyProfile from "./Pages/MyProfile";
import CartPage from "./Pages/CartPage";
import NotFound from "./Pages/NotFound";
import logo from "./Assets/logo.png";
import logoWhite from "./Assets/Logo2White.png";
import { useState } from "react";

import { BrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";

function App() {
  const [userId, setUserId] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home logoWhite={logoWhite} />} />
          <Route
            exact
            path="/Login"
            element={<Login logoWhite={logoWhite} setUserId={setUserId} />}
          />
          <Route
            exact
            path="/Library/*"
            element={<Library logo={logo} userId={userId} />}
          />
          <Route path="/MyProfile" element={<MyProfile logo={logo} />} />
          <Route
            path="/CartPage"
            element={<CartPage logo={logo} userId={userId} />}
          />
          <Route path="*" element={<NotFound logo={logo} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
