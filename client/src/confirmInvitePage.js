import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button, Spin, Typography, notification } from "antd";
import axiosInstance from "../services/axiosInstance";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const { Title, Paragraph } = Typography;

const ConfirmInvitePage = () => {
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axiosInstance.get(`/confirmPageData/${roomId}`);
        setRoomData(response.data);
      } catch (err) {
        setError("Failed to load room details.");
      }
    };
    fetchRoomData();
  }, [roomId]);

  const handleAccept = async () => {
    try {
      // Check if user is authenticated
      const token = Cookies.get("token");
      if (!token) {
        notification.error({
          message: "Authentication Required",
          description: "You have to first login/signup.",
        });
        navigate("/login"); // Redirect to login page
        return;
      }

      // Decode token to get userId
      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      // Verify room availability
      const roomCheckResponse = await axiosInstance.get(`/checkRoomAvailability/${roomId}`);
      if (!roomCheckResponse.data.isAvailable) {
        notification.error({
          message: "Room Unavailable",
          description: "This room is no more.",
        });
        setIsModalVisible(false);
        return;
      }

      // Add user to the room
      await axiosInstance.post(`/joinRoom`, { userId, roomId });
      notification.success({
        message: "Success",
        description: "You have successfully joined the room!",
      });
      setIsModalVisible(false);
    } catch (err) {
      notification.error({
        message: "Error",
        description: "Failed to join the room.",
      });
    }
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title="Room Invitation"
      visible={isModalVisible}
      onCancel={handleClose}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          Cancel
        </Button>,
        <Button key="accept" type="primary" onClick={handleAccept}>
          Accept Invitation
        </Button>,
      ]}
    >
      {error ? (
        <Paragraph type="danger">{error}</Paragraph>
      ) : !roomData ? (
        <Spin tip="Loading room details..." />
      ) : (
        <>
          <Title level={4}>You have been invited to join the room:</Title>
          <Title level={5}>{roomData.roomName}</Title>
          <Paragraph>Admin: {roomData.adminName}</Paragraph>
        </>
      )}
    </Modal>
  );
};

export default ConfirmInvitePage;
