import "../CSS/CheckBox.css"

const CheckBox = ({data}) => {
    return(
        <div className="checbox-wrapper">
            <label className={"checkbox-label"}>{data?.name}</label>
            <input className={`checkbox`} type="checkbox" checked={data?.state} value={data?.state} onChange={(e) => data.setState(e.target.checked)}></input>
        </div>
    )
}

export default CheckBox