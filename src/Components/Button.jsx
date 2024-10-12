import { useState } from "react"

const Button = ({buttonText, buttonType, buttonOnClik}) => {        
      
    return(
        <button className="bg-green" type={buttonType} onClick={buttonOnClik}>
            {buttonText}
        </button> 
    )
}

export default Button