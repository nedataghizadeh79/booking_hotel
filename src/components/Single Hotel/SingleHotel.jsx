import {useParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch.jsx";
import Loader from "../Loader/Loader.jsx";

export default function SingleHotel(){
    const {id} = useParams()
    const {isLoading, data} = useFetch(`http://localhost:5000/hotels/${id}`)
    if(isLoading)<Loader/>

    return(
        <div className='room'>
            <div className='roomDetail'>
                <h2>{data.name}</h2>
                <div>
                    {data.number_of_reviews} reviews
                    <br/>
                    {data.smart_location}
                </div>
            </div>
        </div>
    )
}
