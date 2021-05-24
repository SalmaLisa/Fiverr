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

import HeaderContent from "../../layouts/HeaderContent"
import Tabs from "../../layouts/Tabs"

import bg from "../../assets/images/custom/bg.jpg"

import sectiondata from "../../store/store";

import { useDispatch, useSelector } from "react-redux"
import { 
    headingData,
    loadData,
    datalink,
    countryList
} from "../../actionCreator"

import { CountryListData } from "../../store/CountryListData"
import Typography from "@material-ui/core/Typography";



function BlogFullWidth(props) {
    
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

             <HeaderContent />
            
            { acuDatA.paginationvisible === true ? 
                <div>
                    <div className="container" style={{margin:"1em 2em", wordWrap:"wrap", width:"80vw"}}>
                        <Typography variant="h6">{acuDatA.pagination != null ? acuDatA.pagination : ''}</Typography>
                    </div>

                    <div className="mymobile">
                        <Pagination />
                    </div>
                </div>
            : null }

             <br />

             <div style={ acuDatA.paginationvisible == true ? {textAlign:"center"}: {display: "none"}}>
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
             <section className="blog-grid padding-top-40px padding-bottom-100px" 
                 style={ isToggle ? {display:"none"} : {display:"block"}}>
                
                 <div className="container">
                     <div className="row">
                         <div className="col-lg-12">

                             {acuDatA.datavisible === true ? <BlogFullWidthItems /> : null }

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
