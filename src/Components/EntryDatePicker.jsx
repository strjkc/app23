import "../CSS/EntryDataPicker.css"

const EntryDatePicker = ({data}) => {

    const labelClass = `date-label ${data.isDisabled ? "inactive" : "active"}`;
    const inputClass = `date ${data.isDisabled ? "date-inactive" : "date-active"}`;

    return(
        <div className={"date-wrapper"}>
            <label className={labelClass} htmlFor="date">{data.name}</label>
            <input disabled={data.isDisabled} className={inputClass} placeholder={"MM/YYYY"} type="month" id="date" name="date" value={data.state} onChange={e => data.setState(e.target.value)}/>
        </div>
    )
}

export default EntryDatePicker