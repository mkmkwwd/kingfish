import React, { useState, useEffect } from "react";
import "./ToolbarComponent.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import MicOffOutlinedIcon from "@mui/icons-material/MicOffOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";
import group from "../../../../assets/images/room/Group.svg";
import default_img from "@assets/images/default_profile.webp"

const ToolbarComponent = ({
  user,
  isHost,
  micStatusChanged,
  camStatusChanged,
  hostNickname,
  hostProfileImg,
  setLeaveModal,
  totalUsers,
}) => {
  const [audioActive, setAudioActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);

  useEffect(() => {
    setAudioActive(user.stream.audioActive);
  }, [user.stream.audioActive]);

  useEffect(() => {
    setVideoActive(user.stream.videoActive);
  }, [user.stream.videoActive]);

  return (
    <div className="toolbar-container">
      <div className="toolbar-host-info">
        <img src={hostProfileImg || default_img} alt="toolbar-Host profile" />
        <span>{hostNickname}</span>
      </div>
      <div className="toolbar-count-subscribers">
        <img src={group} alt="" />
        {totalUsers}
      </div>
      <div className="toolbar-option-btn">
        <CloseOutlinedIcon
          onClick={() => setLeaveModal(true)}
          className="toolbar-option-icon"
        />
        {isHost && (
          <>
            {audioActive ? (
              <MicNoneOutlinedIcon
                onClick={micStatusChanged}
                className="toolbar-option-icon"
              />
            ) : (
              <MicOffOutlinedIcon
                onClick={micStatusChanged}
                className="toolbar-option-icon"
              />
            )}

            {videoActive ? (
              <VideocamOutlinedIcon
                onClick={camStatusChanged}
                className="toolbar-option-icon"
              />
            ) : (
              <VideocamOffOutlinedIcon
                onClick={camStatusChanged}
                className="toolbar-option-icon"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ToolbarComponent;