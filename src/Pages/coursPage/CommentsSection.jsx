import React, { useState } from 'react';

const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [repliesOpen, setRepliesOpen] = useState({});
  const [replyText, setReplyText] = useState({});
  const [replyMode, setReplyMode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [fade, setFade] = useState(true); // کنترل انیمیشن تغییر صفحه

  const commentsPerPage = 10;

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const newComment = {
      id: Date.now(),
      text: commentText,
      replies: []
    };
    setComments([newComment, ...comments]); // اضافه شدن کامنت جدید به اول لیست
    setCommentText("");
  };

  const handleAddReply = (parentId) => {
    if (!replyText[parentId]?.trim()) return;
    const updated = comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            { id: Date.now(), text: replyText[parentId] }
          ]
        };
      }
      return comment;
    });
    setComments(updated);
    setReplyText({ ...replyText, [parentId]: "" });
    setReplyMode(null);
  };

  const toggleReplies = (id) => {
    setRepliesOpen(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // صفحه‌بندی
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  // تغییر صفحه با انیمیشن نرم
  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setFade(false); // شروع انیمیشن مخفی شدن
    setTimeout(() => {
      setCurrentPage(newPage);
      setFade(true);  // نمایش مجدد با انیمیشن ظاهر شدن
    }, 300); // زمان انیمیشن با transition-duration یکی باشد
  };

  return (
    <div className="w-[100%] mt-24 text-right">

      {/* فرم ارسال نظر جدید */}
      <div className="mb-6 w-full">
        <textarea
          className="w-full p-[10px] border border-[#3073c1] outline-none rounded-md resize-none text-right text-[#111]"
          rows="3"
          placeholder=":) نظرتو در مورد دوره بگو"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="mt-2 px-4 py-1 bg-[#3073c1] text-[snow] rounded-md cursor-pointer"
        >
          ثبت
        </button>
      </div>

      {/* لیست کامنت‌ها با انیمیشن opacity */}
      <div className={`transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}>
        {currentComments.map((comment) => (
          <div key={comment.id} className="w-full mb-4 bg-transparent border border-[#3073c1] p-3 rounded-md shadow">
            <p className="mb-2">{comment.text}</p>

            <div className="flex gap-3 text-sm text-[#3073c1] cursor-pointer">
              <span onClick={() => setReplyMode(comment.id)}>Reply</span>
              <span onClick={() => toggleReplies(comment.id)}>
                {repliesOpen[comment.id] ? "Hide Replies" : "Show Replies"}
              </span>
            </div>

            {/* باکس ریپلای */}
            {replyMode === comment.id && (
              <div className="mt-2 transition-all duration-500 ease-in-out">
                <textarea
                  rows="2"
                  className="w-full p-2 border border-[#3073c1] rounded-md resize-none text-right outline-none"
                  placeholder="پاسخت چیه؟"
                  value={replyText[comment.id] || ""}
                  onChange={(e) =>
                    setReplyText({ ...replyText, [comment.id]: e.target.value })
                  }
                />
                <button
                  onClick={() => handleAddReply(comment.id)}
                  className="mt-1 px-4 py-1 bg-[#3073c1] text-white rounded-md cursor-pointer"
                >
                  ثبت پاسخ
                </button>
              </div>
            )}

            {/* ریپلای‌ها */}
            <div className={`flex flex-col gap-[10px] mt-2 border-r-2 border-[#3073c1] pr-3 w-full
                            overflow-hidden transition-all duration-1000 ease-in-out
                            ${repliesOpen[comment.id] ? "max-h-[500px]" : "max-h-0"}`}>
              {comment.replies.map((reply) => (
                <div key={reply.id} className="text-sm text-[#111] py-1 pr-[5px] border border-[#555] rounded-[5px] break-words whitespace-pre-line w-full">
                  {reply.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* دکمه‌های صفحه‌بندی */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 my-6 text-[#3073c1] font-semibold">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-[9px] py-[0px] rounded-[50%] text-[22px] border border-[#3073c1] ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            &lt;
          </button>

          <span className="px-2 text-[22px] border-b border-[#3073c1]">{currentPage}</span>

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-[9px] py-[0px] rounded-[50%] text-[22px] border border-[#3073c1] ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : " cursor-pointer"
            }`}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
