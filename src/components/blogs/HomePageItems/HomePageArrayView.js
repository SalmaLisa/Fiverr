import React from 'react';
import { motion } from "framer-motion"

const CommonHomePageArray = (props) => {
    return (
        <>
        <motion.div 
            whileTap={{ rotate: 360, scale: 0.5 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            whileHover={{ scale: 1.1, background: "white", zIndex: 10000 }}
            keys={props.keys} 
             className="array">

            {props.name}<br/><br />
            {props.english}
            
        </motion.div>
        </>
    );
}


export default React.memo(CommonHomePageArray);
