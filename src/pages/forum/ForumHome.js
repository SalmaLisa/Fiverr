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
  const [forumcats, setForumcats] = useState([]);
  const [subcats, setSubcats] = useState([]);
  const [forumId,setForumId] = useState("");
  const [forumCatName,setForumCatName] = useState("");
  const [loading, setLoading] = useState(true);



  const getforumCats = async()=>{
  
    const {data:forumCats} = await getForumCats();
    const {data:forumSubCats} = await getForumSubCats();
    setSubcats(forumSubCats);
    console.log("forumSubCats",forumSubCats);
    console.log("forumsubcats",subcats);
    setForumcats(forumCats);
    console.log(forumCats);
    setForumId(forumCats[0]._id);
    setForumCatName(forumCats[0].name);
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

  useEffect(function () {

   
    getforumCats();
    //getforumSubCats();
    loadPage();
    setLoading(false);
    console.log(subcats);
   
    
  }, []);






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
               
                  {!forumId ? <div>Loading.......</div>:
                  
              /*      subcats.filter(
                      (el) =>
                        //el.cat_id.includes(forum_cat_id) === true
                      
                        el.forum.cat_id && el.forum.cat_id === forumId
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
                    ))  */
                 <div></div>  
                  
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
