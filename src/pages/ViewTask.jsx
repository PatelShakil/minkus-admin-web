import Cons from "../utils/Cons.js";
import {useEffect, useState} from "react";
import Loading from "../components/Loading.jsx";

const ViewTask = ()=>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function onDeleteTask(id) {
        try {
            setIsLoading(true)
            const d = new FormData();
            d.set("id",id);
            const response = await fetch(Cons.BASE_URL + "/delete-task.php", {
                method: "POST",
                body:d
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
                getAllTasks();
            } else {
                // Handle the case where no users were found
                console.log(data.message);
            }
            setIsLoading(false)

        } catch (error) {
            // Catch and handle any errors
            console.error('Error Deleting tasks:', error);
            setIsLoading(false)
        }
    }

    async function getAllTasks() {
        try {
            setIsLoading(true)
            const response = await fetch(Cons.BASE_URL + "/get-all-tasks.php", {
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
                console.log("Task found:", data.data);
                setData(data.data);
            } else {
                // Handle the case where no users were found
                console.log(data.message);
            }
            setIsLoading(false)

        } catch (error) {
            // Catch and handle any errors
            console.error('Error fetching tasks:', error);
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getAllTasks();
    }, []);



    return <div className={"flex flex-col"}>
        {
            isLoading && (<Loading />)
        }
        <div className={"fixed top-0 w-full text-center p-3 bg-gray-300 z-10 shadow-2xl"}>
            <p>All Tasks</p>
        </div>
        <div className={"flex mt-14 flex-col mx-2"}>
            {
                data && (
                    data.map((task,index)=>(<div key={index} className={`flex shadow-sm p-2 m-1 rounded-md bg-gray-100`}>
                        <div className={"absolute h-10 w-10 bg-gray-300 rounded-full text-center flex items-center justify-center"
                        }
                        style={{
                            backgroundColor:task.task.color
                        }}
                        >{task.task.id}</div>
                        <div className={"absolute right-0 mr-4 text-sm font-bold bg-gray-300 rounded-md px-2"}>Date : {task.task.date}</div>
                        <span className={"ps-12 pt-4"}>
                            <p className={" font-semibold"}>{task.task.title}</p>
                            <p className={"text-sm"}>{task.task.description}</p>
                            <p className={"pt-2 text-sm"}>
                                Email : <b>{task.user.email}</b>
                            </p>
                            <button
                                onClick={()=>{onDeleteTask(task.task.id)}}
                                className={"bg-red-400 px-4 text-white text-sm p-1 shadow-md hover:bg-red-600 mt-2 rounded-md"}>Delete</button>
                        </span>

                    </div>))
                )
            }

        </div>


    </div>

}

export default ViewTask