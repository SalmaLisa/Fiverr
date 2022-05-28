import React, { Component } from "react";
import { Link } from "react-router-dom";
import GeneralHeader from "../../components/common/GeneralHeader";
import ForumCategories from "./ForumCategories";
import { getPostsData } from './../../services/posts';
import { getForumSubCats } from './../../services/forumsubcategories';
import { getForumCats } from './../../services/forumcategories';
import { Box } from '@material-ui/core';
import ForumSubCategories from './ForumSubCategories';
import CategoryTable from './CategoryIndex';
import Spinner from '../../components/spinner';


//  --------======== DEMO DATA ========------
// commentLists..
const commentLists = [
  {
    _id: "623224e2e95cd6bca0a1ea4f",
    description: "Herbal Fromulas of TCM Files will be listed in alphabetical order",
    forumSubcategories: [
      {
        _id: "62322511e95cd6bca0a1ea5e",
        catId: "623224e2e95cd6bca0a1ea4f",
        name: "sub cat",
        status: "active",
        user: "602a51c8e01db5f4db409279"
      },
      {
        _id: "62322511e95cd6bca0a1ea5a",
        catId: "623224e2e95cd6bca0a1ea4x",
        name: "sub cat",
        status: "active",
        user: "602a51c8e01db5f4db409279"
      },
      {
        _id: "62322511e95cd6bca0a1ea5b",
        catId: "623224e2e95cd6bca0a1ea4y",
        name: "sub cat",
        status: "active",
        user: "602a51c8e01db5f4db409279"
      }
    ],
  
    name: "Accuptions",
    status: "active",
    user: {
      Address: {
        address1: "sterrebos 12",
        address2: "undefined",
        address3: "undefined",
        city: "oss",
        country: "Netherlands",
        state: "undefined",
        zip: "5344AM"
      },
      _id: "602a51c8e01db5f4db409279",
      
    }
  }, 
  {
    _id: "623224e2e95cd6bca0a1ea4f",
    description: "Herbal Fromulas of TCM Files will be listed in alphabetical order",
    forumSubcategories: [
      {
        _id: "62322511e95cd6bca0a1ea5e",
        catId: "623224e2e95cd6bca0a1ea4f",
        name: "sub cat",
        status: "active",
        user: "602a51c8e01db5f4db409279"
      },
      {
        _id: "62322511e95cd6bca0a1ea5a",
        catId: "623224e2e95cd6bca0a1ea4x",
        name: "sub cat",
        status: "active",
        user: "602a51c8e01db5f4db409279"
      },
      {
        _id: "62322511e95cd6bca0a1ea5b",
        catId: "623224e2e95cd6bca0a1ea4y",
        name: "sub cat",
        status: "active",
        user: "602a51c8e01db5f4db409279"
      }
    ],
    icon: "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoG…",
    name: "Formulas",
    status: "active",
    user: {
      Address: {
        address1: "sterrebos 12",
        address2: "undefined",
        address3: "undefined",
        city: "oss",
        country: "Netherlands",
        state: "undefined",
        zip: "5344AM"
      },
      _id: "602a51c8e01db5f4db409279",
      
    }
  }
];

// Data..
const data = [
  {
    id: 1,
    content:
      "This is category 1. Clicking on here will called CategoryTopics",
    replyComments: [{ data: "first" }, { data: "second comment" }],
    stars: [{ data: "first star" }, { data: "second Star" }],
  },
  {
    id: 2,
    content:
      "This is category 2. Clicking on here will called CategoryTopics",
    replyComments: [{ data: "first" }, { data: "second comment" }],
    stars: [{ data: "first star" }, { data: "second Star" }],
  },
  {
    id: 3,
    content:
      "This is category 3. Clicking on here will called CategoryTopics",
    replyComments: [{ data: "first" }, { data: "second comment" }],
    stars: [{ data: "first star" }, { data: "second Star" }],
  },
];

// Category Data..
const categoryData = [
  {
    id: 1,
    conent:
      "Tutorial topics that describe how to set up, configure, or install Discourse using a specific platform or environment. Topics in this category may only be created by trust level 2 and up.",
    title: "howto",
    color: "green",
    topics: 4,
    tags: [
      {
        title: "faq",
        color: "#D0232B",
      },
      {
        color: "#F15D22",
        title: "admins",
      },
    ],
  },
];

// Latest Data..
const latestData = [
  {
    id: 1,
    replies: 15,
    title: "Our default branch is main now",
    tags: [
      {
        title: "dev",
        color: "black",
      },
    ],
  },
  {
    id: 2,
    replies: 15,
    title: "Our default branch is main now",
    tags: [
      {
        title: "dev",
        color: "black",
      },
    ],
  },
  {
    id: 3,
    replies: 15,
    title: "Our default branch is main now",
    tags: [
      {
        title: "dev",
        color: "black",
      },
    ],
  },
  {
    id: 4,
    replies: 15,
    title: "Our default branch is main now",
    tags: [
      {
        title: "dev",
        color: "black",
      },
    ],
  },
];


// Component of ForumHome..
class ForumHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forumsubcats: [],
      postsResult: [],
      lastName: "",
      lastUpdated: "hi",
      forumcats: [],
      forumId: "",
      forumCatName: "",
      loading: true,
    };

    // For Demo Loading.. page.
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);

  }


  async getforumCats() {
    const { forum_cat_id } = this.props.match.params;
    const { pathname, state } = this.props.location;
    console.log("props", this.props);
    const forumCatName = state;

    const { data: forumcats } = await getForumCats();

    if (pathname === "/forum") {
      this.setState({
        forumId: forumcats[0]._id,
        forumCatName: forumcats[0].name
      });

    } else {
      this.setState({
        forumId: forum_cat_id,
        forumCatName: forumCatName
      });
    }


    this.setState({
      forumcats
    });



  };



  async getforumSubCats() {
    const { data: forumsubcats } = await getForumSubCats();

    console.log('Fetching Data forums subcates');


    // this.setState({ forumsubcats: forumsubcats });
    // console.log("state subcats", this.state.forumsubcats);
    // console.log("subcats", forumsubcats);
    // this.setState({ loading: false });
  };


  async loadPage() {
    const { data: apiGetPosts } = await getPostsData();

    if (apiGetPosts.length == 0) {
      this.setState({ lastUpdated: "" });
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
      this.setState({ postsResult: apiGetPosts });
      this.setState({ lastName: apiGetPosts[0].user.username });
      this.setState({ lastUpdated: apiGetPosts[0].updatedAt });
      console.log("postsResult", this.state.postsResult);
      console.log("state", this.state);
    }
  };



  async componentDidMount() {
    await this.getforumCats();
    await this.getforumSubCats();
    await this.loadPage();
  }


  // The Render Method..
  render() {
    const dirtoReal = false;

    console.log('ForumCats -- ', this.state.forumcats);

    const { forumsubcats, forumcats, postsResult, lastName, lastUpdated, forumId, forumCatName, loading } = this.state;

    if (this.state.loading === true) {
      return (
        <Spinner 
          color="black"
          size={80}
        />
      );
    }

    console.log(this.state.forumsubcats);

    if (dirtoReal) {
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
                      updateForumCatName={(ele) => this.setState({ lastName: ele })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      // Write your code here..
      return (
        <React.Fragment>
          {/* ----- Header ------ */}
          <div
            style={{
              backgroundColor: "#333F57",
              width: "100%",
              height: "80px",
            }}
          >
            <GeneralHeader />
          </div>

          {/* ------- Content -------- */}
          <Box>
            <CategoryTable
              commentLists={commentLists}
              latestData={latestData}
            />
          </Box>

          {/* Old Design */}
          {/* <div className="container mt-5">
            <div className="row">
              <div className=""></div>
              
              <div className="col-lg-10 mt-4">
                
                <div className="col-lg-10">
                  <ForumSubCategories />

                  <div className="mt-5">
                    <ForumCategories
                      forumcats={forumcats}
                    // updateForumCatName={(ele) => this.setState({ lastName: ele })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div> */}


        </React.Fragment>
      );


    }

  }
}

export default ForumHome;