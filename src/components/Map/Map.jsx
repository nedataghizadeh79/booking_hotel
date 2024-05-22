import { useHotels } from "../context/HotelsProvider.jsx";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState } from "react";
import {it} from "date-fns/locale";

export default function Map() {
    const { isLoading, hotels } = useHotels();
    const [mapCenter, setMapCenter] = useState([51.505, -0.09]);

    return (
        <div className='mapContainer'>
            <MapContainer className='map' center={mapCenter} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    hotels.map((item)=>{
                        return <Marker key={item.id} position={[item.latitude, item.longitude]}>
                            <Popup>
                                {item.host_location}
                            </Popup>
                        </Marker>
                    })
                }

            </MapContainer>
        </div>
    );
}
