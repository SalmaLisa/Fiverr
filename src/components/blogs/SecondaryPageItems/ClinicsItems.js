import React,{ useEffect } from "react"
import Nav from "../../../layouts/Nav.js"

import { useDispatch , useSelector } from "react-redux"
import { activeNav, selectAcuPoint, activeId } from "../../../actionCreator"

import Typography from "@material-ui/core/Typography"
import CheckIcon from "@material-ui/icons/Check"

import QRCode from "react-qr-code"
import { Link } from "react-router-dom"

import BreadCrumb from "../../../layouts/BreadCrumb"
import ItemList from "../../../layouts/ItemList"



const ClinicsItems = (incomingData) =>{
    const props = incomingData.newItem
    
    const Thisstate = useSelector(s=> s.entities.acupoint)
    const dispatch = useDispatch()
    const ClinicsState = useSelector(s=> s.entities.clinics.clinicprofilelist)
    const page = Thisstate.acupagelink

    const activeNaV = Thisstate.nav
    const WorkingTime = ClinicsState.workingtime.split(",")

    useEffect(()=>{
        // dispatch(activeId(props.id))
        dispatch(activeNav('About Us'))
        console.log(Thisstate.activeid)
    },[props])
    return(
        <div>
            <ul>
                <BreadCrumb name={ClinicsState.name} /><br />
                
                <div className="">
                    <Typography variant="h4">{ClinicsState.name}</Typography>
                    <div className="headerborder"></div>
                </div>

                <br />
                <br />


                <Typography 
                    variant="h4" 
                    style={{
                        color:"rgb(100,100,100)"
                    }}>
                        Epithet
                </Typography><br />
                
                <div 
                    className="qrcode"> 
                    <QRCode 
                        value={`/clinics/${page}`} 
                        size={110} 
                    />
                </div>

                <Nav />

                <br />
                </ul>

                <ul 
                    style={ 
                        activeNaV === 'About Us' ? 
                        {display:"block"}: {display:"none"}}>

                    <Typography variant="h6">
                        { ClinicsState.aboutme}
                    </Typography>
     
                </ul> 
                <ul 
                    style={ 
                        activeNaV === 'Address' ? 
                        {display:"block"}: {display:"none"}}>

                    
                    <ItemList 
                        listName="Address" 
                        value="" />
                        <ul style={{
                            marginLeft:"6em"
                        }}>
                            <li>{ClinicsState.address.address}</li>
                            <li>{ClinicsState.address.city}</li>
                            <li>{ClinicsState.address.country}</li>
                            <br />
                            <li>{ClinicsState.address.mobile}</li>
                            <li>{ClinicsState.address.phone}</li>
                        </ul>
     
                </ul> 
                <ul 
                    style={ 
                        activeNaV === 'Working Time' ? 
                        {display:"block"}: {display:"none"}}>
                        
                        <ItemList listName="Working Time" value="" />
                        <div style={{
                            textAlign:"center",
                            margin:"auto 10em"
                        }}>
                            {WorkingTime.map((item)=> 
                                <li style={{
                                    display: "flex",
                                    width: "20em",
                                    justifyContent: "space-between",
                                    borderBottom: "1px solid lightgrey"
                                }}>
                                    {item.split("::").map(
                                        (item2)=> <p>{item2}</p>)}
                                </li>
                            )}
                        </div>
                </ul>    
                <ul 
                    style={ 
                        activeNaV === 'Bussiness Information' ? 
                        {display:"block"}: {display:"none"}}>

                    
                    <ItemList 
                        listName="Bussiness Information" 
                        value="" />
                        <ul>
                            <li>{ClinicsState.bussinessinformation.membership}</li>
                            <li>{ClinicsState.bussinessinformation.membership_nr}</li>
                            <li>{ClinicsState.bussinessinformation.healthcare_provider_identifier_organistion}</li>
                            <li>{ClinicsState.bussinessinformation.healthcare_provider_identifier_individual}</li>
                            <li>{ClinicsState.bussinessinformation.chamber_of_commerce_nr}</li>
                            <li>{ClinicsState.bussinessinformation.taxpayer_nr}</li>
                            <li>{ClinicsState.bussinessinformation.language}</li>
                        </ul>
     
                </ul> 
                <ul 
                    style={ 
                        activeNaV === 'Testimonials' ? 
                        {display:"block"}: {display:"none"}}>

                    
                    <ItemList 
                        listName="Testimonials" 
                        value={ClinicsState.testimonials} />
     
                </ul> 
        </div>
    )
}

export default React.memo(ClinicsItems)