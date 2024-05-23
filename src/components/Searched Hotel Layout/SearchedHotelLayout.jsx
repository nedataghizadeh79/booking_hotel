import {Outlet} from "react-router-dom";
import Map from "../Map/Map.jsx";
import {useHotels} from "../../context/HotelsProvider.jsx";

export default function SearchedHotelLayout(){
    const { isLoading, hotels } = useHotels();
    return(
        <div className='appLayout' >
            <div className='sidebar'>  <Outlet/> </div>
            <div className='mapContainer'> <Map markerLocation={hotels} /> </div>
        </div>
    )
}
