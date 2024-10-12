import "../CSS/WrapperPannel.css"

const WrapperPannel = (props) => {

    return(
        <div className="wrapper">
            {props.children}
        </div>
    )
}

export default WrapperPannel