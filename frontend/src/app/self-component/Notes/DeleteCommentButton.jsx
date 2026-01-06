"use client";

import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { deleteComment } from "../../redux/slices/commentSlice";
import toast from "react-hot-toast";
const DeleteCommentButton = ({ noteId, commentId }) => {
  const dispatch = useDispatch();



const handleDelete = () => {
  toast(
    (t) => (
      <div
        className="
          w-full max-w-xm sm:max-w-sm
          flex flex-col gap-4
          animate-toast-in
        "
      >
        {/* Message */}
        <p className="text-sm sm:text-base text-gray-300 text-center">
          Delete this comment?
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="
              px-3 py-1.5 text-xs sm:text-sm rounded-md
              bg-white/10 text-gray-300
              hover:bg-white/20
              transition-all duration-200
              active:scale-95
            "
          >
            Cancel
          </button>

          <button
            onClick={() => {
              dispatch(deleteComment({ noteId, commentId }));
              toast.dismiss(t.id);
            }}
            className="
              px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md
              bg-gradient-to-r from-red-500 via-rose-500 to-pink-500
              text-white shadow-lg
              transition-all duration-200
              hover:scale-105
              active:scale-95
            "
          >
            Delete
          </button>
        </div>
      </div>
    ),
    {
      duration: 6000,
    }
  );
};


  return (
    <button
      onClick={handleDelete}
      className="text-rose-500 hover:text-red-500 transition cursor-pointer p-2 rounded-full hover:bg-red-50"
      title="Delete comment"
    >
      <FaTrash size={14} />
    </button>
  );
};

export default DeleteCommentButton;
