import React, { Component } from "react";
import { Link} from "react-router-dom";
import GeneralHeader from "../../components/common/GeneralHeader";
import ForumCategories from "./ForumCategories";
import {getPostsData} from './../../services/posts';
import { getForumSubCats } from './../../services/forumsubcategories';
import { getForumCats } from './../../services/forumcategories';


class ForumHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
            forumsubcats: [],
            postsResult: [],
            lastName :"",
            lastUpdated :"hi",
            forumcats:[],
            forumId: "",
            forumCatName: "",
            loading: true,
		};


	
	}



    getforumCats = async()=>{
        const {data:forumcats} = await getForumCats();
        this.setState({forumcats});
        this.setState({forumId:forumcats[0]._id});
        this.setState({forumCatName:forumCats[0].name});
      };
    
     
    
      getforumSubCats = async()=>{
      const {data:forumsubcats} = await getForumSubCats();
      this.setState({forumsubcats});
      };
    
    
      loadPage = async () => {
        const {data:apiGetPosts} = await getPostsData();
    
        if (apiGetPosts.length == 0) {
          this.setState({lastUpdated:""});
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
          this.setState({postsResult:apiGetPosts});
          this.setState({lastName:apiGetPosts[0].user.name});
          this.setState({lastUpdated:apiGetPosts[0].updatedAt});
        }
      };
    


	async componentDidMount() {
       await getforumCats();
       await getforumSubCats();
       await loadPage();
		this.setState({ loading: false });
	}











	render() {
		const { forumsubcats, forumcats, postsResult, lastName, lastUpdated, forumId, forumCatName, loading } = this.state;



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
                        
                       forumsubcats.filter(
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
	}
}

export default ForumHome;