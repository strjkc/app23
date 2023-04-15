const EntryDatePicker = ({isEnabled, dateText, state, setState}) => {
    const style={
        color: isEnabled ? "black" : "gray"
    }
    return(
        <div className={"date_wrapper"} style={{padding: "8px", width: "90%", display: "flex", flexDirection: "column", color: "black"}}>
            <label style={{marginBottom: "8px", color: isEnabled ? "black" : "gray" }} for="date">{dateText}</label>
            <input disabled={!isEnabled} style={{height: "30px", borderBottomColor: isEnabled ? "#817df7" : "gray", color: isEnabled ? "black" : "gray", fontSize:"15px", outline:"none", borderStyle:"solid", borderRadius:"5px 5px 0 0", borderBottomWidth:"2px", backgroundColor:"inherit"}} placeholder={"MM/YYYY"} type="month" id="date" name="date" value={state} onChange={setState}/>
        </div>
    )
}

export default EntryDatePicker