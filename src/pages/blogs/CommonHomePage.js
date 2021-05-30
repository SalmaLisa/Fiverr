import React,{ useEffect, useState } from 'react';

import sectiondata from "../../store/store";
import Button from "../../components/common/Button";
import SectionsHeading from "../../components/common/SectionsHeading";


import CommonHomePageItems from "../../components/blogs/CommonHomePageItems";
import Pagination from "../../components/blogs/Pagination";

import GeneralHeader from "../../components/common/GeneralHeader";
import Footer from "../../components/common/footer/Footer";

import ScrollTopBtn from "../../components/common/ScrollTopBtn";

import CustomizedTables from "../../layouts/Table"
import Tabs from "../../layouts/Tabs"
import { PaginationBackgroundImages } from '../../store/BackgroundImages';

import Comments from "../../layouts/Comments"

import { useDispatch, useSelector } from "react-redux"
import { 
    headingData,
    loadData,
    datalink,
    countryList,
} from "../../actionCreator"
import BannerTwo from '../../components/banner/BannerTwo/Banner'
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
        // dispatch(Progress(20))
        if(acuDatA.pageheaderheading == "Clinics"){
            dispatch(countryList(CountryListData))
        }
        
    },[])
    

    return (
         <main className="blog-fullwidth-page">
            {/* {Nav} */}
            <GeneralHeader />
             
             {/* {Header Content} */}
             <BannerTwo />

            {/* {Pagination} */}
             { acuDatA.paginationvisible === true ? <section className="cta-area section-bg 
                                column-sm-center padding-top-80px 
                                padding-bottom-80px">

                {PaginationBackgroundImages.map((img, index) => {
                    return (
                        <img src={img.img} key={index} alt="Cta Symble" className="symble-img" />
                    )
                })}
                    <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-12 text-left">
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
                        </div>
                    </div>
                </div>
            </section> : null }
            
             <br />
             <br />
            
            {/* {Tabs Acupoint or FOrmula and Topics} */}
            <div className="mybgGradient">
                { acuDatA.tabsvisible === true ? 
                        <Tabs isToggle={isToggle} handleClick={(event)=> setisToggle(event) } />
                        : null
                }
                
                {/* { FOr Clinics Only} */}
                { acuDatA.tablevisible === true ? 
                    <div className="container" style={{marginTop: "-3em"}}>
                        <CustomizedTables />
                    </div>
                    :null
                }

                {/* {Array or table} */}
                <section 
                    className="blog-grid padding-top-20px padding-bottom-100px"
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

                {/* {COmment tab} */}
                <div style={{
                    background: "rgba(255,255,255,0)",
                    width: "80vw",
                    overflow: "hidden",
                    margin: "auto auto"
                }}>
                    { isToggle ? 
                        <motion.section
                            initial={{ x: 1000, scale: 0}}
                            exit={{ x: -1000, scale: 0 }}
                            animate={{ x: 0, scale: 0.9, transition: { duration: 0.5} }}
                            style={{ marginTop: "2em" }}>
                            <Comments />
                        </motion.section> : null}
                </div>            
            </div>

             {/* <NewsLetter /> */}

             <Footer />

             <ScrollTopBtn />

         </main>

    );
}

export default React.memo(CommonHomePage);
