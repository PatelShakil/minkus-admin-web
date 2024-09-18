import {Route, Routes} from "react-router-dom";
import Pages from "./utils/Pages.js";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

function App() {

  return (
      <Routes>
          <Route path={Pages.Login} element={<LoginPage />} />
          <Route path={Pages.HOME} element={<HomePage />} />
      </Routes>

  )
}

export default App
