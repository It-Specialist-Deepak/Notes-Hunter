"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../redux/slices/commentSlice";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";

const CommentBox = ({ noteId }) => {
    const dispatch = useDispatch();
    const { comments, loading, error } = useSelector((state) => state.comments);

    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        dispatch(addComment({ noteId, text }));
        setText("");
    };

    return (
        <div className="mt-8  rounded-2xl p-6  max-w-6xl mx-auto ">
            {/* Add Comment */}
        
           <form onSubmit={handleSubmit} className="w-full flex justify-center">
  <div
    className="flex items-center gap-2
               bg-white/10 backdrop-blur-2xl
               border border-white/20
               rounded-full
               px-3 py-2
               w-full max-w-3xl"
  >
    {/* Input */}
    <input
      type="text"
      placeholder="Write a comment..."
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="flex-1 bg-transparent outline-none
                 px-3 py-2
                 text-sm text-white
                 placeholder:text-white/60"
    />

    {/* Button */}
    <button
      type="submit"
      disabled={loading}
      className="flex items-center gap-2
                 bg-gradient-to-r from-teal-500 to-emerald-600
                 px-5 py-2.5
                 rounded-full
                 text-sm font-semibold text-white
                 shadow-lg
                 hover:opacity-90
                 disabled:opacity-60
                 transition"
    >
      <FaPaperPlane className="text-sm" />
      <span className="hidden sm:inline">
        {loading ? "Sending..." : "Send"}
      </span>
    </button>
  </div>
</form>
            {/* Error */}
            {error && <p className="text-red-400 mt-2">{error}</p>}
        </div>
    );
};

export default CommentBox;
