// Displaying all the posts inside The selected Forum
// MainPostForm will provide form for this page
import React, { useState, useEffect } from "react";
import Posts from "./forum_components/Posts";
import axios from "axios";
import GeneralHeader from "../../components/common/GeneralHeader";
import { useParams, Link } from "react-router-dom";
// import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddIcon from '@material-ui/icons/Add';

import "../assets/css/forum/forums.css";

// Pagination
import Pagination from "./forum_components/Pagination";

// QuillEditor is in this component
import MainPostForm from "./forum_components/MainPostForm";

import auth from "./../../services/authservice";
import { getUser } from './../../services/users';
import { getPostsData, getPosts, getTopics } from './../../services/posts';

// Forum for component..
const Forums = () => {
  const [postsResult, setpostsResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const [currentUser, setCurrentUser] = useState([]);
  // new post
  const [showForm, setShowForm] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ type: "", message: "" });

  const { forum_id } = useParams();

  // hide form after submit
  const submitThread = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  const alertSuccess = (msg) => {
    setAlertMessage({ type: "success", message: msg });
    setTimeout(function () {
      setAlertMessage({});
    }, 2000);
  };

  //passing data from child to parent
  const alertFailure = (msg) => {
    setAlertMessage({ type: "danger", message: msg });
    setTimeout(function () {
      setAlertMessage({});
    }, 2000);
  };


  const getCurrentUser = async () => {
    const user = auth.getProfile();
    if (user) {
      const { data: currentUser } = await getUser(user._id);
      setCurrentUser(currentUser);
    }
  }



  //   this gets envoked on clicking the new post button
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   let id = localStorage.id;

  //   if (localStorage.type == "admin") {
  //     setShowForm(true);
  //   } else if (!localStorage.id) {
  //     alertFailure(
  //       "Dear guest, feel free to visit, to participate please register"
  //     );
  //   } else if (localStorage.id) {
  //     setShowForm(true);
  //   } else {
  //     const apiPoints = await fetch(`/api/points/${id}`).then((result) =>
  //       result.json()
  //     );
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentUser) {
      setShowForm(true);
    } else {
      alertFailure(
        "Dear guest, feel free to visit, to participate please register"
      );
    }
  };



  // called inside UseEffect to get all the posts
  const fetchPosts = async () => {
    setLoading(true);
    const res = await getTopics();
    let apiGetPosts = res.data.reverse();
    console.log(apiGetPosts, "before filter");
    setpostsResult(apiGetPosts);

    //
    // apiGetPosts = apiGetPosts.filter((el) => el.forumId == forum_id);
    // console.log(apiGetPosts, "after filter");

    // apiGetPosts.forEach((element) => {
    //   element.createdAt = new Date(element.createdAt)
    //     .toString()
    //     .substring(4, 15);
    //   element.updatedAt = new Date(element.updatedAt)
    //     .toString()
    //     .substring(4, 15);
    // });

    // console.log(apiGetPosts, "after foreach");

    setpostsResult(apiGetPosts);
    console.log(postsResult, "i am postsResult");
    console.log(apiGetPosts);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
    getCurrentUser();
  }, []);

  // Get current posts
  console.log(postsResult);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postsResult.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Returning statement..
  return (
    <>
      <div
        style={{
          backgroundColor: "#333F57",
          width: "100%",
          height: "80px",
        }}
      >
        <GeneralHeader />
      </div>

      <div className="content pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* go back button */}

              <div className="row mt-2"></div>
              {/* go back button */}
              {/* new post button */}

              {/* ---- Create Topic ---- */}
              <div class="">
                {/* <button onClick={function(){localStorage.points > 5 ? setShowForm(true) : setShowForm(false); alert('Not enough points to start a new thread')}}>New Thread</button> */}
                <div className="row  mx-auto justify-content-between mb-1 mt-5">
                  <Link className="btn btn-secondary" to="/forum">
                    Go Back
                  </Link>

                  {/* ---- Create Topic Button ---- */}
                  <div className="HeaderTablesDiv1">
                    <button className="HeaderTablesDiv1Btn1">
                      <div className="textStyle">Create Topic</div>
                      <AddIcon />
                    </button>
                  </div>
                  
                  <button
                    class="btn btn-primary "
                    style={{}}
                    onClick={handleSubmit}
                  >
                    {" "}
                    <i class="fas fa-plus"></i> New Post
                  </button>
                </div>
                <br />
                {alertMessage.message !== "" ? (
                  <div className="col-10 mb-3">{alertMessage.message}</div>
                ) : (
                  ""
                )}
                {showForm ? (
                  <div>
                    <MainPostForm
                      forum_id={forum_id}
                      submitThread={submitThread}
                      loadPage={fetchPosts}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* new post button end */}

              {/* Posts */}
              <div className="card mb-3">
                <Posts postsResult={currentPosts} loading={loading} />
              </div>

              {/* Pages */}
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={postsResult.length}
                paginate={paginate}
              />
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forums;
