import React, { Component } from "react";
import { Link,useParams} from "react-router-dom";
import { Spinner } from 'react-bootstrap';
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



    async getforumCats(){
      const { forum_cat_id } = useParams();
      const { pathname, state } = useLocation();
      const forumCatName = state;
      if (pathname === "/forum") {
        
      this.setState({
        forumId:forumcats[0]._id,
        forumCatName:forumcats[0].name
      });
      }else{
        this.setState({forumId:forum_cat_id,
        forumCatName:forumCatName});
      }
     
        const {data:forumcats} = await getForumCats();
        this.setState({
          forumcats
        });
        


      };
    
     
    
      async getforumSubCats(){
      const {data:forumsubcats} = await getForumSubCats();
      this.setState({forumsubcats:forumsubcats});
      console.log("state subcats",this.state.forumsubcats);
      console.log("subcats",forumsubcats);
      this.setState({ loading: false });
      };
    
    
      async loadPage(){
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
       await this.getforumCats();
       await this.getforumSubCats();
       await this.loadPage();
  }



	render() {
		const { forumsubcats, forumcats, postsResult, lastName, lastUpdated, forumId, forumCatName, loading } = this.state;

    if (this.state.loading === true)  return   <Spinner animation="border" style={{
      width: "6rem", height: "6rem",border: "1px solid",position:"fixed",top:"50%",left:"50%"  }} />

      console.log(this.state.forumsubcats);
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
                     
                        {
                        
                  forumsubcats.filter(
                            (el) =>
                              //el.cat_id.includes(forum_cat_id) === true
                            
                              el.cat_id === forumId
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
                        updateForumCatName={(ele) => this.setState({lastName:ele})}
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