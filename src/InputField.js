import "./InputField.css"

const InputField = ({inputName, state, setState, isCheckbox}) => {
    return(
        <div className={`input_wrapper ${inputName}_wrapper`}>
            <p className={`input_name ${inputName}_name`}>{inputName}:</p>
            {isCheckbox ?
            <input className={`input`} type="checkbox" checked={state} value={state} onChange={setState}></input>
            :
            <input className={`input`} type="text"  value={state} onChange={setState}></input>
            }   
        </div>
    )
}

export default InputField