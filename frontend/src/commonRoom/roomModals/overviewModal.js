import React from "react";
import {Modal , Card , List , Typography , Avatar , Button , Row , Col , notification} from "antd";
import axiosInstance from "../../services/axiosInstance";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
const { Text, Title } = Typography;

const OverviewModal = ({ visible,onClose,selectedRoomId,roomInfo,memberTransactions, setMemberTransactions,fetchUserRooms, }) => {

  const handleDeleteRoom = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this room?");
      if (!confirmDelete) return;
  
      const response = await axiosInstance.delete(`/common-rooms/${selectedRoomId}/deleteRoom`);
  
      if (response.status === 200) {
        notification.success({
          message: "Room Deleted",
          description: "The room has been successfully deleted.",
        });
        setMemberTransactions([]);
        fetchUserRooms();
        onClose();
      }
    } catch (error) {
      console.log("🔴 Full Error Object:", error);
  
      if (error.response) {
        console.log("🔹 Error Response Data:", error.response.data);
        console.log("🔹 Error Status Code:", error.response.status);
  
        if (error.response.status === 403) {
          notification.warning({
            message: "Permission Denied",
            description: "Only the admin can delete this room.",
          });
        } else {
          notification.error({
            message: "Error",
            description: error.response.data.message || "Failed to delete the room. Please try again.",
          });
        }
      } else if (error.request) {
        console.log("🔴 Error Request Object:", error.request);
        notification.error({
          message: "Network Error",
          description: "Failed to connect to the server. Please check your connection.",
        });
      } else {
        console.log("🔴 General Error:", error.message);
        notification.error({
          message: "Error",
          description: "Something went wrong. Please try again.",
        });
      }
    }
  };
  


  const handleLeaveRoom = async () => {
    try {
      // Display confirmation dialog
      const confirm = window.confirm(
        "Are you sure you want to leave this room?"
      );
      if (confirm) {
        // Call the API to leave the room
        const response = await axiosInstance.delete(
          `/common-rooms/${selectedRoomId}/leaveRoom`
        );

        if (response.status === 200) {
          notification.success({
            message: "Success",
            description: "You have successfully left the room.",
          });
          // Close the modal and refresh the room list
          // Call the fetchUserRooms function to refresh the room list
          setMemberTransactions([...memberTransactions]); // Creates a new reference
          fetchUserRooms();
          onClose();
        }
      }
    } catch (error) {
      // Handle specific case when admin tries to leave the room
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "Admins cannot leave the room"
      ) {
        notification.info({
          message: "Admin Restriction",
          description:
            "As an admin, you cannot leave this room. You can assign another admin or delete the room.",
        });
        return; // No need to handle this as an error
      }

      // Handle other errors
      if (error.response && error.response.status === 404) {
        notification.error({
          message: "Error",
          description: "Room not found or you are not a member of this room.",
        });
      } else {
        notification.error({
          message: "Error",
          description: "Failed to leave the room. Please try again.",
        });
      }
    }
  };

  // Fallback values to prevent the toLocaleString error
  const totalAmountSpent = roomInfo.totalAmountSpent || 0;
  const formattedTotalAmount = totalAmountSpent.toLocaleString();

  return (
    <Modal
      title="Room Overview"
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={500}
    >
      {/* Room Information */}
      <Card>
        <Row align="middle" gutter={16}>
          <Col>
            <Avatar size={64} src="https://via.placeholder.com/40" />
          </Col>
          <Col>
            <Title level={4}>{roomInfo.roomName}</Title>
            <Text>Created On: {roomInfo.createdOn}</Text>
            <br />
            <Text>Created By: {roomInfo.createdBy}</Text>
          </Col>
        </Row>
      </Card>

      {/* Members Overview */}
      <Card style={{ marginTop: "10px" }}>
        <Title level={5}>Members</Title>
        <List
          dataSource={roomInfo.members}
          renderItem={(member) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={member.name}
              />
            </List.Item>
          )}
        />
        <Text>Total Members: {roomInfo.members.length}</Text>
      </Card>

      {/* Statistics */}
      <Card style={{ marginTop: "10px" }}>
        <Title level={5}>Statistics</Title>
        <Text>Total Transactions: {roomInfo.totalTransactions}</Text>
        <br />
        <Text>Total Amount Spent: ₹{formattedTotalAmount}</Text>
      </Card>

      {/* Settings/Options */}
      <Card style={{ marginTop: "10px" }}>
        <Button
          type="default"
          block
          style={{ marginTop: "5px" }}
          onClick={() => handleLeaveRoom()}
        >
          Leave Room
        </Button>
        <Button
          type="danger"
          block
          style={{ marginTop: "5px" }}
          onClick={() => handleDeleteRoom()}
        >
          Delete Room
        </Button>
      </Card>
    </Modal>
  );
};

export default OverviewModal;
