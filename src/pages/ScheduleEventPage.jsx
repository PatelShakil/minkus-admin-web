import {useEffect, useState} from "react";
import Cons from "../utils/Cons.js";
import Pages from "../utils/Pages.js";
import {useNavigate} from "react-router-dom";
import Loading from "../components/Loading.jsx";

const ScheduleEventPage = () => {

    const [selEmail, setSelEmail] = useState();
    const [date, setDate] = useState();
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("")
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

            // Check if the response is okay
            if (!response.ok) {
                console.error('HTTP error:', response.status);
                return;
            }

            // Parse the response as JSON
            const data = await response.json();

            // Check the API response status
            if (data.status) {
                // Handle the data if users were found
                console.log("Users found:", data.data);
                setData(data.data);
            } else {
                // Handle the case where no users were found
                console.log(data.message);
            }
            setIsLoading(false)

        } catch (error) {
            // Catch and handle any errors
            console.error('Error fetching users:', error);
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getAllUsers();
    }, []);


    return <div className={"h-screen flex flex-col justify-center items-center"}>
        {
            isLoading && (
                <Loading />
            )
        }
        <div className={"lg:w-2/5 rounded-md drop-shadow-2xl bg-gray-50 p-5 mx-2 lg:m-0"}>

            <h3 className={"my-3 text-center"}>Schedule Task</h3>
            <label className={"mb-1 font-bold text-sm pl-2 mt-4"}>Select User</label>

            <select value={selEmail}
                    className={"w-full bg-gray-100 p-2 rounded-md outline-1 mb-4 "}
                    onChange={(err) => {
                        setSelEmail((err.target.value))
                    }}>
                <option value={""}>--Select-User--</option>
                {
                    data && (
                        data.map((user,index) => <option key={index} value={user.email}>{user.name}</option>)
                    )

                }
            </select>
            <label className={"mb-1 font-bold text-sm pl-2"}>Task Date</label>
            <input type={"date"}
                   value={date}
                   className={"w-full bg-gray-100 p-2 rounded-md outline-1 mb-4"}
                   onChange={(err) => {
                       setDate((err.target.value))
                   }}/>
            <label className={"mb-1 font-bold text-sm pl-2"}>Title</label>
            <input type={"text"}
                   value={title}
                   className={"w-full bg-gray-100 p-2 rounded-md outline-1 mb-4"}
                   placeholder={"Enter Task Title"}
                   onChange={(err) => {
                       setTitle((err.target.value))
                   }}/>
            <label className={"mb-1 font-bold text-sm pl-2"}>Description</label>
            <input type={"text"}
                   value={des}
                   className={"w-full bg-gray-100 p-2 rounded-md outline-1 mb-4"}
                   placeholder={"Enter Task Description"}
                   onChange={(err) => {
                       setDes((err.target.value))
                   }}/>
            <button
                onClick={onAddTask}
                className={"w-full bg-gray-700 text-white hover:bg-gray-800 text-center p-2 rounded-md hover:shadow-3xl"}>
                Add Task
            </button>


        </div>
    </div>
}

export default ScheduleEventPage