import {useState} from "react";
import Cons from "../utils/Cons.js";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import Pages from "../utils/Pages.js";
import Loading from "../components/Loading.jsx";


const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function onLogin() {
        setIsLoading(true);
        if (email && password) {
            try {
                const data = new FormData();
                data.set("email", email);
                data.set("password", password);

                const response = await fetch(`${Cons.BASE_URL}/admin-login.php`, {
                    method: "POST",
                    body: data
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const responseData = await response.json(); // Parse JSON data

                if (responseData.status !== false) {
                    const obj = responseData.data;
                    Cookies.set("email", obj.email);
                    Cookies.set("password", obj.password);
                    Cookies.set("name", obj.name);
                    navigate(Pages.HOME);
                } else {
                    alert(responseData.message); // Show error message from the backend
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Login failed", error);
                alert(error.message);
                setIsLoading(false);
            }
        } else {
            alert("Please fill all the fields");
            setIsLoading(false);
        }
    }

    return <div className={"h-screen mx-10 flex justify-center items-center"}>
        {
            isLoading && (<Loading />)
        }
        <div className={"lg:w-2/5  rounded-md drop-shadow-2xl bg-gray-50 p-5 text-center"}>
            <img src={"./login_logo.png"} alt={"Logo Home"}/>
            <h3 className={"my-3"}>Admin Login</h3>
            <input type={"email"}
                   value={email}
                   className={"w-full bg-gray-100 p-2 rounded-md outline-1 mb-4 mt-4"}
                   placeholder={"Enter email"}
                   onChange={(err) => {
                       setEmail((err.target.value))
                   }}/>
            <input type={"password"}
                   value={password}
                   className={"w-full bg-gray-100 p-2 rounded-md outline-1 mb-4"}
                   placeholder={"Enter password"}
                   onChange={(err) => {
                       setPassword((err.target.value))
                   }}/>
            <button
                onClick={onLogin}
                className={"w-full bg-gray-700 text-white hover:bg-gray-800 text-center p-2 rounded-md hover:shadow-3xl"}>
                Login
            </button>


        </div>

    </div>
}
export default LoginPage