import {useState} from "react";

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return <div className={"h-screen flex justify-center items-center"}>
        <div className={"lg:w-2/5 rounded-md drop-shadow-2xl bg-gray-50 p-5 text-center"}>
            <h3>Admin Login</h3>
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
            <button className={"w-full bg-gray-700 text-white hover:bg-gray-800 text-center p-2 rounded-md hover:shadow-3xl"}>
                Login
            </button>


        </div>

    </div>
}
export default LoginPage