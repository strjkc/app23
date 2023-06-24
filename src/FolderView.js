import { useEffect, useRef, useState } from "react";

const FolderView = ({mainItem, buttons, activeButton}) => {

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
    
 //   console.log("active button: ", activeButton)

    const folderTabs = buttons.map((button, index) => {
 //       console.log("buttons", buttons)
 //       console.log("index", index)
 //       console.log("activeButton",activeButton)
 //       console.log("equal", index === activeButton)
        return index === activeButton ? <div style={{borderRadius: "8px 8px 0 0", height: "30px", width: "70px", backgroundColor: "#F7F9FA", padding:"8xp"}}>{button}</div> :  <div style={{borderRadius: "8px 8px 0 0", height: "30px", width: "70px", padding:"8xp", backgroundColor: "#DBDEDF"}}>{button}</div>})

    return(
        <div >
            <div style={{display: "flex"}}>
                {folderTabs}
            </div>
            <div style={style}>
                {mainItem}
            </div>
        </div>
    )

}

export default FolderView