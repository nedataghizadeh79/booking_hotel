import {useState} from "react";

export default function UseGeoLocation (){

    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState({});
    const [error, setError] = useState (null);
    function getPosition(){
        if(!navigator.geolocation){
            return setError("Your geo location is not defined")
        }
        setIsLoading(true)
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                setPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
                setIsLoading(false)
            },
            (error)=>{
                setError(error.message)
                setIsLoading(false)
            }
            )
    }
    return {isLoading, error, position, getPosition}

}
