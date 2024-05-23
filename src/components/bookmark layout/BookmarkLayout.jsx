import {Outlet} from "react-router-dom";
import Map from "../Map/Map.jsx";

export default function BookmarkLayout(){

    return(
        <div className='appLayout'>
            <div className='sidebar'>
                <Outlet/>
            </div>
             <Map markerLocation={[]}/>
        </div>
    )
}

