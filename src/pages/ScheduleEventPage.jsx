import {useEffect, useState} from "react";
import Cons from "../utils/Cons.js";
import Pages from "../utils/Pages.js";
import {useNavigate} from "react-router-dom";
import Loading from "../components/Loading.jsx";

const ScheduleEventPage = () => {

    const [selEmail, setSelEmail] = useState("");
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
    const [isMull, setIsMull] = useState(false);  // New state for toggle
    const [color, setColor] = useState("");       // New state for color picker
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function onAddTask() {
        if(selEmail && date && title && des){
            setIsLoading(true);
            const data = new FormData();
            data.set("email",selEmail);
            data.set("date",date);
            data.set("title",title);
            data.set("desc",des);
            data.set("is_mull", isMull ? "1" : "0"); // Pass toggle value
            if(isMull) {
                data.set("color", color); // Pass color if is_mull is true
            }

            let resp = await fetch(Cons.BASE_URL + "/add-task.php",{
                method:"POST",
                body:data
            });

            resp = await resp.json();
            setIsLoading(false)
            console.log(resp);
            if(resp.status){
                alert("Task Added");
                navigate(Pages.HOME);
            }else{
                alert(resp.data.message);
            }

        }else{
            alert("Please fill all details!!!");
        }
    }

    async function getAllUsers() {
        try {
            setIsLoading(true)
            const response = await fetch(Cons.BASE_URL + "/get-all-users.php", {
                method: "GET",
            });

            if (!response.ok) {
                console.error('HTTP error:', response.status);
                return;
            }

            const data = await response.json();

            if (data.status) {
                console.log("Users found:", data.data);
                setData(data.data);
            } else {
                console.log(data.message);
            }
            setIsLoading(false)

        } catch (error) {
            console.error('Error fetching users:', error);
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div className={"h-screen flex flex-col justify-center items-center"}>
            {isLoading && <Loading />}
            <div className={"lg:w-2/5 rounded-md drop-shadow-2xl bg-gray-50 p-5 mx-2 lg:m-0"}>

                <h3 className={"my-3 text-center"}>Schedule Task</h3>

                <label className={"mb-1 font-bold text-sm pl-2 mt-4"}>Select User</label>
                <select
                    value={selEmail}
                    className={"w-full bg-gray-100 p-2 rounded-md outline-1 mb-4"}
                    onChange={(e) => setSelEmail(e.target.value)}>
                    <option value={""}>--Select-User--</option>
                    {
                        data.map((user, index) =>
                            <option key={index} value={user.email}>{user.name}</option>
                        )
                    }
                </select>

                <label className={"mb-1 font-bold text-sm pl-2"}>Task Date</label>
                <input type={"date"}
                       value={date}
                       className={"w-full bg-gray-100 p-2 rounded-md outline-1 mb-4"}
                       onChange={(e) => setDate(e.target.value)} />

                <label className={"mb-1 font-bold text-sm pl-2"}>Title</label>
                <input type={"text"}
                       value={title}
                       className={"w-full bg-gray-100 p-2 rounded-md outline-1 mb-4"}
                       placeholder={"Enter Task Title"}
                       onChange={(e) => setTitle(e.target.value)} />

                <label className={"mb-1 font-bold text-sm pl-2"}>Description</label>
                <input type={"text"}
                       value={des}
                       className={"w-full bg-gray-100 p-2 rounded-md outline-1 mb-4"}
                       placeholder={"Enter Task Description"}
                       onChange={(e) => setDes(e.target.value)} />

                {/* Toggle button for is_mull */}
                <div className="flex items-center justify-between mb-4">
                    <label className={"mb-1 font-bold text-sm pl-2"}>Is Mull?</label>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={isMull}
                            onChange={() => setIsMull(!isMull)}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                {/* Conditionally show color picker */}
                {
                    isMull && (
                        <div className={"mb-4 items-center gap-x-3 justify-center flex"}>
                            <label className={"mb-1 font-bold text-sm pl-2"}>Select Color</label>
                            <input
                                type="color"
                                value={color}
                                className={"w-12 h-12 bg-white rounded-lg"}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </div>
                    )
                }

                <button
                    onClick={onAddTask}
                    className={"w-full bg-gray-700 text-white hover:bg-gray-800 text-center p-2 rounded-md hover:shadow-3xl"}>
                    Add Task
                </button>

            </div>
        </div>
    );
}

export default ScheduleEventPage;
