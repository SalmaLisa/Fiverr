// import React from 'react';
import { motion } from "framer-motion"

// const CommonHomePageArray = (props) => {
//     return (
//         <>
//         <motion.div 
//             whileTap={{ rotate: 360, scale: 0.7, color: "black" }}
//             initial={{ rotate:0 , scale: 0, background: "rgba(255,255,255,0.8)", color: "black" }}
//             animate={{ scale: 1, rotate: 360, background: "rgba(255,255,255,0.8)", color: "black"}}
//             transition={{
//               type: "spring",
//               stiffness: 260,
//               damping: 20
//             }}
//             whileHover={{ scale: 1.1, background: "white", zIndex: 10000 }}
//             keys={props.keys} 
//              className="array">

//             {props.name}<br/><br />
//             {props.english.slice(0,20)}

//         </motion.div>
//         </>
//     );
// }

import React from "react"
import { UncontrolledCarousel, Card, CardBody, CardTitle } from 'reactstrap';
import MateriaMedicaImageList from "../../../store/MateriaMedicaImageList"
import Typography from "@material-ui/core/Typography"

function CommonHomePageArray(props) {
    return (
        <>
            <Card
                className="mt-5 whilehover shadow"
                style={{
                    minWidth: "200px",
                    width: "20em",
                    maxWidth: "350px",
                    borderRadius: "10px",
                    overflow: "hidden"
                }}>
                <UncontrolledCarousel
                    style={{ width: "100%" }}
                    indicators="false"
                    controls={false}
                    items={MateriaMedicaImageList} />
                <CardTitle 
                style={{ background: "lightgrey", color: "black"}} 
                    className="m-0 p-2 pl-3">
                    
                    <Typography variant="h6">
                        {props.name}
                    </Typography>

                </CardTitle>
                {/* <CardBody></CardBody> */}

            </Card>
        </>
    )
}


export default React.memo(CommonHomePageArray);
