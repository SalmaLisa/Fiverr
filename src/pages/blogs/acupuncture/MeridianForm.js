import React, { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Typography from "@material-ui/core/Typography"
import { activeFilter } from "../../../actionCreator"
import { selectData } from "../../../actionCreator"

const MeridianForm = (props) =>{

    const meridian = useRef()
    const dispatch = useDispatch()
    const Gstate = useSelector(selectData)

    const handleSubmit = (event) =>{
        event.preventDefault();
        dispatch(activeFilter(meridian.current.value))
    }

    const MeridianList = Gstate.list.filter(( elem, index )=>
            Gstate.list.findIndex( obj => obj.meridian === elem.meridian ) === index
        )
        .map((item)=>
        <option 
            key={item.meridian}
            id={item.meridian} 
            value={item.meridian}>{item.meridian}
        </option>
    )                   //item.meridian beacuse storing array. earlier storing object.

    return(
        <form onSubmit={(e)=> handleSubmit(e)}>
            <Typography variant="h5">Meridians : </Typography><br />
            
            <select name="cars" id="cars" ref={meridian}>
                
                <option id="---Meridians---">----Meridian------</option>    
                
                {MeridianList}
            </select>

            <br /><br />

            <div 
                style={{textAlign:"right"}}>
                <button 
                    className="theme-btn border-0" 
                    type="submit" 
                    value="submit"
                    >
                    <i className="la la-paper-plane"></i> 
                        Submit
                </button>
            </div>

        </form>
    )
}

export default MeridianForm;