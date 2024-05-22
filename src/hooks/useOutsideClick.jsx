import {useEffect} from "react";


export default function useOutsideClick (optionRef, handleCloseWindow, exceptionId){
    useEffect(()=> {
        const handleOutSideClick = (event)=> {
            if(optionRef.current && !optionRef.current.contains(event.target) && event.target.id !== exceptionId ){
                console.log("out")
                handleCloseWindow()
            }
        }


        document.addEventListener("mousedown", handleOutSideClick)


        return ()=>{
            document.addEventListener("mousedown", handleOutSideClick)
        }


    },[optionRef, handleCloseWindow])


}
