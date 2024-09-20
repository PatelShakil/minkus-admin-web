import {Route, Routes, useNavigate} from "react-router-dom";
import Pages from "./utils/Pages.js";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import {useEffect} from "react";
import Cookies from "js-cookie";
import ScheduleEventPage from "./pages/ScheduleEventPage.jsx";
import ViewTask from "./pages/ViewTask.jsx";
import FormA from "./pages/forms/FormA.jsx";

function App() {

    const navigate = useNavigate();
    useEffect(() => {
        const email = Cookies.get("email");
        if (window.location.pathname === Pages.HOME && email == null){
            navigate(Pages.Login);
        }
    }, );

  return (
      <Routes>
          <Route path={Pages.Login} element={<LoginPage />} />
          <Route path={Pages.HOME} element={<HomePage />} />
          <Route path={Pages.ScheduleEvent} element={<ScheduleEventPage />} />
          <Route path={Pages.ViewTasks} element={<ViewTask />} />
          <Route path={Pages.FormA} element={<FormA />} />
      </Routes>

  )
}

export default App
