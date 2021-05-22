import React,{ useEffect, useState } from 'react';

import BlogFullWidthItems from "../../components/blogs/AcupuntureItems";
import Pagination from "../../components/blogs/Pagination";

import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import Footer from "../../components/common/footer/Footer";
// import NewsLetter from "../../components/other/cta/NewsLetter";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import ListingDetailsComments from "../../components/contact/ListingDetailsComments"
import BlogCommentFields from "../../components/blogs/BlogCommentFields"

import MeridianForm from "./acupuncture/MeridianForm"

import breadcrumbimg from '../../assets/images/bread-bg.jpg'
import bg from "../../assets/images/custom/bg.jpg"

import sectiondata from "../../store/store";
import AcupuntureData from "./acupuncture/data"

import { useDispatch, useSelector } from "react-redux"
import { 
    data, 
    loading, 
    selectData, 
    acupuntureData, 
    error, 
    dataAsync
} from "../../actionCreator"

// import  { getReq, postReq }  from "../../dataFetch"
import { apiUrl } from "../../config/config"
import Typography from "@material-ui/core/Typography";


const apiEndpoint = apiUrl.url + "/acupunctures";

const state = {
    breadcrumbimg: breadcrumbimg,
}

function BlogFullWidth() {
    
    const Gstate = useSelector(selectData)
    const dispatch = useDispatch()
    const [ isToggle , setisToggle ] = useState(false)

    useEffect(()=>{  
        dispatch(loading())
        dispatch(dataAsync())     
        dispatch(acupuntureData(AcupuntureData))
        
    },[])


    
    const acuDatA = Gstate.acudata

    return (
         <main className="blog-fullwidth-page">
            
             <GeneralHeader />

             <Breadcrumb 
                 CurrentPgTitle="Acupuncture" 
                 MenuPgTitle="" 
                 img={bg} 
             />

             <div style={{textAlign:"center"}}>
                 <p style={{color:"red"}}>{acuDatA.top}</p>
                 <h1>{acuDatA.heading}</h1>
             </div>

             <section className="blog-grid padding-top-40px padding-bottom-50px">
                 <div className="container">
                     <div className="row">
                        
                         <div className="col-lg-5">
                             <img src={acuDatA.image} className="imgstyle" />
                         </div>
                        
                         <div className="col-lg-6"  style={{marginTop:"4em", fontSize:"20px"}}>
                            
                             <p>{acuDatA.description1}</p><br />
                             <p>{acuDatA.description2}</p><br />
                             <p>{acuDatA.description3}</p><br />
                             <p>{acuDatA.description4}</p><br />
                             <p>{acuDatA.description5}</p><br />
                            
                             <br />
                             <hr />
                             <br />

                             <MeridianForm 
                                 newList={state} 
                             />

                         </div>
                     </div>
                 </div>
             </section>
            
            <div className="container" style={{margin:"1em 2em", wordWrap:"wrap", width:"80vw"}}>
                <Typography variant="h6">{acuDatA.pagination}</Typography>
            </div>

             <div className="mymobile">
                 <Pagination />
             </div>
             <br />

             <div style={{textAlign:"center"}}>
                 <p>Active Filter: {
                     Gstate.filter != null ? Gstate.filter.toUpperCase() : 'ALL'
                 }</p>
             </div>
             <br />
             <br />

             <div className="container">
                 <div className="row">
                     <div className={ isToggle ? "col-lg-6 mycustomtopicinactive" :
                              "col-lg-6 mycustomtopicactive"}>

                         <div 
                             className="mytopicmobile mytopic1"
                             style={ isToggle ? { background: "rgba(255,255,255,0)" } : { padding: "0.5em" }} 
                             onClick={()=> setisToggle(false)}>

                             <Typography 
                                 variant="h6" 
                                 style={ isToggle ? {}:  {color: "red"}}>

                                 Accu-Points
                             </Typography>

                         </div>

                     </div>
                    
                     <div className={ isToggle ? "col-lg-6 mycustomtopicactive" :
                             "col-lg-6 mycustomtopicinactive"} >
                         <div 
                             className="mytopicmobile mytopic1"
                             style={ isToggle ? {padding:"0.5em"}: {background:"rgba(255,255,255,0)"}} 
                             onClick={()=> setisToggle(true)}>
                            
                             <Typography 
                                 variant="h6" 
                                 style={ isToggle ? {color: "red"}: {}}>
                                     Topic and Comments
                             </Typography>

                         </div>
                     </div>

                 </div>
             </div>

             <section className="blog-grid padding-top-40px padding-bottom-100px" 
                 style={ isToggle ? {display:"none"} : {display:"block"}}>
                
                 <div className="container">
                     <div className="row">
                         <div className="col-lg-12">

                             <BlogFullWidthItems />

                         </div>
                     </div>
                 </div>

             </section>

             <section style={ isToggle ? { display: "block", marginTop: "4em" } : { display: "none" }}>
                 <div className="container">
                    
                     <div className="comments-wrap">

                         <h2 className="widget-title">
                             3 Comments
                         </h2>

                         <div className="title-shape"></div>

                         <ListingDetailsComments 
                             commentlists={sectiondata.listingDetails.comments} 
                         />

                     </div>
                    
                     <div className="add-review-listing padding-top-50px">
                        
                         <h2 className="widget-title">Add a Comment</h2>
                        
                         <div className="title-shape"></div>

                         <div className="section-heading padding-top-10px">
                             <p className="sec__desc font-size-16">
                                 Your email address will not be published. Required fields are marked *
                             </p>
                         </div>

                         <div className="contact-form-action mt-3">
                             <BlogCommentFields />
                         </div>
                     </div>

                 </div>
             </section>
            
             {/* <NewsLetter /> */}

             <Footer />

             <ScrollTopBtn />

         </main>

    );
}

export default React.memo(BlogFullWidth);
