import {Route, Routes, useNavigate} from "react-router-dom";
import Pages from "./utils/Pages.js";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import {useEffect} from "react";
import Cookies from "js-cookie";
import ScheduleEventPage from "./pages/ScheduleEventPage.jsx";
import ViewTask from "./pages/ViewTask.jsx";
import FormA from "./pages/forms/FormA.jsx";
import FormB from "./pages/forms/FormB.jsx";
import FormC from "./pages/forms/FormC.jsx";
import FormD from "./pages/forms/FormD.jsx";
import FormE from "./pages/forms/FormE.jsx";
import FormF from "./pages/forms/FormF.jsx";
import FormG from "./pages/forms/FormG.jsx";
import AllProtocol from "./pages/AllProtocol.jsx";

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
          <Route path={Pages.FormB} element={<FormB />} />
          <Route path={Pages.FormC} element={<FormC />} />
          <Route path={Pages.FormD} element={<FormD />} />
          <Route path={Pages.FormE} element={<FormE />} />
          <Route path={Pages.FormF} element={<FormF />} />
          <Route path={Pages.FormG} element={<FormG />} />
          <Route path={Pages.AllProtocol} element={<AllProtocol />} />
      </Routes>

  )
}

export default App
