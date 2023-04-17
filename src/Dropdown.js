import { useState, useRef } from "react"
import './Dropdown.css'
import DropdownButton from "./DropdownButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"

const Dropdown = ({options, dropdownTitle, state}) => {
    const optionToSelect = state || 0
    const [documentListenerAttached, setDocumentListenerAttached] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const ref = useRef()
    const wrapperId = "dropdown_wrapper"
// dodati sklanjanje event listenera kad god je showOptions false
    function handleClickOutside(event) {   
        console.log("event target: ", ref.current)

         if(ref.current && !ref.current.contains(event.target)){
        //ako si kliknuo na nesto sto nije wrapper onda zatvori padajuci meni
        console.log("Removing doc listener")
        document.removeEventListener("mousedown", handleClickOutside)
        console.log("handleClick showOptions: ", showOptions)
        setShowOptions(false)
        setDocumentListenerAttached(false)

       

        }
      }

    const toggleOptions = () => {
        console.log("calling toggle", documentListenerAttached)
        //ako listener nije attachovan onda ga attachuj i postavi handleclick funkciju. U svakom slucaju toggleuj opcije
        if(!documentListenerAttached){  
            console.log("Setting doc listener")      
            document.addEventListener("mousedown", handleClickOutside)
            setDocumentListenerAttached(true)
            setShowOptions(true) 
        }else{
            document.removeEventListener("mousedown", handleClickOutside)
            setDocumentListenerAttached(false)
            setShowOptions(false)  
        }
    }

    const optionsToDisplay = options.map((option, index) => <DropdownButton index={index} toggle={toggleOptions} option={option}/>)
    
    return(
        <div style={{position: "relative", display: "flex", padding: "8px", flexDirection: "column", width: "90%", color: "black"}}>
            <div style={{marginBottom: "8px"}}>{dropdownTitle}</div>
            
            <div ref={ref} onClick={toggleOptions} className={wrapperId}  style={{display:"flex", flexDirection:"column"}}>
                <button style={{display: "flex", justifyContent: "space-between", color:"black", fontSize:"15px", lineHeight:"30px", height: "30px", borderBottom:"#817df7", outline:"none", borderTop:"none", borderRight: "none", borderLeft:"none", borderBottomStyle:"solid", borderBottomWidth:"2px", backgroundColor:"inherit"}}
                        type="button" className={wrapperId}>
                            <div className={wrapperId}>{options[optionToSelect].name}</div>
                            <FontAwesomeIcon className="dropdown_wrapper" icon={faCaretDown} style={{color: "#743eb6",}} />
                </button>
                {showOptions ? 
                <div style={{position: "absolute", display: "flex", flexDirection:"column", zIndex: "50", margin: "30px 0", width: "95%"}}>{optionsToDisplay}</div>
                : <></>}
            </div>
        </div>
    )
}

export default Dropdown