const DropdownButton = ({option, index}) => {
    const handleClick = (event) => {
        option.setState(event)
    }

    return(
        <button type="button" className={"dropdown_button"} onClick={(e) => handleClick(e)} value={index}>{option.name}</button>
    )

}


export default DropdownButton