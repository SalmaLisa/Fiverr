import React, { useEffect, useState } from 'react';
import CommonHomePageArray from "./HomePageItems/HomePageArrayView"
import { Link } from "react-router-dom"
import { useSelector , useDispatch } from "react-redux"
import LoadingErrorView from "../../layouts/LoadingErrorView"

function CommonHomePageItems(props){

    const Gstate = useSelector(s=> s.entities.acudata)
    const Filter = Gstate.filter
    const state = Gstate.list

    const [ Visible, setVisible ] = useState(false)
    
    useEffect(()=>{
        setTimeout(() => {
            setVisible(true)
        }, 300);
    },[])

    const Array = state != null ?  state.map((item)=> 

            <Link to={`${Gstate.datalink}/${item.name}`}>
                <CommonHomePageArray 
                    key={item._id}
                    name={item.name} 
                    english={item.english}
            /> </Link>)
                             
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

            <Link to={`${Gstate.datalink}/${item.name}`}> 

                <CommonHomePageArray 
                    key={item._id}
                    name={item.name} 
                    english={item.english} 
                />

            </Link> ) 

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
        
        <div className="array-parent" >
            { Visible ? FilterActive : null}
        </div>
        </>
    )
}

export default React.memo(CommonHomePageItems);
