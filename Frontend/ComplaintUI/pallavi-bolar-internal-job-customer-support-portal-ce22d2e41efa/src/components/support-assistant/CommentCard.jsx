import React, { useRef, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBTextArea,
} from "mdb-react-ui-kit";
import ComplaintService from "../services/ComplaintService";
import "./CommentCard.css";

export default function CommentCard({ complaintId, existingComments }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const commentAreaRef = useRef(null);

  const handlePostComment = async () => {
    try {
      const response = await ComplaintService.addComment(complaintId, comment);
      const newComment = {
        comment: comment,
        commentDate: response.data.commentDates[0],
      };

      // Scroll to the bottom of the comment area after adding a new comment
      if (commentAreaRef.current) {
        commentAreaRef.current.scrollTop = commentAreaRef.current.scrollHeight;
      }

      setComments((prevComments) => [...prevComments, newComment]);
      setComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    return `${formattedDate} ${formattedTime}`;
  }

  return (
    <div className="gray">
      <MDBCard className="comment-card">
        <MDBCardFooter className="comment-footer">
          <p>
            <b>Comments</b>
          </p>
          <hr />
          <div className="d-flex flex-start w-100">
            <MDBTextArea
              label="Message"
              id="textAreaExample"
              rows={4}
              style={{ backgroundColor: "#fff", fontSize: "20px" }}
              wrapperClass="w-100"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="float-end mt-2 pt-1">
            <MDBBtn
              size="sm"
              className="me-1 comment-button"
              style={{ backgroundColor: "#872746" }}
              onClick={handlePostComment}
            >
              Post comment
            </MDBBtn>
          </div>
        </MDBCardFooter>
        <MDBCardBody className="comment-area" ref={commentAreaRef}>
          {existingComments.map((commentObj, index) => (
            <div key={index}>
              <div>
                <p className="text-muted small mb-0">
                  Comment Date - {formatDateTime(commentObj.commentDate)}
                </p>
              </div>
              <p className="mt-3 mb-4 pb-2">{commentObj.comment}</p>
            </div>
          ))}

          {comments.map((commentObj, index) => (
            <div key={index}>
              <div>
                <p className="text-muted small mb-0">
                  Comment Date - {formatDateTime(commentObj.commentDate)}
                </p>
              </div>
              <p className="mt-3 mb-4 pb-2">{commentObj.comment}</p>
            </div>
          ))}
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
