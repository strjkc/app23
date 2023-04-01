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
        <div style={{ position: "relative", display: "flex", padding: "8px", flexDirection: "column", width: "90%", color: "black"}}>
            <div style={{marginBottom: "8px"}}>{dropdownTitle}</div>
            <div onClick={toggleOptions} id={wrapperId}  style={{display:"flex", flexDirection:"column"}}>
                <button style={{display: "flex", justifyContent: "space-between", color:"#8999a7", fontSize:"15px", lineHeight:"30px", height: "30px", borderBottom:"#817df7", outline:"none", borderTop:"none", borderRight: "none", borderLeft:"none", borderBottomStyle:"solid", borderBottomWidth:"2px", backgroundColor:"inherit"}} type="button" className={"dropdown_main"}><div>Chose an option: {options[optionToSelect].name}</div> <div>icon</div></button>
                {showOptions ? 
                <div style={{display: "flex", flexDirection:"column"}}>{optionsToDisplay}</div> 
                : <></>}
            </div>
        </div>
    )
}

export default Dropdown