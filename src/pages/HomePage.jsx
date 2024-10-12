import Pages from "../utils/Pages.js";
import {useNavigate} from "react-router-dom";

const HomePage = ()=>{

    const navigate = useNavigate();
    const btnCss = "text-sm shadow-sm bg-gray-300 rounded-md p-4 m-1 lg:m-4 cursor-pointer hover:bg-gray-500 hover:text-white "

    return <div className={"h-screen w-full "}>
        <div className={"absolute top-0 w-full text-center p-3 bg-gray-300 z-10 shadow-2xl"}>
            <p>Minkus Admin Panel</p>
        </div>
        <div className={"flex flex-col justify-center h-screen items-center"}>
            <div className={"flex justify-center"}>
                <div
                    className={"text-md shadow-sm bg-gray-300 rounded-md p-4 m-4 cursor-pointer hover:bg-gray-500 hover:text-white "}
                    onClick={() => {
                        navigate(Pages.ScheduleEvent)
                    }}>
                    <p>Schedule Task</p>
                </div>
                <div
                    className={"text-md shadow-sm bg-gray-300 rounded-md p-4 m-4 cursor-pointer hover:bg-gray-500 hover:text-white "}
                    onClick={() => {
                        navigate(Pages.ViewTasks)
                    }}>
                    <p>View Tasks</p>
                </div>
            </div>

            <div className={"grid grid-cols-2 lg:grid-cols-3 mx-2"}>
                <p className={"text-center col-span-full text-gray-500 my-2"}>View Protocols</p>
                <div className={btnCss + "col-span-1"}
                     onClick={() => {
                         navigate(Pages.AllProtocol)
                     }}>
                    <p>All Protocols</p>
                </div>
                <div className={btnCss + "col-span-1"}
                     onClick={() => {
                         navigate(Pages.FormA)
                     }}>
                    <p>Eingangsbereich</p>
                </div>
                <div className={btnCss + "col-span-1"}
                     onClick={() => {
                         navigate(Pages.FormB)
                     }}>
                    <p>Treppenhaus</p>
                </div>
                <div className={btnCss + "col-span-1"}
                     onClick={() => {
                         navigate(Pages.FormC)
                     }}>
                    <p>Keller</p>
                </div>
                <div className={btnCss + "col-span-1"}
                     onClick={() => {
                         navigate(Pages.FormD)
                     }}>
                    <p>Hinterhof (wenn vorhanden)</p>
                </div>
                <div className={btnCss + "col-span-1"}
                     onClick={() => {
                         navigate(Pages.FormE)
                     }}>
                    <p>Außenanlage</p>
                </div>
                <div className={btnCss + "col-span-1"}
                     onClick={() => {
                         navigate(Pages.FormF)
                     }}>
                    <p>Spielplatz</p>
                </div>
                <div className={btnCss + "col-span-1"}
                     onClick={() => {
                         navigate(Pages.FormG)
                     }}>
                    <p>Müll</p>
                </div>
            </div>


        </div>
    </div>
}

export default HomePage