import React from "react";

const VideoCallSection = () => {
  return (
    <div className="video-section">
      <div className="video-container">
        <div className="video-placeholder">Video Consultation</div>
      </div>
      <div className="call-controls">
        <h2>Call Controls</h2>
        <div className="control-buttons">
          <button type="button" className="end-button">
            End
          </button>
          <button type="button" className="mute-button">
            Mute
          </button>
          <button type="button" className="video-button">
            Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallSection;