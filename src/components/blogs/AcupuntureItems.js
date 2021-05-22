import React from 'react';
import BlogFullWidthArray from "./BlogFullWidthArray"
import { Link } from "react-router-dom"
import { useSelector , useDispatch } from "react-redux"
import { selectData } from "../../actionCreator"

function BlogFullWidthItems(props){

    const Gstate = useSelector(selectData)
    const Filter = Gstate.filter
    const state = Gstate.list

    const Array = state != null ?  state.map((item)=> 

            <Link to={`/acupuncture/${item.name}`}>
                <BlogFullWidthArray 
                    key={item._id}
                    name={item.name} 
                    english={item.english}
            /> </Link>)
                             
            : "Loading...." ;

    const FilteredArray = state != null && Filter != 'all' ?  state.filter((it)=>{

        if(Filter.length > 4){
            return it.meridian === Filter
        }
        else{
            return it.letter_1.includes(Filter.toUpperCase()) || 
                it.letter_2.includes(Filter.toUpperCase()) 

        }}).map((item)=>

            <Link to={`/acupuncture/${item.name}`}> 

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
