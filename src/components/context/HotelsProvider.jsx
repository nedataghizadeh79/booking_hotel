import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch.jsx";

const HotelContext = createContext(null);

export default function HotelsProvider({ children }) {
    const [searchParams] = useSearchParams();
    const destination = searchParams.get("destination");
    const room = JSON.parse(searchParams.get("options"))?.room || 1;
    const query = `accommodates_gte=${room}&host_location_like=${destination || ""}`;

    const { data: hotels, isLoading } = useFetch("http://localhost:5000/hotels", query);

    return (
        <HotelContext.Provider value={{ isLoading, hotels }}>
            {children}
        </HotelContext.Provider>
    );
}

export function useHotels() {
    return useContext(HotelContext);
}
