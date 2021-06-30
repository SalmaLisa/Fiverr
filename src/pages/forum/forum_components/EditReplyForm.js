import React, { useState } from "react"
import QuillEditor from "../postEditor/quillEditor"

const EditReplyForm = (props) => {
  const [editReply, setEditReply] = useState({ message: props.reply.message })

  const handleEdit = (content) => {
    let userEdit = content
    setEditReply({ message: userEdit })
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()

    let editReplyData = {
      postId: props.reply.postId,
      userId: props.reply.postId,
      replyId: props.reply._id,
      edited: editReply.message,
    }

    const apiReply = await fetch("/api/editReply", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editReplyData),
    }).then((result) => result.json())

    props.submitReply(e)
    props.loadPage()
  }

  const handleEditCancel = (e) => {
    props.submitReply(e)
  }

  return (
    <div class='col-lg-12 ml-2 mt-4'>
      <div class='row'>
        <form>
          <QuillEditor onEditorChange={handleEdit} value={editReply.message} />

          <br />

          <button
            class='btn btn-outline-secondary btn-sm mr-1'
            type='submit'
            onClick={handleEditSubmit}
          >
            Submit
          </button>
          <button
            class='btn btn-outline-secondary btn-sm '
            type='submit'
            onClick={handleEditCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditReplyForm
