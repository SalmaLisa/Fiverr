import React from 'react';
import ListingDetailsComments from "../contact/ListingDetailsComments";
import BlogCommentFields from "./BlogCommentFields";
import {Link} from "react-router-dom";
import sectiondata from "../../store/store";
import Typography from "@material-ui/core/Typography";

import NavigateNext from '@material-ui/icons/NavigateNext';
import { useSelector } from 'react-redux';

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
    const Gstate = useSelector(s=> s.entities.acudata)
    const Thisstate = useSelector(s=> s.entities.acupoint)
    
    const Style = {display:"flex",minWidth: "4em", alignItems: "center"}
    
    const Prev = Thisstate.activeid != null ? 
        Gstate.list.filter((item)=> item.id == Thisstate.activeid - 1 )

        .map((items)=> 
            <Link to={items.name}>        
                <div style={Style}>

                    <NavigateNext 
                        style={{transform:"rotateY(180deg)"}} 
                        className="mynavcon"/>

                    <Typography variant="h6" style={{marginLeft: "2vw"}}>
                        {items.name}
                    </Typography>

                </div>        
            </Link> )
        : "Loading...."

    const Next = Thisstate.activeid != null ? 
        Gstate.list.filter((item)=> item.id == Thisstate.activeid + 1 )

        .map((items)=> 
            <Link to={items.name}> 
                
                <div style={Style}>


                    <Typography 
                        variant="h6" 
                        style={{
                            marginLeft: "2vw",
                            marginRight:"2vw"
                        }}>
                        {items.name}
                    </Typography>

                    <NavigateNext 
                        className="mynavcon"/>
                </div>

            </Link> )

        : "Loading...."
    
    return(
        <div style={{
            display:"flex", 
            flexFlow:"row wrap",
            textAlign:"center",
            justifyContent:"space-evenly"
        }}>
            <div>
                    {Prev}
            </div> 
            <div>
                    {Next}
            </div>
        </div>
    )
}


function BlogDetailContent(props) {

    const Thisstate = useSelector(s=> s.entities.acupoint)
    const Gstate = useSelector(s=> s.entities.acudata)
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