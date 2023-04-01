const WrapperPannel = ({item, flexDirection, justifyOption, alignOption}) => {
    const style = {
        backgroundColor: "#F7F9FA",
        borderRadius: "8px",
        boxShadow: "1px 8px 17px -2px #000000",
        display: "flex",
        flexDirection: flexDirection || "row",
       
        height: "fit-content",
        padding: "12px",
        justifyContent: justifyOption || "none",
        alignContent: alignOption || "none"
    }
    return(
        <dvi style={style}>
            {item}
        </dvi>
    )
}

export default WrapperPannel