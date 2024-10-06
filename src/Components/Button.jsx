import { useState } from "react"

const Button = ({buttonText, buttonType, buttonOnClik}) => {
    const [buttonColor, setButtonColor] = useState("#817df7")

    const buttonStyle = {width: "25%", height: "30px", backgroundColor: buttonColor , outline: "none", border: "none", borderRadius: "5px", color: "#F7F9FA"}
    const changeButtonColor = () => {
        setButtonColor("#5c57f4")
        
        
      }
    return(
        <button style={buttonStyle}
        type={buttonType}
        onClick={buttonOnClik}
        onMouseDown={changeButtonColor}
        onMouseUp={() => setButtonColor("#817df7")}>{buttonText}</button> 
    )
}

export default Button