import React from 'react';
import Typography from "@material-ui/core/Typography"
import { useDispatch } from 'react-redux';
import { activeFilter } from "../../actionCreator"
import { motion } from "framer-motion"

const List = (props) =>{

    const dispatch = useDispatch()

    const handleClick = (event) =>{
        dispatch(activeFilter(event))
    }

    const color = { 
        background: "linear-gradient(to bottom right,red, pink)", 
        color: "white", 
        boxShadow: "2px 2px 4px rgb(200,200,200)" 
    }

    const Style = props.activeFilter == props.filter ? color : null ;
    return(
        <motion.li
            whileTap={{ scale: 0.8}}
            drag
            dragConstraints={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
               
            whileHover={{ sacle: 1.2 }}
            className="mycustomliststyle" 
            style={ Style } 
            onClick={()=> handleClick(props.filter)}>
                
            <Typography>
                {props.filter.toUpperCase()}
            </Typography>
        </motion.li>
    )
}

export default React.memo(List);