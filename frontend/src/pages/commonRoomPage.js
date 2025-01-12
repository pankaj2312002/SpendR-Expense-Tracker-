import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LeftSlider from '../commonRoom/leftSlider';
import RoomContent from "../commonRoom/roomContent";
import { Layout, Button } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import './CommonRoomPage.css'; // External CSS for media queries

const { Sider, Content } = Layout;

const CommonRoomPage = () => {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showRoomContent, setShowRoomContent] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

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
            <RoomContent selectedRoomId={selectedRoomId} />
          </Content>
        )
      ) : (
        // For laptop/desktop view show both Sider and Content
        <>
          <Sider width="30%" style={{ height: "100%", background: "#fff" }}>
            <LeftSlider
              selectedRoomId={selectedRoomId}
              setSelectedRoomId={setSelectedRoomId}
            />
          </Sider>
          <Content style={{ width: "70%", padding: "10px" }}>
            <RoomContent selectedRoomId={selectedRoomId} />
          </Content>
        </>
      )}
    </Layout>
  );
};

export default CommonRoomPage;
