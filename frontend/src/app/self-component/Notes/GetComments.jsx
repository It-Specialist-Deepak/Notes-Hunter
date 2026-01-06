"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../redux/slices/commentSlice";
import { FaUserCircle } from "react-icons/fa";
import DeleteCommentButton from "./DeleteCommentButton";

const CommentsSection = ({ noteId , userId , role }) => {
  const dispatch = useDispatch();

  const { comments, loading } = useSelector(
    (state) => state.comments
  );

 

  useEffect(() => {
    if (noteId) {
      dispatch(getComments(noteId));
    }
  }, [noteId, dispatch]);

  return (
    <section className="mt-3 max-w-3xl mx-auto">
      {/* Header */}
      <h2 className="text-xl font-semibold text-white mb-4">
        Comments ({comments.length})
      </h2>

      {/* Loading */}
      {loading && (
        <div className="space-y-3 mt-4  mb-5">
          {[1].map((i) => (
            <div
              key={i}
              className="h-20 rounded-xl bg-white/10 animate-pulse"
            />
          ))}
        </div>
      )}

      

      {/* Empty */}
      {!loading && comments.length === 0 && (
        <p className="text-white/60 text-sm">
          No comments yet. Be the first to comment 💬
        </p>
      )}

      {/* Comment List */}
      <div className="space-y-4">
        {comments.map((comment) => {
          const isOwner = userId === comment.user?._id;
          const isAdmin = role === "admin";
          console.log("isOwner",isOwner);
          console.log("isAdmin",isAdmin);
          return (
            <div
              key={comment._id}
              className="flex gap-4 p-4 rounded-2xl
                         bg-white/10 backdrop-blur-xl
                         border border-white/20"
            >
              {/* Avatar */}
              <FaUserCircle className="text-3xl text-teal-400 shrink-0" />

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-white font-semibold text-sm">
                        {comment.user?.name || "Anonymous"}
                      </span>

                      {comment.user?.email && (
                        <span className="text-xs text-white/50">
                          {comment.user.email}
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-white/80 text-sm leading-relaxed">
                      {comment.text}
                    </p>

                    {comment.createdAt && (
                      <p className="text-xs text-white/40 mt-1">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    )}
                  </div>

                  {/* DELETE ICON (ADMIN OR OWNER ONLY) */}
                  {(isOwner || isAdmin) && (
                    <DeleteCommentButton
                      noteId={noteId}
                      commentId={comment._id}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CommentsSection;
