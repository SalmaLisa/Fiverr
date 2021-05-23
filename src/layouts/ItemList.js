import React from "react"
import CheckIcon from "@material-ui/icons/Check"

const ItemList = (props) =>{
    return(
        <li className="myliststyle">
            <CheckIcon 
                className="mycustomliststyle" 
                />
                
                {props.listName} : 
                { props.value === "NULL" ? 
            null : 
            props.value 
        }
        </li>
    )
}
export default ItemList