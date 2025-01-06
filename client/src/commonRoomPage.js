import React, { useState, useEffect } from "react";
import LeftSlider from '../commonRoom/leftSlider';
import RoomContent from "../commonRoom/roomContent";
import { Layout } from "antd";
import jwtDecode from 'jwt-decode'; // Assuming jwtDecode is imported correctly
import Cookies from 'js-cookie';

const { Sider, Content } = Layout;

const CommonRoomPage = () => {
  const [isLinkAvailable, setIsLinkAvailable] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [userId, setUserId] = useState(null);

  // Function to decode token and get userId
  const getUserIdFromToken = () => {
    const token = Cookies.get('mycookie');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(`Decoded value: ${decoded}`);
        return decoded.id; // Assuming `id` is the property containing userId
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
    return null;
  };

  useEffect(() => {
    const id = getUserIdFromToken();
    if (id) {
      setUserId(id);
      console.log(`UserId set to: ${id}`);
    }
  }, []); // Only runs once when component mounts

  return (
    <Layout className="common" style={{ height: "90vh" }}>
      <Sider width="30%" style={{ height: "100%", background: "#fff" }}>
        <LeftSlider
          isLinkAvailable={isLinkAvailable}
          setIsLinkAvailable={setIsLinkAvailable}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          userId={userId} // Pass userId to LeftSlider
        />
      </Sider>

      <Content width="70%" style={{ height: "100%" }}>
        <RoomContent
          setIsLinkAvailable={setIsLinkAvailable}
          selectedRoom={selectedRoom}
          userId={userId} // Pass userId to RoomContent
        />
      </Content>
    </Layout>
  );
};

export default CommonRoomPage;
