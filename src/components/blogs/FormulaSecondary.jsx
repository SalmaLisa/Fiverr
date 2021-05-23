import React from "react"
import Nav from "../../layouts/Nav.js"

import { useDispatch , useSelector } from "react-redux"

import Typography from "@material-ui/core/Typography"

import QRCode from "react-qr-code"
import { Link } from "react-router-dom"

import BreadCrumb from "../../layouts/BreadCrumb"
import ItemList from "../../layouts/ItemList"
import { UncontrolledCarousel } from "reactstrap"
import Image1 from "../../assets/images/bg1.png"
// import Image1 from "../../assets/images/bg1.jpg"
import Image2 from "../../assets/images/bg1.png"

const ImagesList = [
    {
      src: Image1,
      key: '1'
    },
    {
      src: Image2,
      key: '2'
    },
    {
      src: Image1,
      key: '3'
    }
  ];


const FormulasItems = (incomingData) =>{
    const props = incomingData.newItem
    
    const Thisstate = useSelector(s=> s.entities.acupoint)
    const page = Thisstate.acupagelink

    const activeNav = Thisstate.nav

    const Ingredients = props.ingredients.split(",")
    return(
        <div>
            <ul>
            <BreadCrumb name={page} parentname="Formulas" /><br />    

                <div className="">
                    <Typography variant="h4">{props.name}</Typography>
                    <div className="headerborder"></div>
                </div>

                <br />
                <br />

                <div className="qrcodeformula"> 
                    <QRCode 
                        value={`/formulas/${page}`} 
                        size={110} 
                    />
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
                
                <div className="Carousel">
                    <UncontrolledCarousel items={ImagesList} />
                </div>
                                                
                <ItemList 
                    listName="Pinyin" 
                    value={props.pinyin}
                />
                <ItemList 
                    listName="Chinese" 
                    value={props.chineseSPL}
                />
                <ItemList 
                    listName="Japanese" 
                    value={props.japanese}
                />
                <ItemList 
                    listName="English" 
                    value={props.english}
                />
                <ItemList 
                    listName="Korean" 
                    value={props.korean}
                />
                <ItemList 
                    listName="Vietnamese" 
                    value={props.vietnamese}
                />
                
                <br />

                <Nav />

                <br />
                </ul>
                <ul 
                    style={ 
                        activeNav === 'Profile' ? 
                        {display:"block"}: {display:"none"}}>

                    <ItemList
                        listName="Category"
                        value={props.category}
                    />
                    <ItemList
                        listName="Ingredients"
                        value={"NULL"}
                    />
                    <ul style={{marginLeft:"10em" }}>
                        {Ingredients.map(
                            (items)=> <li>{items}</li>)}
                    </ul>
                    <ItemList
                        listName="Tongue"
                        value={props.tongue}
                    />
                    <ItemList
                        listName="Pulse"
                        value={props.pulse}
                    />
                    <ItemList
                        listName="Contra-indications"
                        value={props.contraIndication}
                    />
                    <ItemList
                        listName="Suggestion"
                        value={props.suggestion}
                    />
                    <ItemList
                        listName="Caution"
                        value={props.caution}
                    />
     
            </ul>    
        </div>
    )
}

export default React.memo(FormulasItems)

