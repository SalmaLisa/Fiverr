import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Typography from "@material-ui/core/Typography"

const BreadCrumb =(props)=>{
    const Gstate = useSelector(s=> s.entities.acudata)
    return(
        <div 
            className="breadcrumb" 
            style={{ 
                display:"flex", 
                alignItems:"center",
                background: "rgba(245,245,245,0.7)"
                }}>
            <Link to="/">
                <Typography 
                    variant="h6" 
                    style={{
                        fontSize:"14px", 
                        margin:"auto 1em"
                    }}>
                        Home
                </Typography>
            </Link>/

            <Link to={`${Gstate.datalink}`}>
                <Typography 
                    variant="h6" 
                    style={{
                        fontSize:"14px", 
                        margin:"auto 1em"
                    }}>
                        Acupuncture
                </Typography>
            </Link>/

            <Typography 
                variant="h6" 
                style={{
                    fontSize:"14px", 
                    margin:"auto 1em"
                }}>{props.name}</Typography>
        </div>
    )
}

export default BreadCrumb;