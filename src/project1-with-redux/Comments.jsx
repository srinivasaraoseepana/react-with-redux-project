import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeComment,
  editComment,
  fetchComment,
} from "./features/CommentSlice";

const Comments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const lastCommentRef = useRef();
  const dispatch = useDispatch();
  const storeComments = useSelector((state) => state.commentsData);
  useEffect(() => {
    console.log(`store data coming and update...`, storeComments);
  }, [storeComments]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const limit = 5;
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${limit}`
      );
      if (!response.ok) throw new Error("Something went wrong");

      const result = await response.json();

      dispatch(fetchComment(result));
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("Scrolled to bottom...");
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (lastCommentRef.current) {
      observer.observe(lastCommentRef.current);
    }

    return () => {
      if (lastCommentRef.current) {
        observer.unobserve(lastCommentRef.current);
      }
    };
  }, []);

  const handleRemove = (getId) => {
    // setComments((prev) => prev.filter((cmnt) => cmnt.id !== getId));
    dispatch(removeComment(getId));
  };

  const handleEdit = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.body);
  };

  const saveEdit = () => {
    const newEdit = {
      id: editingId,
      changes: { body: editText },
    };
    dispatch(editComment(newEdit));
    setEditingId(null);
  };

  return (
    <>
      <h2>Comments</h2>
      {storeComments.data.map((comment, index) => (
        <div
          key={comment.id}
          ref={index === storeComments.data.length - 1 ? lastCommentRef : null}
          style={{ margin: "10px", padding: "10px", border: "1px solid #ccc" }}
        >
          {editingId === comment.id ? (
            <div>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={saveEdit}>Save</button>
            </div>
          ) : (
            <div>
              <h4>{comment.name}</h4>
              <p>{comment.body}</p>
              <button onClick={() => handleRemove(comment.id)}>Remove</button>
              <button onClick={() => handleEdit(comment)}>Edit</button>
            </div>
          )}
        </div>
      ))}
      {isLoading && <p>Loading more comments...</p>}
      <div
        ref={lastCommentRef}
        style={{ height: 50, backgroundColor: "#eee" }}
      />
    </>
  );
};

export default Comments;
