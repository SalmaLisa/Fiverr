import React, { useState, useRef } from "react";
import QuillEditor from "../postEditor/quillEditor";
import {savePost} from "./../../../services/posts";
const EditPost = (props) => {
  // console.log(props.Post)
  const [editPost, setEditPost] = useState({ message: props.Post.message })

  const editThread = (content) => {
    let postEdit = content
    setEditPost({ message: postEdit })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // let editPostData = {
    //   postId: props.Post._id,
    //   userId: props.Post.userId,
    //   edited: editPost.message,
    // }

    let editPostData = {
      _id: props.Post._id,
      user: props.Post.userId,
      message: editPost.message,
      forumId: editPost.forum_id,
      threadStatus: editPost.threadStatus,
      slug: editPost.slug,
      title: editPost.title,
    }

    await savePost(editPostData);
    // const apiReply = await fetch("http://localhost:8080/api/editPost", {
    //   method: "post",
    //   headers: {
    //     Accept: "application/json, text/plain, */*",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(editPostData),
    // }).then((result) => result.json())

    props.submitForm(e)
    props.loadPage()
  }

  const handleCancel = (e) => {
    props.submitForm(e)
    e.preventDefault()
  }

  return (
    <div>
      <div class='col-lg-12 ml-2'>
        <div class='row justify-content-center'>
          {/* <div class={ alertMessage.type ? `alert alert-${alertMessage.type}` : `d-hide`} role="alert">
                        {alertMessage.message}
                    </div> */}
          <form>
            <QuillEditor onEditorChange={editThread} value={editPost.message} />
            <div className='mt-1'>
              <button
                class='btn btn-outline-secondary btn-sm mr-1'
                type='submit'
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                class='btn btn-outline-secondary btn-sm'
                type='submit'
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditPost
