import {Outlet} from "react-router-dom";
import Map from "../Map/Map.jsx";

export default function CommonSearchedHotelLayout(){
    return(
        <div className='appLayout' >
            <div className='sidebar'>  <Outlet/> </div>
            <div className='mapContainer'> <Map/> </div>
        </div>
    )
}
