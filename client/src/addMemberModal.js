import React from "react";
import { Modal, Button, message } from "antd";
import { CopyOutlined, MailOutlined, ShareAltOutlined } from "@ant-design/icons";

const AddMemberModal = ({ isLinkAvailable, setIsLinkAvailable, generatedLink, roomName }) => {
  
  // Copy link function
  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      message.success("Link copied to clipboard!");
    } else {
      message.warning("No link to copy.");
    }
  };

  // Share link via email function
  const handleShareLink = () => {
    if (generatedLink) {
      const subject = encodeURIComponent("Join my room!");
      const body = encodeURIComponent(`I've created a new room. Join here: ${generatedLink}`);
      window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
    } else {
      message.warning("No link to share.");
    }
  };

  // Share link via web (social media) function
  const handleWebShare = () => {
    if (generatedLink && navigator.share) {
      navigator.share({
        title: "Join my room!",
        text: "I've created a new room. Join here:",
        url: generatedLink,
      })
      .then(() => message.success("Link shared successfully!"))
      .catch(() => message.error("Failed to share the link."));
    } else {
      message.warning("No link to share or sharing is not supported on this device.");
    }
  };

  return (
    <Modal
      title="Room Created"
      open={isLinkAvailable}
      onCancel={() => setIsLinkAvailable(false)}
      footer={null}
    >
      <div
        style={{
          padding: "15px",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          backgroundColor: "#fafafa",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "5px",
          }}
        >
          Room Name: {roomName}
        </p>
        <p style={{ fontSize: "14px", color: "#888", marginBottom: "15px" }}>
          Invite your friends to join this room using the link below:
        </p>
        <p
          style={{
            fontSize: "16px",
            color: "#555",
            wordWrap: "break-word",
            marginBottom: "20px",
          }}
        >
          <strong>Link:</strong>
          <a
            href={generatedLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1890ff" }}
          >
            {generatedLink}
          </a>
        </p>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <Button onClick={handleCopyLink} icon={<CopyOutlined />}>
            Copy Link
          </Button>
          <Button onClick={handleShareLink} icon={<MailOutlined />}>
            Email
          </Button>
          <Button onClick={handleWebShare} icon={<ShareAltOutlined />}>
            Social Media
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddMemberModal;
