import React from "react"
import { useSelector } from "react-redux"
import Typography from "@material-ui/core/Typography"

const Tabs = (props) =>{
    const Gstate = useSelector(s=> s.entities.acudata)
    return(
            <div className="container">
                 <div className="row">
                     <div className={ props.isToggle ? "col-lg-6 mycustomtopicinactive" :
                              "col-lg-6 mycustomtopicactive"}>

                         <div 
                             className="mytopicmobile mytopic1"
                             style={ props.isToggle ? { background: "rgba(255,255,255,0)" } : { padding: "0.5em" }} 
                             onClick={()=> props.handleClick(false)}>

                             <Typography 
                                 variant="h6" 
                                 style={ props.isToggle ? {}:  {color: "red"}}>

                                 { Gstate.acudata.tabsheading }
                             </Typography>

                         </div>

                     </div>
                    
                     <div className={ props.isToggle ? "col-lg-6 mycustomtopicactive" :
                             "col-lg-6 mycustomtopicinactive"} >
                         <div 
                             className="mytopicmobile mytopic1"
                             style={ props.isToggle ? {padding:"0.5em"}: {background:"rgba(255,255,255,0)"}} 
                             onClick={()=> props.handleClick(true)}>
                            
                             <Typography 
                                 variant="h6" 
                                 style={ props.isToggle ? {color: "red"}: {}}>
                                     Topic and Comments
                             </Typography>

                         </div>
                     </div>

                 </div>
             </div>
    )
}

export default Tabs