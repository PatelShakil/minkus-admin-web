import { useEffect, useState } from "react";
import Cons from "../../utils/Cons.js";

const useFetchAllProtocolState = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [d, setD] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
          const response = await fetch(`${Cons.BASE_URL}/get_protocols.php`, {
            method: "GET",
          });

          if (!response.ok) {
            throw new Error("Failed to fetch protocol");
          }

          const result = await response.json();
          console.log(result);
          if (result.status) {
            setD(result.data);
          } else {
            setError("Failed to fetch protocol");
          }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { isLoading, d, error };
};

export default useFetchAllProtocolState;
