import {useEffect, useState} from "react";
import Cons from "../../utils/Cons.js";

const useFetchFormsState = (id) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                if(id != null) {
                    const response = await fetch(`${Cons.BASE_URL}/get-forms.php?id=${id}`, {
                        method: "GET"
                    });

                    if (!response.ok) {
                        throw new Error("Failed to fetch protocol");
                    }

                    const result = await response.json();
                    console.log(result);
                    if (result.status) {
                        setData(result.data);
                    } else {
                        setError("Failed to fetch protocol");
                    }
                }
            } catch (error) {

                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    },[id]);

    return {isLoading, data,error };
};

export default useFetchFormsState