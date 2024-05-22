import "./App.css";
import Header from "./components/Header/Header.jsx";
import LocationList from "./components/Location list/LocationList.jsx";
import {Route, Routes} from "react-router-dom";
import CommonSearchedHotelLayout from "./components/Common Searched Hotel Layout/CommonSearchedHotelLayout.jsx";
import SearchedHotels from "./components/Hotels/SearchedHotels.jsx";
import HotelsProvider from "./components/context/HotelsProvider.jsx";
import Map from "./components/Map/Map.jsx";

 function App() {
    return (
        <HotelsProvider>
                <Header/>
                <Routes>
                    <Route path='/' element={<LocationList/>} />
                    <Route path='/hotels' element={<CommonSearchedHotelLayout/>} >
                        <Route index element={<SearchedHotels/>} />
                        <Route path=":id" element={<div>each selected hotel (when you click on selected hotel)</div> } />
                    </Route>
                </Routes>
        </HotelsProvider>
    );
}


export default App;
