const CheckBox = ({inputName, state, setState}) => {
    return(
        <div style={{display: "flex", padding: "8px", width: "90%", position:"relative", zIndex:'0', color: "black"}}>
            <p style={{marginRight: "8px"}} className={`input_name ${inputName}_name`}>{inputName}</p>
            <input style={{accentColor: "#817df7"}}  className={`input`} type="checkbox" checked={state} value={state} onChange={setState}></input>
        </div>
    )
}

export default CheckBox