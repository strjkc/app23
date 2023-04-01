const DropdownButton = ({option, index}) => {
    const handleClick = (event) => {
        option.setState(event)
    }

    return(
        <button style={{height:"30px"}} type="button" onClick={(e) => handleClick(e)} value={index}>{option.name}</button>
    )

}


export default DropdownButton