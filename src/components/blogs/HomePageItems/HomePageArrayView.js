import React from 'react';
import { motion } from "framer-motion"

const CommonHomePageArray = (props) => {
    return (
        <>
        <motion.div 
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            keys={props.keys} 
             className="array">

            {props.name}<br/><br />
            {props.english}
            
        </motion.div>
        </>
    );
}


export default React.memo(CommonHomePageArray);
