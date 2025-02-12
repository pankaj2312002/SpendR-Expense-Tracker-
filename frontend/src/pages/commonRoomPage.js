import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LeftSlider from '../commonRoom/leftSlider';
import RoomContent from "../commonRoom/roomContent";
import { Layout, Button } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import axiosInstance from "../services/axiosInstance";
import './CommonRoomPage.css'; // External CSS for media queries

const { Sider, Content } = Layout;

const CommonRoomPage = () => {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  // mobile view dikhana hai laptop view
  const [isMobileView, setIsMobileView] = useState(false);
  // Aur agar mobile view hai toh abhi leftSlider ya roomContent
  const [showRoomContent, setShowRoomContent] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

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
    // Check for screen size to enable mobile view
    const updateView = () => setIsMobileView(window.innerWidth <= 768);
    window.addEventListener("resize", updateView);
    updateView(); // Initial check
    return () => window.removeEventListener("resize", updateView);
  }, []);

  const handleRoomSelection = (roomId) => {
    setSelectedRoomId(roomId);
    if (isMobileView) setShowRoomContent(true);
  };

  return (
    <Layout className="common" style={{ height: "90vh" }}>
      {isMobileView ? (
        !showRoomContent ? (
          <Sider width="100%" style={{ background: "#fff" }}>
            <LeftSlider
              rooms = {rooms}
              fetchUserRooms = {fetchUserRooms}
              selectedRoomId={selectedRoomId}
              setSelectedRoomId={handleRoomSelection}
            />
          </Sider>
        ) : (
          <Content style={{ width: "100%", padding: "10px" }}>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => setShowRoomContent(false)}
              style={{ marginBottom: "10px" }}
            >
              Back
            </Button>
            <RoomContent
             selectedRoomId={selectedRoomId}
             fetchUserRooms = {fetchUserRooms}
            />
          </Content>
        )
      ) : (
        // For laptop/desktop view show both Sider and Content
        <>
          <Sider width="30%" style={{ height: "100%", background: "#fff" }}>
            <LeftSlider
              rooms = {rooms}
              fetchUserRooms = {fetchUserRooms}
              selectedRoomId={selectedRoomId}
              setSelectedRoomId={setSelectedRoomId}
            />
          </Sider>
          <Content style={{ width: "70%", padding: "10px" }}>
            <RoomContent
             selectedRoomId={selectedRoomId}
             fetchUserRooms = {fetchUserRooms}
            />
          </Content>
        </>
      )}
    </Layout>
  );
};

export default CommonRoomPage;
