import {useEffect, useState} from "react";
import axios from "axios";

export default function useFetch(url , query=""){
const [data, setData] = useState([])
const [isLoading , setIsLoading] = useState(false)

    useEffect(()=>{

        async function fetchData(){
            try {
                setIsLoading(true);
                const response = await axios.get(`${url}?${query}`);
                setData(response.data)
            }catch(err){
                setData([])
                console.log(err?.message)
            }finally {
                setIsLoading(false)
            }
        }
        fetchData()
    },[query, url])
    return {data, isLoading}

}
