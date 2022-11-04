// details of all the replies for selected Post
import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import GeneralHeader from "../../components/common/GeneralHeader";
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Breadcrumbs,
} from "@material-ui/core";import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AttachmentIcon from "@material-ui/icons/Attachment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PanToolIcon from "@material-ui/icons/PanTool";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import LockIcon from "@material-ui/icons/Lock";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import ReplyIcon from '@material-ui/icons/Reply';

import "./PostDetail.css";
// for replying to main post
import MainReplyForm from "./forum_components/MainReplyForm";
// for quoting
import QuoteForm from "./forum_components/QuoteForm";
import ReactHtmlParser from "react-html-parser";
import EditPost from "./forum_components/EditPost";
// for editing replies
import EditReplyForm from "./forum_components/EditReplyForm";

import {deletePost, deleteTopic, getPost,getPosts,getTopic,savePost} from './../../services/posts';
import {getReplies} from './../../services/replies';
import { getForumSubCats } from './../../services/forumsubcategories';
import ReplyTopic from "./forum_components/replyTopic";

function NoteDetail() {
  const [Post, setPost] = useState({
    user: {},
  });
  const [showForm, setShowForm] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const [replyForm, setReplyForm] = useState(false);

  const [quoteForm, setQuoteForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [replyResult, setReplyResult] = useState([]);
  const [numberReply, setNumberReply] = useState();
  const [myName, setMyName] = useState("");
  const [alertMessage, setAlertMessage] = useState({ type: "", message: "" });
  const [replyName, setReplyName] = useState("");
  const [forumsubcats, setForumsubcats] = useState([]);
/*   const forums = [
    {
      _id: "10eba340-d01c-11eb-b8bc-0242ac130003",
      title: "Hip Replacement",
      details: "Operations and surgical procedures",
      icon: "fas fa-cut fa-1x",
    },
    {
      _id: "36eb5176-d01c-11eb-b8bc-0242ac130003",
      title: "Knee Problems",
      details: "Bones, joints and muscles",
      icon: "fas fa-bone fa-1x",
    },
    {
      _id: "3f9e633a-d01c-11eb-b8bc-0242ac130003",
      title: "Mirtazapine",
      details: "Brain and nerves",
      icon: "fas fa-brain fa-1x",
    },
  ]; */

  let params = useParams();
  let { name } = useParams();
  let { postId } = useParams();
  let {topicId} = useParams()

  let location = useLocation();
  const [topicReply , setTopicReply] = useState(false)


  /* const loadPage = async () => {
    //get the main post of the page
    var apiGetPost = await fetch(
      `http://localhost:8080/api/post/${postId}`
    ).then((result) => result.json());

    apiGetPost = apiGetPost[0];
    setPost(apiGetPost);

    setMyName(apiGetPost.user.name);
    //Get replies for the post
    const apiGetReply = await fetch(
      ` http://localhost:8080/api/replydata/${postId}`
    ).then((result) => result.json());

    apiGetReply.forEach((element) => {
      element.createdAt = new Date(element.createdAt)
        .toString()
        .substring(4, 15);
      element.updatedAt = new Date(element.updatedAt)
        .toString()
        .substring(4, 15);
    });
    setReplyResult(apiGetReply);
    let replyArray = apiGetReply.length;
    setNumberReply(replyArray);
  };

  //SubmitForm for the Post reply
  const submitForm = (e) => {
    e.preventDefault();
    setShowForm(false);
    setEditPost(false);
  }; */


  const submitForm = (e) => {
    e.preventDefault();
    setShowForm(false);
    setEditPost(false);
  };


   const getforumSubCats = async ()=>{
    const {data:forumSubcats} = await getForumSubCats();
    setForumsubcats(forumSubcats);
   
    };





  //SubmitForm for the Post reply
  const submitReplyForm = (e) => {
    e.preventDefault();
    setShowReplyForm(false);
    setTopicReply(false);
  };

  const submitQuoteForm = (e) => {
    e.preventDefault();
    setShowForm(false);
    setQuoteForm(false);
  };

  const history = useHistory();
  function goBackHandler() {
    history.push(`/forum/${topic.catId._id}`);
  }

  //passing data from child to parent
  const alertSuccess = (msg) => {
    setAlertMessage({ type: "success", message: msg });
    setTimeout(function () {
      setAlertMessage({});
    }, 1000);
  };

  //Passing data from child to parent
  const alertFailure = (msg) => {
    setAlertMessage({ type: "danger", message: msg });
    setTimeout(function () {
      setAlertMessage({});
    }, 1000);
  };
  //submit form for the comments
  const addBtnReply = (e, idx) => {
    e.preventDefault();
    if (localStorage.id) {
      setReplyForm({ id: idx, state: true });
    } else {
      setReplyForm({ id: "", state: false });
    }
  };

  //handle forumnamedit
  const handleForumIDEdit = async (forum_id) => {
    // e.preventDefault()
    let editForumId = {
      _id: Post._id,
      user: Post.user,
      forumId: forum_id,
      threadStatus: Post.threadStatus,
      slug: Post.slug,
      title: Post.title,
      message: Post.message,
    };
    await savePost(editForumId);

    console.log(editForumId);

  
    window.location.href = "/forum";
  };
  const [topic,setTopic] = useState({})
  const [replies , setReplies] = useState([])
  const loadPage=async()=>{
    const p = await getPosts()
    let filteredPosts = p.data.filter(e=> e.topicId._id===topicId)
    setReplies(filteredPosts)
  const data = await getTopic(topicId)
  setTopic(data.data)
  }
 

  //handle threadStatus
  const handleThreadStatus = async (e) => {
    console.log("here")
    let editThreadStatus = {
      _id: topic._id,
      user: topic.user,
      threadStatus: topic.threadStatus,
    
    };

    if (topic.threadStatus == "open") {
      // confusion var or let
      // editThreadStatus = {
      //   postId: Post._id,
      //   userId: Post.userId,
      //   threadstatus: "closed",
      // };
      editThreadStatus.threadStatus = "closed";
    } else {
      // editThreadStatus = {
      //   postId: Post._id,
      //   userId: Post.userId,
      //   threadstatus: "open",
      // };
      editThreadStatus.threadStatus = "open";
    }

    console.log(editThreadStatus);

    // const apiReply = await fetch("http://localhost:8080/api/editThreadStatus", {
    //   method: "post",
    //   headers: {
    //     Accept: "application/json, text/plain, */*",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(editThreadStatus),
    // }).then((result) => result.json());


   // await savePost(editThreadStatus);
   // window.location.reload();
  };

  const submitReply = (e, idx) => {
    setReplyForm({ id: idx, state: false });
    setEditForm({ id: idx, state: false });
    e.preventDefault();
  };

  useEffect(()=>{
  loadPage()
  }, []);

  // main post reply
  const handleReply = (e) => {
    e.preventDefault();
    setTopicReply(true)
  };

  const handleQuote = (e) => {
    e.preventDefault();
    setQuoteForm(true)
  };

  // make reply to reply
  const handleRepliesReply = (name) => {
    // e.preventDefault()

    if (localStorage.id) {
      setReplyName(name);
      setShowReplyForm(true);

      console.log(replyName, "replyName");
    } else {
      alert("Please login first");
    }
  };

  // delete button
  const deleteBtnPost = async (e, replyId) => {
    e.preventDefault();
    await deletePost(replyId)
    loadPage();
  };

  const editReply = (e, idx) => {

      setEditForm({ id: idx, state: true });
 
  };

  const handleDelete = async (event, id) => {
    event.preventDefault();
    const myPosts = await getPosts()
    let filteredPosts = myPosts.data.filter(e=> e.topicId._id===id)
    console.log(filteredPosts)
    filteredPosts.map(async(e)=>{
      await deletePost(e._id)
      console.log("over here")

    })
    await deleteTopic(id)

    window.location.href = "/forum";

    history.push("/forum")

  };


  const handleEditPost = (e) => {
    e.preventDefault();
    console.log(Post)
    setEditPost(true);
    setEditForm(false);
    setShowForm(false);
  };

  return (
    <>
      {/* hearder */}

      <div
        style={{
          backgroundColor: "#333F57",
          width: "100%",
          height: "80px",
        }}
      >
        <GeneralHeader />
      </div>
      {/* hearder */}

      <div className="container p-0 px-md-2">
        <div className="col-lg-12 bg-white col-12">
          {/* Body */}

          <div className="col-lg-10 col-sm-12 col-12">
            {/* go back button */}
            <div style={{justifyContent:"space-between" , alignItems:"center" }} className="row mt-2">
              <button
                onClick={goBackHandler}
                className="btn btn-secondary mt-3 ml-3"
              >
                Go Back
              </button>
              <Breadcrumbs aria-label="breadcrumb">

{/* ---- Forum ---- */}
<Link underline="hover" className="linkStyle" onClick={() => history.push(`/forum/${topic.catId._id}`)} >
  <Typography color="text.primary" und >{topic?.catId?.name}</Typography>
</Link>

{/* ---- Category ---- */}
<Link
  underline="hover"
  className="linkStyle"
  onClick={() => history.push(`/forum/topic/${topic._id}`)}
>
  <Typography color="text.primary" und >{topic?.title}</Typography>
</Link>


</Breadcrumbs>
            </div>
            {/* go back button */}

        {topic._id &&    <div className="">
              <div
                className="card shadow-none bg-white  p-0 "
                style={{ border: "none" }}
              >
                <div className="card-body text-dark">
                  <div className="mt-2">
                    <h2 className="mb-4 mt">{Post.title}</h2>

                    {/* Avatar and email */}
                    <div className="media mb-4">
                      <img
                        src={`${topic?.user?.imageSrc}`}
                        className="rounded-circle mr-3 mail-img "
                        alt="media image"
                        width="70"
                        height="70"
                      />
                      <div className="media-body">
                        <h8 className="">{topic?.user?.contactName.first+" "+topic?.user?.contactName.last}</h8> <br />
                        <div className="">
                          <i className="mdi mdi-clock mr-1 align-center"></i>
                          <small className="">
                            {Date(topic.createdOn).slice(0, 16)}
                          </small>
                        </div>
                        <p>{topic.narrative} </p>
                      </div>
                    </div>
                    {/* <!-- media --> */}

                    {/* body */}
                    <div>
                      {" "}
                      {editPost ? (
                        <div className="mb-3">
                          <EditPost
                            submitForm={submitForm}
                            Post={topic}
                            loadPage={loadPage}
                          />
                        </div>
                      ) : (
                        <div>{ReactHtmlParser(Post.message)}</div>
                      )}
                          {topicReply ? (
                        <div className="mb-3">
                          <ReplyTopic
                          submitReplyForm={submitReplyForm}
                            Post={topic}
                            loadPage={loadPage}
                          />
                        </div>
                      ) : (
                        <div>{ReactHtmlParser(Post.message)}</div>
                      )}
                          {quoteForm ? (
                              // for quoting 
                              <div>
                                <QuoteForm
                                  message={topic.narrative}
                                  name={topic.title}
                                  submitForm={submitQuoteForm}
                                  Post={topic}
                                  loadPage={loadPage}
                                  alertSuccess={alertSuccess}
                                  alertFailure={alertFailure}
                                />
                              </div>
                            ) : (
                              ""
                            )
                        }
                    </div>
                  </div>

                  {/* buttons */}
                  <div className="row bg-light px-3 py-3 border-bottom justify-content-end">
                    {/* left part */}
                    {/* // reply to main post */}

                
                    
                    <div>
                     
                      <div class="btn-group">
                        {" "}
                       
                          <>
<div className="comment-reply d-flex justify-content-end align-items-center">
 <Box>
                <span style={{ marginRight: ".5rem" }}>
                  <FormatQuoteIcon  onClick={handleQuote} />
                </span>
                <span style={{ marginRight: ".5rem" }}>
                  <FavoriteBorderIcon />
                </span>
                <span style={{ marginRight: ".5rem" }}>
                  <AttachmentIcon />
                </span>
                <span style={{ marginRight: ".5rem" }}>
                  <BookmarkBorderIcon />
                </span>
                <span  style={{ marginRight: ".5rem" }}>
                  <ReplyIcon 
                  onClick={handleReply}
                   />
                </span>
                <span style={{ marginRight: ".5rem" }}>
                  <EditIcon onClick={handleEditPost} />
                </span>

                <span style={{ marginRight: ".5rem" }}>
                  <PanToolIcon />
                </span>
                <span style={{ marginRight: ".5rem" }}>
                <DeleteIcon onClick={(e) => handleDelete(e, topic._id)}  />

                </span>
                <span style={{ marginRight: ".5rem" }}>
                  <LockIcon />
                </span>
              </Box>
</div>

                          
                            <div
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              {forumsubcats
                                .filter((x) => x._id != Post.forum_id)
                                .map((y) => (
                                  <button
                                    onClick={() => handleForumIDEdit(y._id)}
                                    class="dropdown-item"
                                  >
                                    Move to {y.title}
                                  </button>
                                ))}
                            </div>
                          </>
                     
                      </div>
                    </div>
                  </div>
                  {/* <!-- End button --> */}

                  <div className="col-lg-10 mt-4 col-12 col-sm-12 p-sm-0">
                    {showForm ? (
                      // main post reply
                      <div>
                        <MainReplyForm
                          submitForm={submitForm}
                          Post={Post}
                          loadPage={loadPage}
                          alertSuccess={alertSuccess}
                          alertFailure={alertFailure}
                        />
                        <hr />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
            

              </div>
              {/* <!-- card --> */}
            </div>
}
          </div>
          {/* End Body */}

          {/* Body  for replies*/}
          <div className="col-lg-10 ">
            <div className="ml-1 ml-md-4">
              <div
                className="card shadow-none bg-white "
                style={{ border: "none" }}
              >
                {replies.length !== 0
                  ? replies.map((reply, idx) => (
                      // better ui
                      <div className="card-body text-dark">
                        {/* Avatar and email */}
                        <div className="media mb-4">
                          <img
                            src={`${reply.user.imageSrc}`}
                            className="rounded-circle mr-3 mail-img "
                            alt="media image"
                            width="70"
                            height="70"
                          />
                          <div className="media-body">
                            <h8 className="">{reply?.user?.contactName.first+" "+reply?.user?.contactName.last}</h8> <br />
                            <div className="">
                              <i className="mdi mdi-clock mr-1 align-center"></i>
                              <small className=""> {Date(reply.createdOn).slice(0, 16)}</small>
                            </div>
                            <p>{reply.narrative} </p>
                          </div>
                        </div>
                        {/* <!-- media --> */}
                        {/* body */}
                        {editForm.id == idx && editForm.state ? (
                          <>
                          <EditReplyForm
                            submitReply={submitReply}
                            idx={idx}
                            reply={reply}
                            loadPage={loadPage}
                          />
                          </>
                        ) : (
                          <div>{ReactHtmlParser(reply.message)}</div>
                        )}

                        <div class="col-lg-12">
                          <div class="row bg-light px-3 py-3  justify-content-end mt-3 mb-3">
                            {" "}
                              <div className="comment-reply d-flex justify-content-end align-items-center">
       <Box>
                <span style={{ marginRight: ".5rem" }}>
                  <FormatQuoteIcon />
                </span>
                <span style={{ marginRight: ".5rem" }}>
                  <FavoriteBorderIcon />
                </span>
                <span style={{ marginRight: ".5rem" }}>
                  <AttachmentIcon />
                </span>
                <span style={{ marginRight: ".5rem" }}>
                  <BookmarkBorderIcon />
                </span>
                <span  style={{ marginRight: ".5rem" }}>
                  <ReplyIcon  />
                  Reply
                </span>
                <span style={{ marginRight: ".5rem" }}>
                  <EditIcon   id={reply.userId} onClick={(e) => editReply(e, idx)} />
                </span>

                <span style={{ marginRight: ".5rem" }}>
                  <PanToolIcon />
                </span>
                <span style={{ marginRight: ".5rem" }}>
                <DeleteIcon   id={reply.userId}  onClick={(e) => deleteBtnPost(e, reply._id) } />

                </span>
                <span style={{ marginRight: ".5rem" }}>
                  <LockIcon />
                </span>
              </Box>
</div>
                            {" "}
                          </div>
                    
                          
                        </div>
                     
                        <hr />

                        {/* better ui  end*/}
                        
                      </div>
                    ))
                  : ""}
              </div>

              {/* <!-- card --> */}
            </div>
          </div>
          {/* End Body for replies*/}
        </div>
      </div>
    </>
  );
}

export default NoteDetail;
