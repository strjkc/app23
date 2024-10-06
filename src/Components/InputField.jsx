import "../CSS/InputField.css"

const InputField = ({data}) => {
    const {fieldLabel, state, setState, placeholderText, componentId} = data
    return(
        <div className={"input-wrapper"}  id={`${componentId}-wrapper`}>
            <label id={`${componentId}-label`}>{fieldLabel}</label>
            <input placeholder={placeholderText} id={`${componentId}-input`} className={`input`} type="text"  value={state} onChange={e => setState(e.target.value)}></input> 
        </div>
    )
}

export default InputField