// Community Forum Page
import React, { useState, useEffect } from "react";
// import './Forum/style.css'
import { Link, useLocation, useParams } from "react-router-dom";
import GeneralHeader from "../../components/common/GeneralHeader";
import ForumCategories from "./ForumCategories";
import {getPostsData} from './../../services/posts';
import { getForumSubCats } from './../../services/forumsubcategories';
import { getForumCats } from './../../services/forumcategories';




const ForumHome = () => {
  let location = useLocation();
  const [postsResult, setPostsResult] = useState([]);
  const [lastName, setLastName] = useState("");
  const [lastUpdated, setLastUpdated] = useState("hi");
  const [forumsubcats, setForumsubcats] = useState([]);
  const [forumcats, setForumcats] = useState([]);
  const [loading, setLoading] = useState(false);


  var { forum_cat_id } = useParams();
  const { pathname, state } = useLocation();
 let forumCatName = state;

  // if (pathname === "/forum") {
  //   var forum_cat_id = "36eb5176-d01c-11eb-b8bc-0242ac130024";
  //   var forumCatName = "Featured Forum";
  // } else {
  // }

  const getforumSubCats = async()=>{
  
    const {data:forumSubCats} = await getForumSubCats();
    setForumsubcats(forumSubCats);
   
    console.log(forumSubCats);
   
  }


  useEffect(function () {
    getforumSubCats();
    getforumCats();
    loadPage();
    setLoading(false);
  }, []);



  /* const forums = [
    {
      _id: "10eba340-d01c-11eb-b8bc-0242ac130003",
      title: "Hip Replacement",
      details: "Operations and surgical procedures",
      icon: "fas fa-cut fa-1x",
      forum_categories_id: [
        "36eb5176-d01c-11eb-b8bc-0242ac130024",
        "10eba340-nfjc-11eb-b8bc-0242ac130003",
        "36eb5176-bdhc-11eb-b8bc-0242ac130003",
      ],
    },
    {
      _id: "36eb5176-d01c-11eb-b8bc-0242ac130003",
      title: "Knee Problems",
      details: "Bones, joints and muscles",
      icon: "fas fa-bone fa-1x",
      forum_categories_id: [
        "36eb5176-d01c-11eb-b8bc-0242ac130024",
        "10eba340-nfjc-11eb-b8bc-0242ac130003",
        "36eb5176-bdhc-11eb-b8bc-0242ac130003",
      ],
    },
    {
      _id: "3f9e633a-d01c-11eb-b8bc-0242ac130003",
      title: "Mirtazapine",
      details: "Brain and nerves",
      icon: "fas fa-brain fa-1x",
      forum_categories_id: [
        "3f9e633a-d01c-3bgd-b8bc-0242ac130003",
        "36eb5176-d01c-11eb-b8bc-0242ac130024",
        "3f9e633a-d01c-11eb-b8bc-0242anh3v003",
      ],
    },
  ]; */

  const getforumCats = async()=>{
  
    const {data:forumCats} = await getForumCats();
    setForumcats(forumCats);
    console.log(forumCats);
  /*   if (pathname === "/forum") {
      let forum_cat_id = forumCats[0]._id;
      let forumCatName = forumCats[0].name;
    } */
 
  }



 

  const loadPage = async () => {
    const {data:apiGetPosts} = await getPostsData();

    if (apiGetPosts.length == 0) {
      setLastName("");
      setLastUpdated("");
    } else {
      apiGetPosts.forEach((element) => {
        element.createdAt = new Date(element.createdAt)
          .toString()
          .substring(4, 15);

        element.updatedAt = new Date(element.updatedAt)
          .toString()
          .substring(4, 15);
      });

      let total = 0;
      apiGetPosts.forEach((element) => {
        total = total + element.userReply.length;
      });
      setPostsResult(apiGetPosts);
      setLastName(apiGetPosts[0].user.name);
      setLastUpdated(apiGetPosts[0].updatedAt);
    }
  };

  // const loadPage = async () => {
  //   const apiGetPosts = await fetch("http://localhost:8080/api/postsdata").then(
  //     (result) => result.json()
  //   );

  //   if (apiGetPosts.length == 0) {
  //     setLastName("");
  //     setLastUpdated("");
  //   } else {
  //     apiGetPosts.forEach((element) => {
  //       element.createdAt = new Date(element.createdAt)
  //         .toString()
  //         .substring(4, 15);

  //       element.updatedAt = new Date(element.updatedAt)
  //         .toString()
  //         .substring(4, 15);
  //     });

  //     let total = 0;
  //     apiGetPosts.forEach((element) => {
  //       total = total + element.userReply.length;
  //     });
  //     setPostsResult(apiGetPosts);
  //     setLastName(apiGetPosts[0].user.name);
  //     setLastUpdated(apiGetPosts[0].updatedAt);
  //   }
  // };


  







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
      <div className="container mt-5">
        <div className="row">
          <div className=""></div>
          {/*  topic starts */}
          <div className="col-lg-10 mt-4">
            {/* 1nd group starts */}
            <div className="col-lg-10">
              <h2 className="mb-3">{forumCatName}</h2>
              <div className="card card-forum">
                <ul className="forum-list forum-topic-list">
               
                  {loading ?  <p>Loading</p> :
                  forumsubcats.filter(
                      (el) =>
                        //el.cat_id.includes(forum_cat_id) === true
                        el.forum.cat_id === forum_cat_id
                    )
                    .map((el) => (
                      <li>
                        <div className="media">
                          <i class={`${el.icon}`}></i>{" "}
                        </div>
                        <div className="info-container">
                          <div className="info">
                            <h3 className="title">
                              <Link to={`/forum/${el._id}`}>{el.name}</Link>
                            </h3>
                            <ul className="info-start-end">
                              <li>{el.description}</li>
                              <li>
                                latest post by{" "}
                                <Link to="/el-detail">
                                  {postsResult.length != 0
                                    ? postsResult.filter(
                                        // e is element of Posts
                                        // el is element of forums
                                        (e) => e.forumId == el._id
                                      ).length == 0
                                      ? ""
                                      : postsResult.filter(
                                          (e) => e.forumId == el._id
                                        )[0].name
                                    : ""}
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="date-replies">
                            <div className="replies">
                              <div className="total">
                                {postsResult.length != 0
                                  ? postsResult.filter(
                                      (e) => e.forumId == el._id
                                    ).length
                                  : ""}
                              </div>
                              <div className="text"> POSTS</div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                   
                
                  
                  
                  }
            
                </ul>
              </div>
              <div className="mt-5">
                <ForumCategories
                  forumcats={forumcats}
                  updateForumCatName={(ele) => setLastName(ele)}
                />
              </div>
            </div>
          </div>
        </div>
      </div> 
    </>
  );
};

export default ForumHome;
