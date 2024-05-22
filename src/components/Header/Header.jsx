import {MdLocationOn} from "react-icons/md";
import {HiCalendar, HiMinus, HiPlus, HiSearch} from "react-icons/hi";
import {useRef, useState} from "react";
import useOutsideClick from "../../hooks/useOutsideClick.jsx";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import {format} from "date-fns";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";

export default function Header(){
    const [searchParams, setSearchParams] = useSearchParams()
    const [destination, setDestination] = useState(searchParams.get("destination") || "")
    const [openOption, setOpenOption] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })

    const dateRef = useRef()
    useOutsideClick(dateRef, ()=>setOpenDate(false), "daTeTimeWindow")

    const [openDate , setOpenDate] = useState(false)

    const [date , setDate] = useState([ {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }])

    const navigate = useNavigate()

    const handleSearchButton = ()=>{
        // date and options are objects and for sending their information to url we should convert them
        const encodedParams = createSearchParams({ // this method change this information to a meaningful things
            date: JSON.stringify(date),
            destination,
            options : JSON.stringify(options) //they are object and they should become string
        })
       navigate({
           pathname: "hotels",
           search: encodedParams.toString()
       })
    }


    return(
        <div className='header'>
            <div className='headerSearch'>
            <div className='headerSearchItem'>
                <MdLocationOn className='headerIcon locationIcon'/>
                <input type='text' placeholder='where to go?'
                       className='headerSearchInput'
                       name='destination'
                       id='destination' value={destination}
                       onChange={(e)=>setDestination(e.target.value)} />
                <span className='seperator'></span>
            </div>

            <div className='headerSearchItem' ref={dateRef}>
                <HiCalendar className='headerIcon dateIcon' />
                <div onClick={()=>setOpenDate(!openDate)} className='dateDropDown'  id="daTeTimeWindow">
                    {` ${format(date[0].startDate, "MM/dd/yyyy")}  to ${format(date[0].endDate, "MM/dd/yyyy")} `}
                </div>
                {openDate && <DateRange
                    ranges={date} className='date'
                    onChange={(item)=> setDate([item.selection])}
                    minDate={new Date()}
                    moveRangeOnFirstSelection={true}
                /> }
                <span className='seperator'></span>
            </div>

            <div className='headerSearchItem'>
                <div id='optionDropDown' onClick={()=>setOpenOption(!openOption)} >
                    {options.adult} adult {options.children} children  {options.room} rooms
                </div>
                {
                    openOption && <GuestOptionList options={options} setOptions={setOptions} setOpenOption={setOpenOption}/>
                }

                <span className='seperator'></span>
            </div>

            <div className='headerSearchItem'>
            <button onClick={handleSearchButton} className='headerSearchBtn'>
                <HiSearch className='headerIcon'/>
            </button>
            </div>
            </div>
        </div>
    )
}



function GuestOptionList({options, setOptions, setOpenOption}){
    const optionRef = useRef()
    const handleCloseWindow =()=>{
        setOpenOption(false)
    }

    useOutsideClick(optionRef, handleCloseWindow, "optionDropDown")
    return(
        <div className='guestOptions' ref={optionRef}>
            <OptionItem type="adult" setOptions={setOptions} options={options} minLimit={1} />
            <OptionItem type="children" setOptions={setOptions} options={options} minLimit={0}/>
            <OptionItem type="room" setOptions={setOptions} options={options} minLimit={1}/>
        </div>
    )
}

function OptionItem({type , options, minLimit, setOptions}){
    function handlePlus(){
    setOptions(prevOption=>({
        ...prevOption,
        [type]: prevOption[type] + 1
    }))
    }

    function handleMinus(){
        setOptions(prevOption => {
            return{
                ...prevOption,
                [type]: prevOption[type] - 1
            }
        })
    }

    return(
        <div className='guestOptionItem'>
            <span className='optionText'>{type}</span>
            <div className='optionCounter'>
                <button className='optionCounterBtn' onClick={handleMinus} disabled={ options[type] <= minLimit}><HiMinus className='icon' /></button>
                <span className='optionCounterNumber'>{options[type]}</span>
                <button className='optionCounterBtn' onClick={handlePlus}><HiPlus className='icon'/></button>
            </div>
        </div>
    )
}

