const WrapperPannel = (props) => {
    const style = {
        backgroundColor: "#F7F9FA",
        borderRadius: "8px",
        boxShadow: "1px 8px 17px -2px #000000",
        display: "flex",
        flexDirection: "column",
       
        height: "fit-content",
        padding: "12px",
        justifyContent: "none",
        alignContent:  "none"
    }
    return(
        <div style={style}>
            {props.children}
        </div>
    )
}

export default WrapperPannel