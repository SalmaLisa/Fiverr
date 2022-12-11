import React,{ useState , useEffect } from 'react';
import GeneralHeader from "../components/common/GeneralHeader";
import Breadcrumb from "../components/common/Breadcrumb";
// import NewsLetter from "../components/other/cta/NewsLetter";
import Footer from "../components/common/footer/Footer";
import ScrollTopBtn from "../components/common/ScrollTopBtn";
import breadcrumbimg from '../assets/images/bread-bg.jpg';
import { PrivacyPolicyData } from "../store/PrivacyPolicyData"
import Typography  from '@material-ui/core/Typography';
import RemoveIcon from '@material-ui/icons/Remove';

const state = {
    breadcrumbimg: breadcrumbimg,
}

function PrivacyPolicy() {
    const active = "Terms Of Use"
    const TemplateColor = { color: "#ff6b6b", marginRight: "0.4em"}

    useEffect(()=>{
        document.title = active
    },[])
    return (
        <main className="signup-page">
            {/* Header */}
            <GeneralHeader />

            {/* Breadcrumb */}
            <Breadcrumb CurrentPgTitle={active} img={state.breadcrumbimg} />
            
            {/* Content */}
            <section className="form-shared padding-top-40px padding-bottom-100px">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-11 col-sm-11 col-lg-11 border p-4 shadow mx-auto">
                            
                            <Typography variant="h5" style={TemplateColor}>
                                { PrivacyPolicyData.effectivedate }
                            </Typography>
                            
                            <Typography className="mt-3 dark" variant="h6">
                                { PrivacyPolicyData.welcome }
                            </Typography>

                            <Typography className="mt-3" variant="h6">
                                { PrivacyPolicyData.useragreementtitle }
                            </Typography>

                            <Typography className="mt-3" variant="body1">
                                { PrivacyPolicyData.description1 }
                            </Typography>
                            <Typography className="mt-1" variant="body1">
                                { PrivacyPolicyData.description2 }
                            </Typography>
                            <Typography className="mt-1" variant="body1">
                                { PrivacyPolicyData.description3 }
                            </Typography>
                            <Typography className="mt-1" variant="body1">
                                { PrivacyPolicyData.description4 }
                            </Typography>
                            <Typography className="mt-1" variant="body1">
                                { PrivacyPolicyData.description5 }
                            </Typography>
                        </div>
                        <div className="col-11 col-sm-5 col-lg-5 mt-4 mx-auto">
                            
                            <div className="row">
                                <div className="col-12 p-3 border shadow">
                                    <Typography style={TemplateColor} variant="h5">
                                        { PrivacyPolicyData.childcondition }
                                    </Typography>
                                    <Typography variant="body1" className="mt-3">
                                        { PrivacyPolicyData.childline1 }
                                    </Typography>
                                    <Typography variant="body1" className="mt-3">
                                        { PrivacyPolicyData.childline2 }
                                    </Typography>
                                </div>
                                <div className="col-12 p-3 border shadow mt-4">
                                    <Typography style={TemplateColor} variant="h5">
                                        { PrivacyPolicyData.codeofconduct }
                                    </Typography>
                                    <Typography variant="body1" className="mt-3">
                                        { PrivacyPolicyData.acesstitle1 }
                                    </Typography>
                                    <Typography variant="body1" className="mt-3">
                                        { PrivacyPolicyData.acesstitle2 }
                                    </Typography>
                                    <br />
                                    {
                                        PrivacyPolicyData.acesslist.map((item)=>
                                            <div style={{display: "flex" }}>
                                                <RemoveIcon style={TemplateColor} fontSize="large" />
                                                <Typography>
                                                    {item} <br/><br />
                                                </Typography>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            
                        </div>
                    <div className="col-11 col-sm-5 col-lg-5 mt-4 border p-3 shadow mx-auto">
                            <Typography style={TemplateColor} variant="h5">
                                { PrivacyPolicyData.contenttitle1 }
                            </Typography>
                            <Typography variant="h6" className="mt-3">
                                { PrivacyPolicyData.contenttitle2 }
                            </Typography>
                            <br/>
                            {
                                PrivacyPolicyData.contentlist.map((item)=>
                                    <div style={{ display: "flex" }}>
                                        <RemoveIcon style={TemplateColor} fontSize="large" />
                                        <Typography variant="" className="">{item}<br /><br /></Typography>    
                                    </div>
                                )
                            }
                            <br /><br/>
                            <div style={{ textAlign: "center" }}>
                                <Typography variant="h5" color="secondary">
                                    { PrivacyPolicyData.director }
                                    <br />
                                    <small>C.D.O</small>
                                </Typography>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
			
        <Footer />

        <ScrollTopBtn />

        </main>
    );
}

export default PrivacyPolicy;
