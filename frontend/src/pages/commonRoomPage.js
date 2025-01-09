import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LeftSlider from '../commonRoom/leftSlider';
import RoomContent from "../commonRoom/roomContent";
import { Layout } from "antd";
import { jwtDecode } from 'jwt-decode'; // Assuming jwtDecode is imported correctly
import Cookies from 'js-cookie';

const { Sider, Content } = Layout;

const CommonRoomPage = () => {
  
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  // const [userId, setUserId] = useState(null);

  const user = useSelector((state) => state.auth.user);

  // Function to decode token and get userId
  // const getUserIdFromToken = () => {
  //   const token = Cookies.get('mycookie');
  //   if (token) {
  //     try {
  //       const decoded = jwtDecode(token);
  //       console.log(`Decoded value: ${decoded}`);
  //       return decoded.id; // Assuming `id` is the property containing userId
  //     } catch (error) {
  //       console.error("Failed to decode token:", error);
  //     }
  //   }
  //   return null;
  // };
  const userId = user._id;

  // useEffect(() => {
      
  // }, []); // Only runs once when component mounts

  return (
    <Layout className="common" style={{ height: "90vh" }}>
      <Sider width="30%" style={{ height: "100%", background: "#fff" }}>
        <LeftSlider
          selectedRoomId={selectedRoomId}
          setSelectedRoomId={setSelectedRoomId}
        />
      </Sider>

      <Content width="70%" style={{ height: "100%" }}>
        <RoomContent
          selectedRoomId={selectedRoomId}
        />
      </Content>
    </Layout>
  );
};

export default CommonRoomPage;
