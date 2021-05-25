import React from "react"
import CheckIcon from "@material-ui/icons/Check"
import { motion } from "framer-motion"

const ItemList = (props) =>{
    return(
        <motion.li
            whileHover={{ color: "red"}} 
            className="myliststyle">
            <CheckIcon 
                className="mycustomliststyle" 
                />
                
                {props.listName} : 
                { props.value === "NULL" ? 
            null : 
            props.value 
        }
        </motion.li>
    )
}
export default ItemList