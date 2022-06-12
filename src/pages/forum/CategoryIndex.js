import React, { useEffect, useState } from "react";
import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, Breadcrumbs, } from "@material-ui/core";
//import Image from 'mui-image' module not found ( it is not even being used )
//import avatar from '../../assets/Icons/avatar.png'
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Link, useHistory } from "react-router-dom";
//import HeaderTables1 from "./HeaderTables1";
import "./CategoryIndex.css";
import { Pagination } from "@mui/material";
// import HeaderTable from './HeaderTable';
import HeaderTable2 from './HeaderTable2';

// Styles..
const useStyles = makeStyles({
  table: {
    width: '48%',
    border: "2px solid transparent",
    marginRight: '4px'
  },
  colorOrange: {
    color: "#fe7a15 !important",
  },
  container: {
    marginTop: "2rem",
    border: "none",
    display: 'flex',
  }
});

// Comments of table..
const CommentsTable = ({ categoriesData, latestData }) => {
  const [topicsData, setTopicsData] = React.useState([]);
  const history = useHistory();
  const classes = useStyles();
  const opencomment = (id) => {
    history.push(`/forum/${id}`);
    console.log(id);

  };
  const [i, setI] = useState(0)
  const tags = ["red", "pink", "yellow", "lightblue", "grey", "orange", "#6C3483", "#76D7C4", "#196F3D"]

  // Load Signaficent Amount of data..
  const loadData = (amount) => {
    if (latestData.length) {
      let newData = [];
      for (let i = 0; i < amount; i++) {
        newData.push(latestData[i]);
      }

      // Returning the UI with Data..
      return (
        <>
          { newData.length > 0 && newData.map((comment, key) => (
            <TableRow >
              <TableCell>

                <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" minHeight='40px' height='fit-content'>
                  {/* ---- Content of user and avatar ---- */}
                  <div className="d-block">
                    {/* <img src={comment.attachments[0] || "/assets/img/user/user-12.jpg"} className='avatar1' /> */}
                    <img src={`${comment.user.imageSrc}`} className='avatar1' />

                    {/* ---- Put the user First and Last name ---- */}
                    <p className='text-muted text-capitalize '>
                      <span>{comment.user.contactName.first}</span>
                      <span> </span>
                      <span>{comment.user.contactName.last}</span>
                    </p>
                  </div>

                  <Box width="90%" >
                    <div className='titre1'>{comment.title}</div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "9px",
                          height: "9px",
                          backgroundColor: tags[key % 9],
                        }}
                      ></div>
                      <span
                        style={{
                          marginLeft: ".25rem",
                          marginRight: ".5rem",
                        }}
                      >
                        {comment.narrative}
                      </span>
                    </div>
                  </Box>


                </Box>
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                <div  >
                  <div className='week1'>0</div>
                  <span className='week1'>Jun 17</span>
                </div>
              </TableCell>
            </TableRow>
          ))
          }
        </>
      );
    }
  }

  // console.log('New Topic Data -- ', topicsData);

  useEffect(() => {
    console.log("m")
  }, []);

  // Returning statement..
  return (
    <Box backgroundColor="red" className="container mt-5">

      {/* ---- Beadcrumb Container ---- */}
      <div className="breadcrumbContainer">
        <Breadcrumbs aria-label="breadcrumb">

          {/* ---- Forum ---- */}
          <Link underline="hover" className="linkStyle" onClick={() => history.push("/forum-front1/forums")} >
            <Typography color="text.primary" und >Forum</Typography>
          </Link>

          {/* ---- Category ---- */}
          <Link
            underline="hover"
            className="linkStyle"
            onClick={() => history.push("/forum-front1/forums")}
          >
            <Typography color="text.primary" und >Category</Typography>
          </Link>

          {/* ---- Topic ---- */}
          <Link
            underline="hover"
            className="linkStyle"
            onClick={() => history.push("/forum-front1/forums")}
          >
            <Typography color="text.primary" und >Topic</Typography>
          </Link>
        </Breadcrumbs>
      </div>
      { /*  <HeaderTables1 />*/}

      {/* ----- The Header Table there ----- */}
      {/* <HeaderTable /> */}
      <HeaderTable2 />

      <Box marginLeft='1%'>
        <TableContainer className={classes.container} component={Paper}  >

          {/* ---- 1st part of table ---- */}
          <Table className={classes.table}>
            <TableHead >
              <TableRow style={{ borderBottom: '3px solid lightgray', borderLeft: "none" }} >
                <TableCell width="75%" style={{ color: "#a9a9a9", fontWeight: '600', fontSize: '0.7rem' }}>Topics</TableCell>
                <TableCell align="center" style={{ color: "#a9a9a9", fontWeight: '600', fontSize: '0.7rem' }}>Latest</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {categoriesData.length > 0 && categoriesData.map((comment, index) => (
                <TableRow key={comment._id} style={{height: '452px'}}>
                  <TableCell style={{ borderLeft: `solid 7px ${comment.color}` }}>
                    <Box onClick={() => opencomment(comment._id)} >
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        style={{ cursor: "pointer" }}
                      >
                        <Typography variant="h4">{comment.name}</Typography>
                        <Typography variant="body1">{comment.description}</Typography>
                        <Box display="flex" flexDirection="row" alignItems="center">
                          {comment.forumSubcategories.map((tag, key) => (
                            <>
                              <span
                                style={{
                                  backgroundColor: tags[key % 9],
                                  width: "9px",
                                  height: "9px",
                                }}
                              ></span>
                              <span
                                style={{
                                  marginLeft: ".25rem",
                                  marginRight: ".5rem",
                                }}
                              >
                                {tag.name}
                              </span>
                            </>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell align="center" ><div style={{ color: "lightgray", fontWeight: "600" }} >1/week</div></TableCell>
                </TableRow>


              ))}


            </TableBody>
          </Table>

          {/* ----- 2nd Part of table ----- */}
          <Table className={classes.table}>
            <TableHead >
              <TableRow style={{ borderBottom: '3px solid lightgray', borderLeft: "none" }} >
                <TableCell width="80%" style={{ color: "#a9a9a9", fontWeight: '600', fontSize: '0.7rem' }}>Topics</TableCell>
                <TableCell width="5%" style={{ color: "#a9a9a9", fontWeight: '600', fontSize: '0.7rem' }}>Views</TableCell>
                <TableCell width="15%" style={{ color: "#a9a9a9", fontWeight: '600', fontSize: '0.7rem' }}>Replies</TableCell>
              </TableRow>
            </TableHead>

            {/* ---- Latest Data ---- */}
            <TableBody>
              {/* ---- Load fff */}
              {loadData(8)}
            </TableBody>
          </Table>

        </TableContainer>

        {/*--------- Pagination here --------*/}
        <div className="paginationContainer" >
          <Pagination count={4} color="primary" />
        </div>

      </Box>
    </Box>
  );
};

export default CommentsTable;
