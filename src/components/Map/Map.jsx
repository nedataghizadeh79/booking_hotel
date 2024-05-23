import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent} from "react-leaflet";
import {useEffect, useState} from "react";
import {it} from "date-fns/locale";
import {useNavigate, useSearchParams} from "react-router-dom";
import UseGeoLocation from "../../hooks/use geo location/UseGeoLocation.jsx";

export default function Map({markerLocation}) {
    const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
    const [searchParams, setSearchParams] = useSearchParams()
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")

    function ChangePosition({position}){
        // our goal is when the user clicks on each searched hotel, the map will show the position of that hotel
        const map = useMap()
        map.setView(position)
        return null
    }

    useEffect(()=>{
        if (lng && lat ) {
            setMapCenter([lat, lng])
        }
    }, [lat, lng])


    const {isLoading: isLoadingPosition , position:geoLocationPosition, error, getPosition} =  UseGeoLocation()

    useEffect(()=>{
        if(geoLocationPosition?.lng && geoLocationPosition?.lat ){
            setMapCenter([geoLocationPosition.lat , geoLocationPosition.lng])

        }
    },[geoLocationPosition])


    function DetectClick(){
        const navigate = useNavigate()
        useMapEvent({
            click: e => navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        })
        return null
    }

    return (
        <div className='mapContainer'>
            <MapContainer className='map' center={mapCenter} zoom={13} scrollWheelZoom={true}>
                <button onClick={getPosition} className='getLocation'>
                    {
                        isLoadingPosition? "Loading": "use your location"
                    }

                </button>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <DetectClick/>
                <ChangePosition position={mapCenter}/>
                {
                    markerLocation.map((item)=>{
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


