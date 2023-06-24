const DropdownButton = ({option, toggleOptions, index}) => {

    const handleClick = (event) => {
  //      console.log("calling click handle for dropdown button")
   //     console.log("Click event ", event.target.value)
        option.setState(event)

    }

    return(
        <button style={{height:"30px", textAlign:"start"}} type="button" onClick={(e) => handleClick(e)} value={index}>{option.name}</button>
    )

}


export default DropdownButton