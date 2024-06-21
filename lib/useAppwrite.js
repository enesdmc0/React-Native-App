import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);

        try{
            const res = await fn();
            setData(res);
        }catch(err) {
            Alert.alert('Error', err.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const refetch = () => fetchData();

    return { data, loading, refetch };

}

export default useAppwrite;