import React, { useState , useEffect} from "react";
import { useSelector } from "react-redux";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import Cookies from 'js-cookie';
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

const LeftSlider = ({ selectedRoomId , setSelectedRoomId }) => {

  const user = useSelector((state) => state.auth.user);
  const userId = user._id
  // Fetching data for list of rooms
  const [rooms, setRooms] = useState([]);

  

// Function to fetch room data from the backend
const fetchUserRooms = async () => {
  try {

    if (!userId) {
      console.error("User ID not found in Redux user");
      return;
    }

    // Make API call with userId as a query parameter or in headers if necessary
    const response = await axiosInstance.get(`/dataForSlider`, {
      params: { userId }
    });

    setRooms(response.data); // Store the fetched data in the state
  } catch (error) {
    console.error("Error fetching rooms:", error);
   }
};

  useEffect(() => {
    

    // Call the function to fetch room data
    if (userId) {
      fetchUserRooms();
    }
    fetchUserRooms()
  }, []);

  // Handle room creation modal

  // isme room ka name store karwayenge , so that backend ko bheja ja sake...
  const [roomName, setRoomName] = useState("");
  // room wala modal show karwana hai ya nahi
  const [roomModal, setRoomModal] = useState(false);
  // for resetting fields of 1st Modal(form)
  const [form] = Form.useForm();
  // modal dikhana
  const newRoomClick = () => setRoomModal(true);

  // form submit karne per...
  const formSubmit = async () => {
    try {
      // Send room name to the backend to create the room and generate the link
      const response = await axiosInstance.post("/create-room", {
        roomName,
      });
      setRoomModal(false);
      form.resetFields(); // Clear form fields
      message.success("Room created successfully!");
      fetchUserRooms();
      
    } catch (error) {
      message.error("Failed to create room. Please try again.");
    }
  };


  // Render member names with ellipsis for overflow
  const renderRoomMembers = (members) => {
    const maxMembersToShow = 3;
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
          const isSelected = selectedRoomId === room.roomId;

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
              onClick={() => setSelectedRoomId(room.roomId)}
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

      
      
    </div>
  );
};

export default LeftSlider;