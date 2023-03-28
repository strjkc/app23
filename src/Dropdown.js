import { useState } from "react"
import './Dropdown.css'
import DropdownButton from "./DropdownButton"

const Dropdown = ({options, dropdownTitle, state}) => {
    const optionToSelect = state || 0
    const [documentListenerAttached, setDocumentListenerAttached] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const wrapperId = "dropdown_wrapper"
// dodati sklanjanje event listenera kad god je showOptions false
    function handleClickOutside(event) {        
        if(wrapperId !== event.target.parentNode.id){
            console.log("Removing doc listener")
            document.removeEventListener("mousedown", handleClickOutside)
            setShowOptions(false)
            setDocumentListenerAttached(false)
        }
      }

    const toggleOptions = () => {
        if(!documentListenerAttached){  
            console.log("Setting doc listener")      
            document.addEventListener("mousedown", handleClickOutside)
            setDocumentListenerAttached(true) 
        }
        showOptions ? setShowOptions(false) : setShowOptions(true)
    }

    const optionsToDisplay = options.map((option, index) => <DropdownButton index={index} toggle={toggleOptions} option={option}/>)
    
    return(
        <div className={"dropdown_wrapper"}>
            <div>{dropdownTitle}</div>
            <div onClick={toggleOptions} id={wrapperId}  className={"drp_btn_wrapper"}>
                <button type="button" className={"dropdown_main"}>{options[optionToSelect].name} icon</button>
                {showOptions ? optionsToDisplay : <></>}
            </div>
        </div>
    )
}

export default Dropdown