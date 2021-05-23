import React,{ useEffect } from "react"
import Nav from "../../../layouts/Nav.js"

import { useDispatch , useSelector } from "react-redux"
import { activeNav, selectAcuPoint, activeId } from "../../../actionCreator"

import Typography from "@material-ui/core/Typography"
import CheckIcon from "@material-ui/icons/Check"

import QRCode from "react-qr-code"
import { Link } from "react-router-dom"

const BreadCrumb =(props)=>{
    const Gstate = useSelector(s=> s.entities.acudata)
    return(
        <div 
            className="breadcrumb" 
            style={{ 
                display:"flex", 
                alignItems:"center"
                }}>
            <Link to="/">
                <Typography 
                    variant="h6" 
                    style={{
                        fontSize:"14px", 
                        margin:"auto 1em"
                    }}>
                        Home
                </Typography>
            </Link>/

            <Link to={`${Gstate.datalink}`}>
                <Typography 
                    variant="h6" 
                    style={{
                        fontSize:"14px", 
                        margin:"auto 1em"
                    }}>
                        Acupuncture
                </Typography>
            </Link>/

            <Typography 
                variant="h6" 
                style={{
                    fontSize:"14px", 
                    margin:"auto 1em"
                }}>{props.name}</Typography>
        </div>
    )
}

const List = (props) =>{
    return(
        <li className="myliststyle">
            <CheckIcon 
                className="mycustomliststyle" 
                />
                
                {props.listName} : 
                { props.value === "NULL" ? 
            null : 
            props.value 
        }
        </li>
    )
}

const Items = (incomingData) =>{
    const props = incomingData.newItem
    
    const Thisstate = useSelector(s=> s.entities.acupoint)
    const dispatch = useDispatch()
    // const  Gstate= useSelector(selectData)
    const page = Thisstate.acupagelink

    const activeNav = Thisstate.nav

    useEffect(()=>{
        dispatch(activeId(props.id))
        console.log(Thisstate.activeid)
    },[props])
    return(
        <div>
            <ul>
            <div className="">
                    <Typography variant="h4">{props.name}</Typography>
                    <div className="headerborder"></div>
                </div>

                <br />
                <br />

                <BreadCrumb name={page} />

                <Typography 
                    variant="h4" 
                    style={{
                        color:"rgb(100,100,100)"
                    }}>
                        Epithet
                </Typography><br />
                
                <div className="qrcode"> 
                    <QRCode 
                        value={`/acupunture/${page}`} 
                        size="110" 
                    />
                </div>
                                                
                <List 
                    listName="Pinyin" 
                    value={props.pinyin}/>
                <List 
                    listName="English" 
                    value={props.english}/>
                <List 
                    listName="Japanese" 
                    value={props.japanese}/>
                <List 
                    listName="Korean" 
                    value={props.korean}/>
                <List 
                    listName="Vietnamese" 
                    value={props.vietnamese}/>
                
                <br />

                <Nav />

                <br />
                </ul>
                <ul 
                    style={ 
                        activeNav === 'Profile' ? 
                        {display:"block"}: {display:"none"}}>

                    <List 
                        listName="Physical Location" 
                        value={props.physicalLocation} />
                    <List 
                        listName="Five Element" 
                        value={props.fiveElement} />
                    <List 
                        listName="Horary Cycle" 
                        value={props.horarycycle} />
                    <List 
                        listName="Functionality" 
                        value={props.functionality} />
                    <List 
                        listName="Meridian" 
                        value={props.meridian} />
                    <List 
                        listName="Element" 
                        value={props.element} />
                    <List 
                        listName="Physical Location" 
                        value={props.caution} />
     
            </ul>    
        </div>
    )
}

export default React.memo(Items)