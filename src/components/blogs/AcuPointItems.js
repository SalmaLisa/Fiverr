import React,{useState, useContext} from 'react';
import ListingDetailsComments from "../contact/ListingDetailsComments";
import BlogCommentFields from "./BlogCommentFields";
import {Link} from "react-router-dom";
import BlogTags from "./BlogTags";
import BlogShare from "./BlogShare";
import sectiondata from "../../store/store";
import Typography from "@material-ui/core/Typography";
import {motion } from "framer-motion"

import NavigateNext from '@material-ui/icons/NavigateNext';
import { useSelector } from 'react-redux';
import { selectData, selectAcuPoint } from "../../actionCreator"
import Items from "./AcupointFiles/Items"


const Comment = (props) =>{
    return(
        <>
            <div className="comments-wrap">
                            
                <h2 className="widget-title">
                    3 Comments
                </h2>
                
                <div className="title-shape"></div>

                <ListingDetailsComments 
                    commentlists={sectiondata.listingDetails.comments} />

            </div>

            <div className="add-review-listing padding-top-50px">

                <h2 className="widget-title">
                    Add a Comment
                </h2>
                
                <div className="title-shape"></div>
                
                <div className="section-heading padding-top-10px">
                    <p className="sec__desc font-size-16">
                        Your email address will not be published. 
                        Required fields are marked *
                    </p>
                </div>

                <div className="contact-form-action mt-3">
                    <BlogCommentFields />
                </div>
            </div>
        </>
    )
}

const Control = (props) =>{
    return(
        <>
            <div>
                <NavigateNext 
                    style={{transform:"rotateY(180deg)"}} 
                    className="mynavcon"/>
            </div>

            <div>
                <NavigateNext className="mynavcon"/>
            </div>
        </>
    )
}


function BlogDetailContent(props) {

    const Thisstate = useSelector(selectAcuPoint)
    const Gstate = useSelector(selectData)
    const activeNav = Thisstate.nav

    const Content = Thisstate.acupointlinkload ? Gstate.list
            .filter((item)=> item.name.includes(Thisstate.acupagelink.slice(0,5)))
            .map((items)=> <Items newItem={items} />) : "Loading...."

    return (
        <>
        <div className="card-item blog-card border-bottom-0">
            <div className="card-content pl-0 pr-0 pb-0">
                
                <div >        
                    { Content }
                </div>

                <br /><br />

                <div style={ 
                        activeNav === 'Topic and Comments' ? 
                            { display: "block" } : 
                            { display : "none" }}>

                    <Comment />
                </div>

                <div style={ 
                    activeNav === 'Topic and Comments' | 
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

export default React.memo(BlogDetailContent);