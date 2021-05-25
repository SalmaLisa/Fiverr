import React, { useEffect, useState } from 'react';
import CommonHomePageArray from "./HomePageItems/HomePageArrayView";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingErrorView from "../../layouts/LoadingErrorView";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { Progress } from "../../actionCreator"

function CommonHomePageItems(props){

    const Gstate = useSelector(s=> s.entities.acudata)
    const Filter = Gstate.filter
    const state = Gstate.list
    const [ Visible, setVisible ] = useState(false)
    const dispatch = useDispatch() 

    useEffect(()=>{
        setTimeout(() => {
            setVisible(true)
            // dispatch(Progress(30))
        }, 2000);
    },[])

    const [ seemore , setseemore ] = useState(100)

    const ArrayView = (event) =>{
        return(
            <Link to={`${Gstate.datalink}/${event.name}`}> 

                <CommonHomePageArray 
                    key={event._id}
                    name={event.name} 
                    english={event.english} 
                />

            </Link>
        )
    }
    const Array = state != null ?  state.slice(0, seemore).map((item)=> 
            ArrayView(item))
            : "Loading...." ;


    const FilteredArray = state != null && Filter != 'all' ?  state.filter((it)=>{

        if(Filter.length > 4){
            if( Gstate.datalink == '/acupunctures'){
                return it.meridian === Filter
            }
        }
        else if(Gstate.datalink == '/acupunctures'){
            return it.letter_1.includes(Filter.toUpperCase()) || 
                it.letter_2.includes(Filter.toUpperCase()) 
        
        }
        else if(Gstate.datalink == '/formulas'){
            console.log("formula active page")
            return it.name.slice(0,2).includes(Filter.toUpperCase())
        }
    }).map((item)=>
        ArrayView(item) ) 
        : "Loading...." ;
    
    const FilterActive = Filter === 'all' ? Array : FilteredArray
    
    return(
        <>
        
        <h2 style={{textAlign:"center"}}>
            <br />
            { FilteredArray.length == 0 ? 
                "No data Found Select Other One" : null}
        </h2>

        <LoadingErrorView />
        <div 
            className="array-parent" 
            >
            { Visible ? FilterActive : null}
        </div>
        
        <div style={{ textAlign: "center"}}>
            <Button 
                style={{
                    marginTop: "3em",
                    background: "rgba(240,240,240,0.6)", 
                    fontSize: "16px"
                }}
                onClick={()=> setseemore(seemore + 100)}>
                    
                    { Filter === "all" ? 
                        seemore >= state.length ? 
                        FilteredArray.length == 0 ?
                        "" : "No More Items" 
                        : `Click To See More (${state.length - seemore}) Items ` : null } 
                    
                    <ExpandMoreIcon style={ Filter === "all" ? 
                        {marginLeft: "1em"} : { display: "none"}} />
            </Button>
        </div>
        
        </>
    )
}

export default React.memo(CommonHomePageItems);
