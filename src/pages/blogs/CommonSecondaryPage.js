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
import { SalonNavData } from "../../store/SalonProfileNavData"


function CommonSecondaryPage(props) {
    
    const Gstate = useSelector(s=> s.entities.acudata)
    const Thisstate = useSelector(s=> s.entities.acudpoint)
    const dispatch = useDispatch()
    
    
    useEffect(()=>{
        const datalinK = props.datalink
        
        dispatch(datalink(props.datalink)) 
        dispatch(loadData())  

        datalinK != '/clinicsolo' ? console.log(''): dispatch(navdata(ClinicsNavData))
        // beelow one need to change when datalink will be correct /abc
        datalinK != '/abc' ? console.log('') : dispatch(navdata(SalonNavData))
        datalinK != '/formulas' ? console.log('') : dispatch(navdata(NavData))
        datalinK != '/acupunctures' ? console.log('') : dispatch(navdata(NavData))

        dispatch(acuPageLink(props.name.match.params.name))
        document.title = props.name.match.params.name
    },[])
    
    const DataLink = Gstate.datalink
    const Status = Gstate.status
    const Title1 = DataLink != "/formulas" ? "" : "Formulas";
    const Title2 = DataLink != "/acupunctures" ? "" : "Acupunture Point";
    const Title3 = DataLink != "/clinicsolo" ? "" : "Clinics Profile";
    // Bello const title 4 needed to change accoring to datalink of the page 
    const Title4 = DataLink != "/abc" ? "" : "Salon Profile"; 
    return (
        <div>
            <GeneralHeader />
            <Breadcrumb 
                CurrentPgTitle={Title1+Title2+Title3+Title4} 
                MenuPgTitle={Gstate.datalink.slice(1,-1)} 
                img={bg} 
            /> 
            
            {/* below condition needed to remove when you add proper link */}
            { Gstate.datalink === '/abc' ?  null : <LoadingErrorView /> }   

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

            { Gstate.datalink === '/abc' ? 
                <div className="container">
                    <CommonSecondaryPageItems />
                </div>
                : null}


            {/* <div className="container">
                <NewsLetter />
            </div> */}
 
            <Footer />

            <ScrollTopBtn /> 

         </div> 
    );
}

export default React.memo(CommonSecondaryPage);
