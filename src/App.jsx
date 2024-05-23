import "./App.css";
import Header from "./components/Header/Header.jsx";
import LocationList from "./components/Location list/LocationList.jsx";
import {Route, Routes} from "react-router-dom";
import SearchedHotelLayout from "./components/Searched Hotel Layout/SearchedHotelLayout.jsx";
import SearchedHotels from "./components/Hotels/SearchedHotels.jsx";
import HotelsProvider from "./context/HotelsProvider.jsx";
import Map from "./components/Map/Map.jsx";
import SingleHotel from "./components/Single Hotel/SingleHotel.jsx";
import BookmarkLayout from "./components/bookmark layout/BookmarkLayout.jsx";

 function App() {
    return (
        <HotelsProvider>
                <Header/>
                <Routes>
                    <Route path='/' element={<LocationList/>} />
                    <Route path='/hotels' element={<SearchedHotelLayout/>} >
                        <Route index element={<SearchedHotels/>} />
                        <Route path=":id" element={<SingleHotel/>}  />
                    </Route>

                    <Route path='/bookmark' element={<BookmarkLayout/>} >
                        <Route index element={ <div>book mark list</div> } />
                        <Route path='add' element={ <div>add new book mark</div> } />
                    </Route>


                </Routes>
        </HotelsProvider>
    );
}


export default App;

