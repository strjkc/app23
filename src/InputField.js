import "./InputField.css"

const InputField = ({inputName, state, setState, placeholderText}) => {
    return(
        <div style={{display: "flex", flexDirection: "column", width: "90%",  padding: "8px"}} className={`input_wrapper ${inputName}_wrapper`}>
            <p style={{marginBottom: "8px", color: "black"}} className={`input_name ${inputName}_name`}>{inputName}</p>
            <input placeholder={placeholderText} style={{height: "30px", borderBottom:"#817df7", outline:"none", borderStyle:"solid", borderRadius:"5px 5px 0 0", borderBottomWidth:"2px", backgroundColor:"inherit"}} id={"text_input"} className={`input`} type="text"  value={state} onChange={setState}></input> 
        </div>
    )
}

export default InputField