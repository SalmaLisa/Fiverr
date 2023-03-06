import React,{ useRef , useEffect, useState } from 'react';
import Typography from "@material-ui/core/Typography";

import { useSelector } from 'react-redux';
import Control from "../../layouts/Controls"
import Comment from "../../layouts/Comments"

import AcuPointItems from "./SecondaryPageItems/AcuPointItems"
import FormulaSecondary from "./SecondaryPageItems/FormulaSecondary"
import ClinicsItems from './SecondaryPageItems/ClinicsItems';
import SalonItems from "./SecondaryPageItems/SalonProfilePageItems"
import ForumItems from './SecondaryPageItems/forumItems';
import { CommentData } from '../../store/CommentData';
import { getPosts, getTopics } from '../../services/posts';
import CreateTopic from '../../layouts/CreateTopic';


function CommonSecondaryPageItems(props) {

    const [topics,setTopics] = useState([])
   // const [Filter,setFilter] = useState({})
    const Thisstate = useSelector(s=> s.entities.acupoint)
    const Gstate = useSelector(s=> s.entities.acudata)
    const activeNav = Thisstate.nav

    const Filter = Thisstate.acupointlinkload && Gstate.status === 'loaded' ? Gstate.list
                    .filter((item)=> item.name === undefined ? 
                    null : item.name.includes(Thisstate.acupagelink))
                    : null
  const getTopicsOfCategory = async(id)=>{
    console.log(Gstate)
   const topics = await getTopics()
   const comments = await getPosts()
   console.log(topics.data.length)
   const filteredTopics =topics.data.filter( e=> e?.catId?._id===id)
   let topicsWithReplies =[]
   let replyComments =[]
   filteredTopics.forEach(element => {
       replyComments=[]

                comments.data.forEach(element1 => {       
                    if(element1.topicId._id===element._id) {
                      replyComments.push(element1)
                    }
                  });
              let objet = element 
              objet.replyComments=replyComments 
              topicsWithReplies.push(objet)
              
            });
            setTopics(topicsWithReplies)
            console.log(topicsWithReplies)
   }
  useEffect(()=>{
 getTopicsOfCategory()
  },[])


    const Render = (event) => {
        console.log(event)
        if(Gstate.datalink === '/acupunctures' ){
            return <AcuPointItems newItem={event} />
        }
        else if(Gstate.datalink === '/formulas'){
            return <FormulaSecondary  newItem={event}/>
        }

  
        else if(Gstate.datalink === '/clinicsolo'){
            return <h1> Page Not Added Still</h1>
        }
        else if(Gstate.datalink === '/abc'){
            return <h1>Page Not Added still</h1>
        }
    }

    const Content = Thisstate.acupointlinkload && Gstate.status === 'loaded' ? 
                    Filter.map(
                        (items)=>  Render(items)
                        ) : null

    const ErroR = Thisstate.acupagelink.length < 8 ?  
                  <h2 style={{textAlign: "center"}}>Please Visit Correct Link</h2> 
                  :  Content
    const ErroR2 = Filter != null ? Filter.length === 0 ? "No Data Found":null  :null

    const loadRef = useRef()
    return (
        <> 
        <div className="card-item blog-card border-bottom-0">
            <div className="card-content pl-0 pr-0 pb-0">
                <input 
                    type="text"
                    style={{
                        width:0,
                        height: 0,
                        opacity: 0
                    }} 
                    ref={loadRef} />
                <div>
                    { Gstate.datalink === '/clinicsolo' || Gstate.datalink === '/abc' ?
                         null : 
                         <div>
                            { ErroR2 }
                            { ErroR }
                        </div>}  
                </div>
                <div style={ Gstate.datalink === '/clinicsolo' ? { display: "block"}: { display: "none"} }>
                    <ClinicsItems />
                </div>
                { Gstate.datalink === '/abc' ? <SalonItems /> : null}
                <br /><br />
            

        {Filter &&     <div style={ 
                        activeNav === 'Topic and Comments' ? 
                            { display: "block" } : 
                            { display : "none" }}>

                    <Comment  category={Filter[0]} page={Gstate.datalink}  />
                </div>}

                {Filter &&     <div style={ 
                        activeNav === 'Create Topic' ? 
                            { display: "block" } : 
                            { display : "none" }}>
<CreateTopic category={Filter[0]} />
                </div>}

                <div style={ 
                activeNav === 'Topic and Comments' |
                 activeNav === 'Create Topic' |
                    activeNav === 'Profile' ? 
                    { display: "none" } : 
                    { 
                        display : "flex", 
                        justifyContent: "space-around", 
                        marginTop:"30vh", 
                        flexDirection:"column", 
                        alignItems:"center", 
                        textAlign:"center"
                    }}>

                    <Typography variant="h4">
                        No Data Found
                    </Typography>
                </div>

            </div>
        </div><br /><br />

        <div style={{ display:"flex", justifyContent:"space-evenly"}}>
            <Control />
        </div>

        </>
    );
}

export default React.memo(CommonSecondaryPageItems);