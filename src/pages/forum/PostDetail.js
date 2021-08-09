// details of all the replies for selected Post
import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import GeneralHeader from "../../components/common/GeneralHeader";
import "./PostDetail.css";
// for replying to main post
import MainReplyForm from "./forum_components/MainReplyForm";
// for quoting
import QuoteForm from "./forum_components/QuoteForm";
import ReactHtmlParser from "react-html-parser";
import EditPost from "./forum_components/EditPost";
// for editing replies
import EditReplyForm from "./forum_components/EditReplyForm";

import {getPost,savePost} from './../../services/posts';
import {getReplies} from './../../services/replies';
import { getForumSubCats } from './../../services/forumsubcategories';

function NoteDetail() {
  const [Post, setPost] = useState({
    user: {},
  });
  const [showForm, setShowForm] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyForm, setReplyForm] = useState(false);
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

  let location = useLocation();

  const loadPage = async () => {
    //get the main post of the page

    const { data: post } = await getPost(postId);
    setPost(post);
    setMyName(post.user.username);
    //Get replies for the post
    const { data: replies } = await getReplies(postId);

    replies.forEach((element) => {
      element.createdAt = new Date(element.createdAt)
        .toString()
        .substring(4, 15);
      element.updatedAt = new Date(element.updatedAt)
        .toString()
        .substring(4, 15);
    });
    setReplyResult(replies);
    let replyArray = replies.length;
    setNumberReply(replyArray);
  };


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
    setEditPost(false);
  };

  const history = useHistory();
  function goBackHandler() {
    history.goBack();
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

  //handle threadStatus
  const handleThreadStatus = async (e) => {
    let editThreadStatus = {
      _id: Post._id,
      user: Post.user,
      forumId: Post.forum_id,
      threadStatus: Post.threadStatus,
      slug: Post.slug,
      title: Post.title,
      message: Post.message,
    };

    if (Post.threadStatus == "open") {
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
    await savePost(editThreadStatus);
    window.location.reload();
  };

  const submitReply = (e, idx) => {
    setReplyForm({ id: idx, state: false });
    setEditForm({ id: idx, state: false });
    e.preventDefault();
  };

  useEffect(function () {
    loadPage();
  }, []);

  // main post reply
  const handleReply = (e) => {
    e.preventDefault();

    if (localStorage.id) {
      setShowForm(true);
    } else {
      alert("Please login first");
    }
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
  const deleteBtnPost = async (e, idx, replyId) => {
    e.preventDefault();
    let id = e.target.id;
    // console.log(id)
    if (localStorage.id == id || localStorage.type === "admin") {
      const apiDeleteReply = await fetch(`/api/deletereply/${replyId}`, {
        method: "delete",
      }).then((result) => result.json());
      console.log(apiDeleteReply);
    }
    loadPage();
  };

  const editReply = (e, idx) => {
    let id = e.target.id;
    if (
      localStorage.id == id ||
      localStorage.type === "moderator" ||
      localStorage.type === "admin"
    ) {
      setEditForm({ id: idx, state: true });
    } else {
      setEditForm({ id: "", state: false });
    }
  };

  const handleDelete = async (e, id, userId) => {
    e.preventDefault();
    const apiDeletePost = await fetch(`/api/deletepost/${id}/${userId}`, {
      method: "delete",
    }).then((result) => result.json());
    console.log(apiDeletePost);
    window.location.href = "/forum";
  };

  const handleEditPost = (e) => {
    e.preventDefault();
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
            <div className="row mt-2">
              <button
                onClick={goBackHandler}
                className="btn btn-secondary mt-3 ml-3"
              >
                Go Back
              </button>
            </div>
            {/* go back button */}

            <div className="">
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
                        src={`${Post.user.img}`}
                        className="rounded-circle mr-3 mail-img "
                        alt="media image"
                        width="70"
                        height="70"
                      />
                      <div className="media-body">
                        <h8 className="">Question by {Post.name}</h8> <br />
                        <div className="">
                          <i className="mdi mdi-clock mr-1 align-center"></i>
                          <small className="">
                            {Date(Post.createdAt).slice(0, 16)}
                          </small>
                        </div>
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
                            Post={Post}
                            loadPage={loadPage}
                          />
                        </div>
                      ) : (
                        <div>{ReactHtmlParser(Post.message)}</div>
                      )}
                    </div>
                  </div>

                  {/* buttons */}
                  <div className="row bg-light px-3 py-3 border-bottom justify-content-between">
                    {/* left part */}
                    {/* // reply to main post */}

                    {Post.threadStatus == "open" ? (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary mr-1"
                        onClick={handleReply}
                      >
                        <i className="mdi mdi-reply mr-1"></i>
                        Reply
                      </button>
                    ) : (
                      ""
                    )}
                    <div>
                      <div class="btn-group mr-1">
                        {localStorage.id === Post.userId ||
                        localStorage.type === "admin" ? (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={(e) =>
                              handleDelete(e, Post._id, Post.userId)
                            }
                          >
                            <i className="mdi mdi-delete  mr-1"></i>
                            Delete
                          </button>
                        ) : (
                          ""
                        )}

                        {localStorage.id === Post.userId ||
                        localStorage.type === "moderator" ||
                        localStorage.type === "admin" ? (
                          <>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                              onClick={handleEditPost}
                            >
                              <i className="mdi mdi-archive"></i>
                              Edit
                            </button>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div class="btn-group">
                        {" "}
                        {localStorage.id === Post.userId ||
                        localStorage.type === "moderator" ||
                        localStorage.type === "admin" ? (
                          <>
                            {/* lock button */}
                            {Post.threadStatus == "open" ? (
                              <button
                                onClick={handleThreadStatus}
                                class="btn btn-sm btn-outline-secondary"
                              >
                                <i class="fas fa-lock-open"></i>
                              </button>
                            ) : (
                              <button
                                onClick={handleThreadStatus}
                                class="btn btn-sm btn-outline-secondary"
                              >
                                <i class="fas fa-lock"></i>
                              </button>
                            )}

                            {/* move button */}
                            <button
                              class="btn btn-outline-secondary btn-sm dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            ></button>
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
                        ) : (
                          ""
                        )}
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
          </div>
          {/* End Body */}

          {/* Body  for replies*/}
          <div className="col-lg-10 ">
            <div className="ml-1 ml-md-4">
              <div
                className="card shadow-none bg-white "
                style={{ border: "none" }}
              >
                {replyResult.length !== 0
                  ? replyResult.map((reply, idx) => (
                      // better ui
                      <div className="card-body text-dark">
                        {/* Avatar and email */}
                        <div className="media mb-4">
                          <img
                            src={`${reply.img}`}
                            className="rounded-circle mr-3 mail-img "
                            alt="media image"
                            width="70"
                            height="70"
                          />
                          <div className="media-body">
                            <h8 className="">Reply By {reply.name}</h8> <br />
                            <div className="">
                              <i className="mdi mdi-clock mr-1 align-center"></i>
                              <small className="">{reply.createdAt}</small>
                            </div>
                          </div>
                        </div>
                        {/* <!-- media --> */}
                        {/* body */}
                        {editForm.id == idx && editForm.state ? (
                          <EditReplyForm
                            submitReply={submitReply}
                            idx={idx}
                            reply={reply}
                            loadPage={loadPage}
                          />
                        ) : (
                          <div>{ReactHtmlParser(reply.message)}</div>
                        )}

                        <div class="col-lg-12">
                          <div class="row justify-content-between mt-3 mb-3">
                            {" "}
                            {localStorage.id ? (
                              <>
                                {Post.threadStatus == "open" ? (
                                  <div>
                                    {/* reply button for replies */}
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-secondary mr-1"
                                      onClick={() =>
                                        handleRepliesReply(reply._id)
                                      }
                                    >
                                      <i class="fas fa-quote-right mr-1"></i>
                                      Quote
                                    </button>
                                  </div>
                                ) : (
                                  ""
                                )}
                                <div>
                                  <div class="btn-group mr-1">
                                    <button
                                      class="btn btn-sm btn-outline-secondary"
                                      type="submit"
                                      id={reply.userId}
                                      onClick={(e) => editReply(e, idx)}
                                    >
                                      <i className="mdi mdi-archive  mr-1"></i>
                                      Edit
                                    </button>
                                    <br />
                                    <button
                                      class="btn btn-sm btn-outline-secondary"
                                      type="submit"
                                      id={reply.userId}
                                      onClick={(e) =>
                                        deleteBtnPost(e, idx, reply._id)
                                      }
                                    >
                                      <i className="mdi mdi-delete  mr-1"></i>
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </>
                            ) : (
                              ""
                            )}{" "}
                          </div>
                          {showReplyForm ? (
                            reply._id == replyName ? (
                              // for replying to a reply
                              <div>
                                <QuoteForm
                                  message={reply.message}
                                  name={reply.name}
                                  submitForm={submitReplyForm}
                                  Post={Post}
                                  loadPage={loadPage}
                                  alertSuccess={alertSuccess}
                                  alertFailure={alertFailure}
                                />
                              </div>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
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
