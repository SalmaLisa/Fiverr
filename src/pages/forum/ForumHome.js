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
  // Constructor method..
  constructor(props) {
    super(props);

    // State..
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

  // Get forum categories..
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


  // Get forum sub-categories..
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


  // Calling all async functions..
  async componentDidMount() {
    await this.getforumCats();
    await this.getforumSubCats();
    await this.loadPage();
  }


  // The Render Method..
  render() {
    // Necessary States..
    const { forumsubcats, forumcats, forumId, loading } = this.state;

    console.log('Testing with ForumCats', forumcats);
    console.log('TEST - forumsubcats -> ', forumsubcats);

    if (loading) {
      return (
        <Spinner
          color="black"
          size={80}
        />
      );
    }

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
            categoriesData={forumcats}
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

export default ForumHome;