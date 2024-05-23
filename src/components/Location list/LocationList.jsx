import useFetch from "../../hooks/useFetch.jsx";
import {it} from "date-fns/locale";

export default function LocationList(){
    const {data , isLoading} = useFetch("http://localhost:5000/hotels", "")
    if (isLoading) {
        <p> loading...... </p>
    }
    return(
        <div className='nearbyLocation'>
            <h2> nearby location</h2>
                <div className='locationList'>
                    {
                        data.map((item) => {
                            return <div className='locationItem' key={item.id}>
                                <img src={item.c} alt={item.name} />
                                <div className='locationItemDesc'>
                                    <p className='location'> {item.smart_location} </p>
                                    <p className='name'>{item.name}</p>
                                    <p className='price'> {item.price} $  &nbsp </p>
                                </div>
                            </div>
                        })
                    }
                </div>
        </div>
    )
}
