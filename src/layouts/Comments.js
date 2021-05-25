import React from "react"
import ListingDetailsComments from "../components/contact/ListingDetailsComments";
import BlogCommentFields from "../components/blogs//BlogCommentFields";
import sectiondata from "../store/store";

const Comment = (props) =>{
    return(
        <div style={{ marginTop: "-5em"}}>
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
        </div>
    )
}

export default Comment