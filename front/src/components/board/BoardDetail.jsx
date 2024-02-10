import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BoardFormItem from "./BoardFormItem";
import you from "../../assets/images/공유.jpg";
import "../../assets/styles/board/BoardDetail.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import Header from "../Header";
import { getBoardDetail, deleteBoardPost } from "../../api/board";

const BoardDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    await getBoardDetail(id).then((res) => setBoardData(res));
  };

  const deletePost = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      await deleteBoardPost(id).then((res) => {
        alert("삭제되었습니다.");
        navigate("/media/board");
      });
    }
  };

  const changeDate = (date) => {
    const start = date + "";
    const day = start.substring(0, 10);
    const time = start.substring(11, 16);
    console.log(day);
    return day + " " + time;
  };

  return (
    <>
      <Header />
      {boardData && (
        <>
          <div className="board-detail-area">
            <div className="board-detail-item">
              <div className="board-title">
                <img
                  className="board-detail-profile"
                  src={boardData.profileImageUrl}
                  alt="프로필"
                />
                <div className="board-nickname">{boardData.nickName}</div>
                <div className="like-area">
                  <FavoriteBorderIcon />
                  <div>{boardData.likeCnt}</div>
                </div>
              </div>
              <img
                className="board-content-img"
                src={boardData.boardImageUrl}
                alt=""
              />
              <div className="board-text">{boardData.content}</div>
              <div className="board-hashtag-area">
                {boardData.hashtags && (
                  <>
                    {boardData.hashtags.map((tag, index) => (
                      <div className="blue-fc" key={index}>
                        <div>{tag}</div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="btn-area">
                <div className="btn-modify bg-blue">수정</div>
                <div
                  className="btn-delete bg-blue"
                  onClick={() => deletePost()}
                >
                  삭제
                </div>
              </div>
            </div>
            <div className="line bg-blue"></div>
            <div className="board-detail-item">
              <div className="board-place">Place Info</div>

              <div className="board-map"></div>
            </div>
            <div className="line bg-blue"></div>
            <div className="reply-area">
              <div className="reply-title">
                <div>댓글</div>

                <div className="blue-fc">{boardData.commentCnt}</div>
              </div>
              <div className="reply-line bg-blue"></div>
              <div className="reply-list">
                {boardData.comments && (
                  <>
                    {boardData.comments.map((comment, index) => (
                      <div className="reply" key={index}>
                        <img src={comment.profileImageUrl} alt="" />
                        <div>{comment.nickName}</div>
                        <div>{changeDate(comment.createdAt)}</div>
                        <div>{comment.content}</div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="reply-add">
            <div className="reply-line bg-blue"></div>
            <img src={you} alt="" />
            <div className="reply-add-area">
              <input type="text" placeholder="댓글작성하기" />
              <div className="send-reply bg-blue">
                <SendIcon />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BoardDetail;
