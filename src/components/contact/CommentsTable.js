import React from "react";
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import { getTopic, saveTopic } from "../../services/posts";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  colorOrange: {
    color: "#fe7a15 !important",
  },
});




const CommentsTable = ({ commentLists }) => {
  const history = useHistory()
  const opencomment = async(id) => {
    const myTopics = await getTopic(id)
    const myTopic = myTopics.data
    let views = myTopic.views
    views++
    myTopic.views = views
    await saveTopic(myTopic, myTopic.attachments);
    history.push(`/forum/topic/${id}`);
  };

  const classes = useStyles();
  console.log("Data: ", commentLists);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell width="75%">Topic</TableCell>
            <TableCell align="center">Replies</TableCell>
            <TableCell align="center">Views</TableCell>
            <TableCell align="center">Activity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commentLists.map((comment) => (
            <TableRow onClick={() => opencomment(comment?._id)}  key={comment._id}>
              <TableCell>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Box>{comment.narrative}</Box>
                  <Box>
                    <Avatar>A</Avatar>
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="center">
                <p className={classes.colorOrange}>
                  {comment.replyComments.length}
                </p>
              </TableCell>
              <TableCell align="center">
                <p className={classes.colorOrange}>{comment?.views}</p>
              </TableCell>
              <TableCell align="center">{comment?.views}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommentsTable;
