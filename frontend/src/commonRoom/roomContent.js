import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PlusOutlined, UserOutlined, DeleteOutlined } from "@ant-design/icons";
import OverviewModal from "./roomModals/overviewModal";
import AddTransactionModal from "./roomModals/addTransactionModal";
import AddMemberModal from "./roomModals/addMemberModal";
import Cookies from "js-cookie";
import axiosInstance from "../services/axiosInstance";
import {
  Layout,
  Card,
  Button,
  Modal,
  List,
  Row,
  Col,
  Avatar,
  Tooltip,
  Typography,
  notification,
} from "antd";

const { Content } = Layout;
const { Text } = Typography;

const RoomContent = ({ selectedRoomId , fetchUserRooms }) => {

  const user = useSelector((state) => state.auth.user);
  const userId = user._id

  const [roomInfo, setRoomInfo] = useState({
    roomName: "",
    createdOn: "",
    createdBy: "",
    adminId: "",
    members: [],
    inviteLink : "",
  });
  const [isAdmin, setIsAdmin] = useState(false); // Assume you already know if the user is Admin

  // Fetch room details including adminId
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        
        const response = await axiosInstance.get("/get-room-details", {
          params: { roomId: selectedRoomId },
        });

        if (response.data) {
          setRoomInfo({
            roomName: response.data.roomName,
            createdOn: response.data.createdOn,
            createdBy: response.data.createdBy,
            adminId: response.data.adminId,
            members: response.data.members,
            inviteLink : response.data.inviteLink
          });

          // localStorage me save , so that addMemberModal show karwate time access kar paye
          localStorage.setItem("roomName", response.data.roomName);

          // Check if the current user is the admin by comparing userId with adminId
          setIsAdmin(response.data.adminId === userId);
        }
      } catch (error) {
        notification.error({ message: "Error fetching room details" });
      }
    };

    
    if (selectedRoomId) {
      fetchRoomDetails();
    }
  }, [selectedRoomId, userId]);

  // fetch transactions of a particular room
  const [memberTransactions, setMemberTransactions] = useState([]);

  const fetchRoomTransactions = async () => {
    try {
      const response = await axiosInstance.get(
        `/common-rooms/${selectedRoomId}/getTransactions`,
        {
          params: { roomId: selectedRoomId },
        }
      );

      if (response.data) {
        setMemberTransactions(response.data.members);

        // Calculate total transactions and total amount spent
        let totalTransactions = 0;
        let totalAmountSpent = 0;
        // as merberTransactions = response.data.members
        response.data.members.forEach((member) => {
          totalTransactions += member.transactions.length;
          totalAmountSpent += member.transactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
          );
        });

        setRoomInfo((prevState) => ({
          ...prevState,
          totalTransactions,
          totalAmountSpent,
        }));
      }
    } catch (error) {
      notification.error({
        message: "Error fetching transactions of this room",
      });
    }
  };

  useEffect(() => {
    fetchRoomTransactions();
    if (selectedRoomId) {
      fetchRoomTransactions();
    }
  }, [selectedRoomId]);

  const calculateTotalAmount = (transactions) => {
    return transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  };

  // overViewModal
  const [isOverviewVisible, setIsOverviewVisible] = useState(false);

  // AddMemberModal modal
  const [isAddMemberModalVisible, setIsAddMemberModalVisible] = useState(false);

  // Function to handle adding a member
  const handleAddMember = () => {
    if (isAdmin) {
      setIsAddMemberModalVisible(true);
    } else {
      alert("Only Admin can add new members");
    }
  };

  // addTransactionModal visibility
  const [isTransactionModalVisible, setIsTransactionModalVisible] =
    useState(false);

  // Handle transaction deletion
  const handleDeleteTransaction = async (memberId, transactionId) => {
    try {
      await axiosInstance.delete(
        `/common-rooms/${selectedRoomId}/deleteTransaction`,
        {
          data: { memberId, transactionId },
        }
      );
      notification.success({ message: "Transaction deleted successfully" });

      // Update the member transactions after deletion
      setMemberTransactions((prevTransactions) =>
        prevTransactions.map((member) =>
          member.memberId === memberId
            ? {
                ...member,
                transactions: member.transactions.filter(
                  (t) => t.transactionId !== transactionId
                ),
              }
            : member
        )
      );

    // Fetch updated transactions
    fetchRoomTransactions(); 

    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to delete transaction";
      notification.error({ message: errorMsg });
    }
  };

  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      {/* top bar of content */}
      <Card
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          marginBottom: "0.2px",
          border: "1px solid rgba(0, 0, 0, 0.15)",
          borderRadius: "0",
          lineHeight: "1.2",
          backgroundColor: "#001f3d", // Navy blue background color
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Row align="middle" onClick={() => setIsOverviewVisible(true)}>
              <Avatar
                size={40}
                src="https://via.placeholder.com/40" // Placeholder image URL
                icon={<UserOutlined />}
                style={{ marginRight: "10px" }}
              />
              <Col>
                <h2
                  style={{
                    marginBottom: 0,
                    fontSize: "20px",
                    color: "#fff", // White color for room name
                    fontWeight: "bold", // Bold room name
                  }}
                >
                  {roomInfo.roomName}
                </h2>{" "}
                {/* White text for room name */}
                <div>
                  {roomInfo.members.slice(0, 3).map((member, index) => (
                    <Tooltip title={member.name} key={index}>
                      <Text style={{ fontSize: "14px", color: "#fff" }}>
                        {member.name}
                      </Text>{" "}
                      {/* White text for member names */}
                      {index < 2 && (
                        <Text style={{ fontSize: "14px", color: "#fff" }}>
                          ,{" "}
                        </Text> // Visible comma color
                      )}
                    </Tooltip>
                  ))}
                  {roomInfo.members.length > 3 && (
                    <Text style={{ fontSize: "14px", color: "#fff" }}>
                      and {roomInfo.members.length - 3} more...
                    </Text>
                  )}
                </div>
              </Col>
            </Row>
          </Col>

          {/* Button for adding new member */}
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddMember}
              style={{
                backgroundColor: "#004b87", // Navy blue button color
                color: "#ffffff", // White text color
                borderColor: "#004b87", // Matching border color
                fontWeight: "bold", // Bold font
                padding: "6px 16px", // Padding for better click area
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#005ba1")} // Lighter blue on hover
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#004b87")} // Reset hover effect
            >
              Add Member
            </Button>
          </Col>
        </Row>

        <OverviewModal
          visible={isOverviewVisible}
          onClose={() => setIsOverviewVisible(false)}
          selectedRoomId={selectedRoomId}
          roomInfo={roomInfo}
          memberTransactions = {memberTransactions}
          setMemberTransactions = {setMemberTransactions}
          fetchUserRooms = {fetchUserRooms}
        />

        <AddMemberModal
          visible={isAddMemberModalVisible}
          onClose={() => setIsAddMemberModalVisible(false)}
          selectedRoomId={selectedRoomId}
          roomInfo={roomInfo}
        />

      </Card>

      {/* cards of transactions (memberwise...) */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          border: "1px solid rgba(0, 0, 0, 0.15)",
          borderRadius: "4px",
        }}
      >
        {memberTransactions.map(
          (member, index) =>
            // Render only if member has transactions
            member.transactions.length > 0 && (
              <Card
                key={index}
                style={{
                  marginBottom: "0.2px",
                  border: "1px solid rgba(0, 0, 0, 0.15)",
                  borderRadius: "0",
                  height: "calc(100% - 60px)",
                }}
              >
                <Row justify="space-between">
                  <Col span={24}>
                    <h3 style={{ fontWeight: "bold", color: "#1890ff" }}>
                      {member.name}
                    </h3>
                  </Col>
                  <Col span={24} style={{ marginBottom: "10px" }}>
                    <Text style={{ fontWeight: "500", color: "#595959" }}>
                      Total Transactions: {member.transactions.length}
                    </Text>
                    <Text
                      style={{
                        marginLeft: "20px",
                        fontWeight: "500",
                        color: "#595959",
                      }}
                    >
                      Total Amount: ₹{calculateTotalAmount(member.transactions)}
                    </Text>
                  </Col>
                </Row>

                {/* Display transactions only if there are any */}
                <List
                  itemLayout="vertical"
                  dataSource={member.transactions}
                  renderItem={(transaction, i) => (
                    <Card
                      size="small"
                      key={i}
                      style={{
                        marginBottom: "10px",
                        backgroundColor: "#f9f9f9",
                        border: "1px solid #e0e0e0",
                        position: "relative", // Enable relative positioning for delete icon
                      }}
                    >
                      {/* Delete Icon */}
                      <Button
                        type="text"
                        icon={<DeleteOutlined style={{ color: "black" }} />}
                        onClick={() =>
                          handleDeleteTransaction(member.memberId, transaction.transactionId)
                        }
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          zIndex: 1000,
                        }}
                      />

                      {/* Transaction Details */}
                      <Row>
                        <Col span={24}>
                          <strong>Amount:</strong> ₹
                          {transaction.amount.toLocaleString()}
                        </Col>
                        <Col span={24}>
                          <strong>Description:</strong>{" "}
                          {transaction.description}
                        </Col>
                        <Col span={24}>
                          <strong>Date:</strong> {transaction.date}
                        </Col>
                      </Row>
                    </Card>
                  )}
                />
              </Card>
            )
        )}
      </div>

      {/* "+" Button for adding transactions */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{
          backgroundColor: "black",
          borderColor: "white",
          width: "55px", // Set width and height to make it square-shaped
          height: "55px",
          borderRadius: "8px", // Slightly rounded corners
          position: "absolute",
          bottom: "15px",
          right: "50px",
          zIndex: 2,
        }}
        onClick={() => setIsTransactionModalVisible(true)}
      />

      {/* Add Transaction Modal */}
      <AddTransactionModal
        visible={isTransactionModalVisible}
        onClose={() => setIsTransactionModalVisible(false)}
        selectedRoomId={selectedRoomId}
        userId={userId}
        fetchRoomTransactions = {fetchRoomTransactions}
      />
    </div>
  );
};

export default RoomContent;
