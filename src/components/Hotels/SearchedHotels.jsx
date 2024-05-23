import {Link} from "react-router-dom";
import Loader from "../Loader/Loader.jsx";
import { useHotels } from "../../context/HotelsProvider.jsx";

export default function SearchedHotels() {
    const { isLoading, hotels } = useHotels();

    if (isLoading) return <Loader />;
    return (
        <div className='searchList'>
            <h3>search result: {hotels.length}</h3>
            {
                hotels.map((item) => (
                    <Link key={item.id} to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
                        <div className='searchItem'>
                            <img src={item.picture_url.url} alt={item.name} />
                            <div className='searchItemDesc'>
                                <p className='location'> {item.smart_location} </p>
                                <p className='location'> {item.name} </p>
                                <p className='location'> {item.price} $ </p>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    );
}
