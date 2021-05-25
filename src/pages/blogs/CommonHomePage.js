import React,{ useEffect, useState } from 'react';

import CommonHomePageItems from "../../components/blogs/CommonHomePageItems";
import Pagination from "../../components/blogs/Pagination";

import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import Footer from "../../components/common/footer/Footer";

import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import ListingDetailsComments from "../../components/contact/ListingDetailsComments"
import BlogCommentFields from "../../components/blogs/BlogCommentFields"

import HeaderContent from "../../layouts/HeaderContent"
import CustomizedTables from "../../layouts/Table"
import Tabs from "../../layouts/Tabs"

import bg from "../../assets/images/custom/bg.jpg"

import Comments from "../../layouts/Comments"

import { useDispatch, useSelector } from "react-redux"
import { 
    headingData,
    loadData,
    datalink,
    countryList
} from "../../actionCreator"

import { CountryListData } from "../../store/CountryListData"
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion"



function CommonHomePage(props) {
    
    const Gstate = useSelector(s=> s.entities.acudata)
    const dispatch = useDispatch()
    const [ isToggle , setisToggle ] = useState(false)
    const acuDatA = Gstate.acudata

    useEffect(()=>{  

        const pagetitle = Gstate.acudata.pagetitle ?
            Gstate.acudata.pagetitle :
            "Loading...."
 
        document.title = pagetitle ;
        dispatch(datalink(props.datalink))
        dispatch(loadData())     
        dispatch(headingData(props.headingdata))
        if(acuDatA.pageheaderheading == "Clinics"){
            dispatch(countryList(CountryListData))
        }
        
    },[])
    

    return (
         <main className="blog-fullwidth-page">
            
             <GeneralHeader />

             <Breadcrumb 
                 CurrentPgTitle={acuDatA.pageheaderheading} 
                 MenuPgTitle="" 
                 img={bg} 
             />

            { Gstate.acudataloading === "loaded" ? 
                    <motion.div
                        whileHover={{ 
                            color: "rgb(0,0,0)", 
                        }}
                        tarnsition={{ duration: 5 }}
                    >
                        <HeaderContent /> 
                    </motion.div>
                : null }
             
            
            { acuDatA.paginationvisible === true ? 
                <div>
                    <div className="container" style={{
                            margin:"1em 2em", 
                            wordWrap:"wrap", 
                            width:"80vw"
                        }}>

                        <Typography variant="h6">
                            {acuDatA.pagination != null ? 
                                acuDatA.pagination : ''}

                        </Typography>
                    </div>

                    <div className="mymobile">
                        <Pagination />
                    </div>

                </div>
            : null }

             <br />

             <div style={ acuDatA.paginationvisible == true ? 
                    { textAlign:"center" } : {display: "none"}}>
                 
                 <p>Active Filter: {
                     Gstate.filter != null ? Gstate.filter.toUpperCase() : 'ALL'
                 }</p>

             </div>
             <br />
             <br />
            
            { acuDatA.tabsvisible === true ? 
                    <Tabs isToggle={isToggle} handleClick={(event)=> setisToggle(event) } />
                    : null
            }

            { acuDatA.tablevisible === true ? 
                <div className="container">
                    <CustomizedTables />
                </div>
                :null
            }
 
            <section 
                className="blog-grid padding-top-40px padding-bottom-100px"
                style={ isToggle ? { display: "none"} : {} }>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">

                            {acuDatA.datavisible === true ?
                                <CommonHomePageItems /> 
                            : null }

                        </div>
                    </div>
                </div>
            </section>
                

             { isToggle ? 
                <motion.section
                    initial={{ x: 1000, scale: 0}}
                    exit={{ x: -1000, scale: 0 }}
                    animate={{ x: 0, scale: 0.9 }}
                    style={{ marginTop: "4em" }}>
                    <Comments />
                </motion.section> : null}
            
             {/* <NewsLetter /> */}

             <Footer />

             <ScrollTopBtn />

         </main>

    );
}

export default React.memo(CommonHomePage);
