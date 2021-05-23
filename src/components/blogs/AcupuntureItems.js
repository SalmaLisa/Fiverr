import React from 'react';
import BlogFullWidthArray from "./BlogFullWidthArray"
import { Link } from "react-router-dom"
import { useSelector , useDispatch } from "react-redux"

function BlogFullWidthItems(props){

    const Gstate = useSelector(s=> s.entities.acudata)
    const Filter = Gstate.filter
    const state = Gstate.list

    const Array = state != null ?  state.map((item)=> 

            <Link to={`${Gstate.datalink}/${item.name}`}>
                <BlogFullWidthArray 
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

                <BlogFullWidthArray 
                    key={item._id}
                    name={item.name} 
                    english={item.english} 
                />

            </Link> ) 

            : "Loading...." ;
    
    const FilterActive = Filter === 'all' ? Array : FilteredArray
    
    return(
        <>

        <div style={ Gstate.status === 'loading' ? {

                    display:"block", 
                    textAlign:"center"

                } : {display:"none"}}>

                <div className="loading"></div>
            <h1>Loading .....</h1>
            <div className="headerborder"></div>
        </div>
        
        <div style={ Gstate.status === 'error' ? {
                    
                    display:"block", 
                    textAlign:"center"

                }: {display:"none"}}>

            Sorry An error Occured While Loading Data....Please Refresh
        </div>
        
        <div className="array-parent" >
            {FilterActive}
        </div>
        </>
    )
}

export default React.memo(BlogFullWidthItems);
