const FolderView = ({data, children}) => {
    const style={
        display: "flex",
        flexDirection:"column",
        justifyContent: "flex-start",
        borderRadius: "0 8px 8px 8px",
        backgroundColor: "#F7F9FA",
        boxShadow: "1px 8px 17px -2px #000000",
        height: "fit-content",
        padding: "12px",
    }
    
    

//{borderRadius: "8px 8px 0 0", height: "30px", width: "70px", backgroundColor: "#F7F9FA", padding:"8xp"}}>{button}</div> :  <div style={{borderRadius: "8px 8px 0 0", height: "30px", width: "70px", padding:"8xp", backgroundColor: "#DBDEDF"}

    return(
        <div >
            <div style={{display: "flex"}}>
            <button onClick={data.button1Function}>{data.buttonTabLeft}</button>
            <button onClick={data.button2Function}>{data.buttonTabRight}</button>
            </div>
            <div style={style}>
                {children}
            </div>
        </div>
    )

}

export default FolderView