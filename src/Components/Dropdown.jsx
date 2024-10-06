import '../CSS/Dropdown.css'
import DropdownButton from "./DropdownButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"

const Dropdown = ({data}) => {
    
    //using index as state values - this should be changed in backend and here, index as key is fine, list never changes
    const optionsToDisplay = data.options.map((name, index) => <DropdownButton key={index} name={name} index={index}/>)

    return(
        <div className="dropdown-wrapper">
            <h6 className="dropdown-title">{data.title}</h6>
            <select onChange={e => data.setState(e.target.value)} value={data.state} name="dropdown" id="dropdown-container">
                {optionsToDisplay}
            </select>
        </div>
    )
}

export default Dropdown