const EntryDatePicker = ({dateText, state, setState}) => {
    return(
        <div className={"date_wrapper"} style={{padding: "8px", width: "90%", display: "flex", flexDirection: "column", color: "black"}}>
            <label style={{marginBottom: "8px"}} for="date">{dateText}</label>
            <input style={{height: "30px", borderBottom:"#817df7", color:"#8999a7", fontSize:"15px", outline:"none", borderStyle:"solid", borderRadius:"5px 5px 0 0", borderBottomWidth:"2px", backgroundColor:"inherit"}} placeholder={"MM/YYYY"} type="month" id="date" name="date" value={state} onChange={setState}/>
        </div>
    )
}

export default EntryDatePicker