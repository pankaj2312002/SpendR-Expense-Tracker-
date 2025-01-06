import React, { useState, useEffect } from "react";
import { List, Button, Modal, Form, Input, Avatar, Typography, message } from "antd";
import { PlusOutlined, UserOutlined, CopyOutlined, MailOutlined, ShareAltOutlined } from "@ant-design/icons";
import axiosInstance from "../services/axiosInstance";
import Cookies from 'js-cookie';

const { Text } = Typography;

const LeftSlider = ({ isLinkAvailable, setIsLinkAvailable, selectedRoom, setSelectedRoom, userId }) => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [roomModal, setRoomModal] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [form] = Form.useForm();

  // Fetch rooms only when userId is available
  useEffect(() => {
    const fetchUserRooms = async () => {
      if (!userId) return; // Prevent fetching if userId is not available
      try {
        const response = await axiosInstance.get(`/dataForSlider`, {
          params: { userId },
        });
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        message.error("Failed to fetch rooms");
      }
    };

    // Fetch rooms only if userId is available
    if (userId) {
      fetchUserRooms();
    }
  }, [userId]); // This hook will re-run when `userId` changes

  const formSubmit = async () => {
    try {
      const response = await axiosInstance.post("/create-room", { roomName });
      const { link } = response.data;
      setGeneratedLink(link);
      setRoomModal(false);
      form.resetFields();
      setIsLinkAvailable(true);
      message.success("Room created successfully!");
    } catch (error) {
      message.error("Failed to create room.");
    }
  };

  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      message.success("Link copied to clipboard!");
    } else {
      message.warning("No link to copy.");
    }
  };

  const handleShareLink = () => {
    if (generatedLink) {
      const subject = encodeURIComponent("Join my room!");
      const body = encodeURIComponent(`I've created a new room. Join here: ${generatedLink}`);
      window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
    } else {
      message.warning("No link to share.");
    }
  };

  const handleWebShare = () => {
    if (generatedLink && navigator.share) {
      navigator
        .share({
          title: "Join my room!",
          text: "I've created a new room. Join here:",
          url: generatedLink,
        })
        .then(() => message.success("Link shared successfully!"))
        .catch((error) => message.error("Failed to share the link."));
    } else {
      message.warning("No link to share or sharing is not supported.");
    }
  };

  const renderRoomMembers = (members) => {
    const maxMembersToShow = 2;
    const displayedMembers = members.slice(0, maxMembersToShow);
    const remainingMembers = members.length - maxMembersToShow;

    return (
      <div>
        {displayedMembers.map((member, index) => (
          <Text key={index}>
            {member}
            {index < displayedMembers.length - 1 && ", "}
          </Text>
        ))}
        {remainingMembers > 0 && <Text>... and {remainingMembers} more</Text>}
      </div>
    );
  };

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={rooms}
        renderItem={(room) => {
          const isSelected = selectedRoom === room.name;

          return (
            <List.Item
              key={room.name}
              onClick={() => setSelectedRoom(room.name)}
              style={{ backgroundColor: isSelected ? "#e6f7ff" : "transparent" }}
            >
              <List.Item.Meta
                avatar={<Avatar size={40} icon={<UserOutlined />} />}
                title={<span>{room.name}</span>}
                description={renderRoomMembers(room.members)}
              />
            </List.Item>
          );
        }}
      />

      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        onClick={() => setRoomModal(true)}
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
      />

      <Modal
        title="Create New Room"
        open={roomModal}
        onCancel={() => setRoomModal(false)}
        footer={null}
      >
        <Form form={form} onFinish={formSubmit}>
          <Form.Item
            name="roomName"
            rules={[{ required: true, message: "Please enter the room name" }]}
          >
            <Input value={roomName} onChange={(e) => setRoomName(e.target.value)} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Room
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Room Created"
        open={isLinkAvailable}
        onCancel={() => setIsLinkAvailable(false)}
        footer={null}
      >
        <div>
          <p>Room Name: {roomName}</p>
          <p>
            <strong>Link:</strong> {generatedLink}
          </p>
          <Button onClick={handleCopyLink} icon={<CopyOutlined />}>Copy Link</Button>
          <Button onClick={handleShareLink} icon={<MailOutlined />}>Email</Button>
          <Button onClick={handleWebShare} icon={<ShareAltOutlined />}>Share</Button>
        </div>
      </Modal>
    </div>
  );
};

export default LeftSlider;












import React, { useState , useEffect} from "react";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import Cookies from 'js-cookie';
import {
  CopyOutlined,
  MailOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import axiosInstance from "../services/axiosInstance";
import {
  Layout,
  List,
  Button,
  Modal,
  Form,
  Input,
  Avatar,
  Typography,
  message,
} from "antd";

const { Sider } = Layout;
const { Text } = Typography;

const LeftSlider = ({isLinkAvailable , setIsLinkAvailable , selectedRoom , setSelectedRoom , userId}) => {
  // hovering / colour change ke liye...
  // const [selectedRoom, setSelectedRoom] = useState(null);
  // rooms ka dyta store karwana that will come from backend


  // Sample data for rooms with DPs and members
  const [rooms, setRooms] = useState([]);
  // Fetching data for list of rooms
  console.log(ye rahi userId in leftSlider : ${userId})


  useEffect(() => {
    // Function to fetch room data from the backend
    const fetchUserRooms = async () => {
      try {

        if (!userId) {
          console.error("User ID not found in cookies");
          return;
        }

        // Make API call with userId as a query parameter or in headers if necessary
        const response = await axiosInstance.get(/dataForSlider, {
          params: { userId }
        });

        setRooms(response.data); // Store the fetched data in the state
        console.log(aa gaya rooms ka data : ${rooms});
      } catch (error) {
        console.error("Error fetching rooms:", error);
       }
    };

    // Call the function to fetch room data
    console.log(we are printing userId   : ${userId} )
    if (userId) {
      console.log(we are printing userId before calling fetchUserRooms : ${userId} )
      fetchUserRooms();
    }
  }, []);

  // Handle room creation modal

  // isme room ka name store karwayenge , so that backend ko bheja ja sake...
  const [roomName, setRoomName] = useState("");
  // room wala modal show karwana hai ya nahi
  const [roomModal, setRoomModal] = useState(false);
  // kya Link aa gaya ... taki us basis per(Modal(2)) show karwana hai...
  // const [isLinkAvailable, setIsLinkAvailable] = useState(false);
  // jo link aayega , usko is vari me store karwa denge
  const [generatedLink, setGeneratedLink] = useState("");
  // for resetting fields of 1st Modal(form)
  const [form] = Form.useForm();
  // modal dikhana
  const newRoomClick = () => setRoomModal(true);

  // form submit karne per...
  const formSubmit = async () => {
    console.log(the form is submitted for creating Room);
    try {
      // Send room name to the backend to create the room and generate the link
      const response = await axiosInstance.post("/create-room", {
        roomName,
      });

      // Assuming the backend responds with the generated link
      const { link } = response.data;
      setGeneratedLink(link);
      setRoomModal(false);
      form.resetFields(); // Clear form fields
      setIsLinkAvailable(true);
      message.success("Room created successfully!");
      fetchUserRooms();
      
    } catch (error) {
      message.error("Failed to create room. Please try again.");
    }
  };
  // generateInvite function
  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      message.success("Link copied to clipboard!");
    } else {
      message.warning("No link to copy.");
    }
  };
  // shareLink function
  const handleShareLink = () => {
    if (generatedLink) {
      // Open the default email client with a pre-filled message
      const subject = encodeURIComponent("Join my room!");
      const body = encodeURIComponent(
        I've created a new room. Join here: ${generatedLink}
      );
      window.open(mailto:?subject=${subject}&body=${body}, "_blank");
    } else {
      message.warning("No link to share.");
    }
  };
  // handle webShare (sharing link through social media apps)
  const handleWebShare = () => {
    if (generatedLink && navigator.share) {
      navigator
        .share({
          title: "Join my room!",
          text: "I've created a new room. Join here:",
          url: generatedLink,
        })
        .then(() => message.success("Link shared successfully!"))
        .catch((error) => message.error("Failed to share the link."));
    } else {
      message.warning(
        "No link to share or sharing is not supported on this device."
      );
    }
  };

  // Render member names with ellipsis for overflow
  const renderRoomMembers = (members) => {
    const maxMembersToShow = 2;
    const displayedMembers = members.slice(0, maxMembersToShow);
    const remainingMembers = members.length - maxMembersToShow;

    return (
      <div>
        {displayedMembers.map((member, index) => (
          <Text key={index}>
            {member}
            {index < displayedMembers.length - 1 && ", "}
          </Text>
        ))}
        {remainingMembers > 0 && <Text>... and {remainingMembers} more</Text>}
      </div>
    );
  };

  return (
    <div style={{ overflow: "auto" }}>
      {/* Sidebar - Room List */}

      <List
        itemLayout="horizontal"
        dataSource={rooms}
        renderItem={(room) => {
          const isSelected = selectedRoom === room.name;

          return (
            <List.Item
              key={room.name}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 15px",
                cursor: "pointer",
                backgroundColor: isSelected ? "#e6f7ff" : "transparent",
                border: isSelected ? "1px solid #1890ff" : "none",
                borderRadius: isSelected ? "10px" : "0",
                transition:
                  "background-color 0.3s, border 0.3s, border-radius 0.3s",
              }}
              onClick={() => setSelectedRoom(room.name)}
            >
              <List.Item.Meta
                avatar={
                  <Avatar size={40} src={"https://via.placeholder.com/40"} icon={<UserOutlined />} />
                }
                title={
                  <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                    {room.name}
                  </span>
                }
                description={
                  <div
                    style={{
                      fontSize: "12px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {renderRoomMembers(room.members)}
                  </div>
                }
              />
            </List.Item>
          );
        }}
        style={{
          maxHeight: "calc(100vh - 60px)",
          overflowY: "auto",
          paddingRight: "10px",
        }}
      />

      {/* "+" Button for New Room Creation */}
      <Button
        type="primary"
        shape="circle"
        size="large"
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 10,
          width: "60px",
          height: "60px",
          fontSize: "28px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
        }}
        onClick={newRoomClick}
      >
        +
      </Button>

      {/* Modal for Room Creation */}
      <Modal
        title="Create New Room"
        open={roomModal}
        onCancel={() => setRoomModal(false)}
        footer={null}
      >
        <Form form={form} onFinish={formSubmit}>
          <Form.Item
            name="roomName"
            rules={[{ required: true, message: "Please enter the room name" }]}
          >
            <Input
              placeholder="Enter room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Room
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for showing options of sharing link */}
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
            <a href={generatedLink} target="_blank" rel="noopener noreferrer" style={{ color: "#1890ff" }}>
              {generatedLink}
            </a>
          </p>

          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
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
    </div>
  );
};

export default LeftSlider;