const EntryDatePicker = ({dateText, state, setState}) => {
    return(
        <div className={"date_wrapper"}>
            <label for="date">{dateText}:</label>
            <input type="month" id="date" name="date" value={state} onChange={setState}/>
        </div>
    )
}

export default EntryDatePicker