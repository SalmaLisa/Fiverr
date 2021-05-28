import React, { useEffect } from 'react';
import Typography from "@material-ui/core/Typography"
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import CommonSecondaryPageItems from "../../components/blogs/CommonSecondaryPageItems";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import bg from "../../assets/images/custom/bg.jpg"
import { useDispatch, useSelector } from "react-redux"
import { NavData } from "../../store/NavData"
import LoadingErrorView from "../../layouts/LoadingErrorView"

import { 
    acuPageLink, 
    loadData,
    navdata,
    datalink
} from "../../actionCreator"
import { ClinicsNavData } from "../../store/ClinicsNavData"

function CommonSecondaryPage(props) {
    
    const Gstate = useSelector(s=> s.entities.acudata)
    const Thisstate = useSelector(s=> s.entities.acudpoint)
    const dispatch = useDispatch()

    
    useEffect(()=>{
        dispatch(datalink(props.datalink)) 
        dispatch(loadData())  
        props.datalink != '/clinicsolo' ? dispatch(navdata(NavData)) : dispatch(navdata(ClinicsNavData))
        dispatch(acuPageLink(props.name.match.params.name))
        document.title = props.name.match.params.name
    },[])

    const Status = Gstate.status
    const DataLink = Gstate.datalink
    const Title1 = DataLink != "/formulas" ? "" : "Formulas"
    const Title2 = DataLink != "/acupunctures" ? "" : "Acupunture Point"
    const Title3 = DataLink != "/clinicsolo" ? "" : "Clinics Profile"
    return (
        <div>
            <GeneralHeader />
            <Breadcrumb 
                CurrentPgTitle={Title1+Title2+Title3} 
                MenuPgTitle={Gstate.datalink.slice(1,-1)} 
                img={bg} 
            /> 
            
            <LoadingErrorView />

            <section
                style={ Status === 'loaded' ? 
                    {  } : { display: "none" } } 
                className="blog-single-area padding-top-40px padding-bottom-70px">

                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {Gstate.acupagelink}
                            <CommonSecondaryPageItems />
                        
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

export default React.memo(CommonSecondaryPage);
