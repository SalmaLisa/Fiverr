import React, { useEffect } from 'react';
import Typography from "@material-ui/core/Typography"
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import BlogDetailContent from "../../components/blogs/AcuPointItems";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import bg from "../../assets/images/custom/bg.jpg"
import { useDispatch, useSelector } from "react-redux"
import { NavData } from "../../store/NavData"

import { 
    acuPageLink, 
    loadData,
    navdata,
    datalink
} from "../../actionCreator"

function BlogDetail(props) {
    
    const Gstate = useSelector(s=> s.entities.acudata)
    const Thisstate = useSelector(s=> s.entities.acudpoint)
    const dispatch = useDispatch()

    
    useEffect(()=>{
        dispatch(datalink(props.datalink))
        dispatch(loadData())  
        dispatch(navdata(NavData))
        dispatch(acuPageLink(props.name.match.params.name))
        document.title = props.name.match.params.name
    },[])

    const Status = Gstate.status
    return (
        <div>
            <GeneralHeader />
            <Breadcrumb 
                CurrentPgTitle="Acupuncture Point" 
                MenuPgTitle="Acupuncture" 
                img={bg} 
            /> 
                
            <div className="container">
                <Typography variant="h6">
                                    
                    <div 
                        style={
                            Status === 'loading' ? 
                                { display:"block", textAlign: "center" } : 
                                { display:"none" }
                            }>

                        <Typography 
                            variant="h5">
                                Loading...
                        </Typography>
                        <br />
                    </div>
                    
                    <div 
                        style={ 
                            Status === 'error' ? 
                                { display: "block", textAlign: "center" } : 
                                { display: "none" }}>
                        <Typography 
                            variant="h6">
                                An Error Occured While Loading Data Check Your Network Connection...<br />
                                Or May Be You are visiting wrong Link
                        </Typography>
                        <br />
                        <br />
                    </div>

                </Typography>
            </div>
            <section
                style={ Status === 'loaded' ? 
                    {  } : { display: "none" } } 
                className="blog-single-area padding-top-40px padding-bottom-70px">

                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {Gstate.acupagelink}
                            <BlogDetailContent />
                        
                        </div>
                    </div>
                </div>
            </section>


            {/* <div className="container">
                <NewsLetter />
            </div> */}
 
            <Footer />

            <ScrollTopBtn /> 

         </div> 
    );
}

export default React.memo(BlogDetail);
