import React, { useEffect } from 'react';
import Typography from "@material-ui/core/Typography"
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import BlogDetailContent from "../../components/blogs/AcuPointItems";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import bg from "../../assets/images/custom/bg.jpg"
import { useDispatch, useSelector } from "react-redux"
import { apiUrl } from "../../config/config"

import { 
    acuPageLink, 
    activeNav, 
    data, 
    error ,
    selectData,
    selectAcuPoint,
    dataAsync,
    loading
} from "../../actionCreator"

const apiEndpoint = apiUrl.url + "/acupunctures" ;

function BlogDetail(props) {
    
    const Gstate = useSelector(selectData)
    const Thisstate = useSelector(selectAcuPoint)
    const dispatch = useDispatch()

    
    useEffect(()=>{
        dispatch(loading())
        dispatch(acuPageLink(props.name.match.params.name))
        dispatch(dataAsync())  
    },[])

    const MyError = Gstate.error
    const Loading = Gstate.loading
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
                            Loading ? 
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
                            MyError ? 
                                { display: "block", textAlign: "center" } : 
                                { display: "none" }}>
                        <Typography 
                            variant="h6">
                                An Error Occured While Loading Data...
                        </Typography>
                        <br />
                    </div>

                </Typography>
            </div>
            <section
                style={ Loading || MyError ? 
                    { display: "none" } : {} } 
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


            <div className="container">
                <NewsLetter />
            </div>
 
            <Footer />

            <ScrollTopBtn /> 

         </div> 
    );
}

export default React.memo(BlogDetail);
