import React from "react";
import ListingDetailsComments from "../components/contact/ListingDetailsComments";
import BlogCommentFields from "../components/blogs//BlogCommentFields";
// import sectiondata from "../store/store";
import { CommentData } from "../store/CommentData";
import CommentsTable from "../components/contact/CommentsTable";
import { useEffect } from "react";
import { getForumCat } from "../services/forumcategories";
import { getPosts, getTopics } from "../services/posts";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Comment = (props) => {

  const [commentLists, setCommentLists] = useState([])

  const getData = async () => {
    console.log("we are here "+props.category)

    if (props.page === "/forumcategories") {
      console.log("we are here "+props.category._id)
      const topics = await getTopics()
      const comments = await getPosts()
      console.log(topics.data.length)
      const filteredTopics = topics.data.filter(e => e?.catId?._id === props.category._id)
      let topicsWithReplies = []
      let replyComments = []
      filteredTopics.forEach(element => {
        replyComments = []

        comments.data.forEach(element1 => {
          if (element1.topicId._id === element._id) {
            replyComments.push(element1)
          }
        });
        let objet = element
        objet.replyComments = replyComments
        topicsWithReplies.push(objet)

      });
      setCommentLists(topicsWithReplies)
    }
    else {
      setCommentLists(CommentData)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div style={{ marginTop: "-4em", color: "black" }}>
      <div className="comments-wrap">
        <h2 className="widget-title">{commentLists?.length}</h2>

        <div className="title-shape"></div>

        {/* <ListingDetailsComments commentlists={CommentData} /> */}
        <CommentsTable  commentLists={commentLists} />
      </div>

      <div className="add-review-listing padding-top-50px">
        <h2 className="widget-title">Add a Comment</h2>

        <div className="title-shape"></div>

        <div className="section-heading padding-top-10px">
          <p className="sec__desc font-size-16">
            Your email address will not be published. Required fields are marked
            *
          </p>
        </div>

        <div className="contact-form-action mt-3">
          <BlogCommentFields />
        </div>
      </div>
    </div>
  );
};

export default Comment;
