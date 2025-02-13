import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axiosInstance from "../../services/axiosInstance";

const RoomCreationModal = ({  visible, onClose, fetchUserRooms }) => {

    const [roomName, setRoomName] = useState("");
    const [form] = Form.useForm();
  
    const formSubmit = async () => {
      try {
        await axiosInstance.post("/create-room", { roomName });
        message.success("Room created successfully!");
        form.resetFields();
        setRoomName(""); 
        onClose(); // Close the modal
        fetchUserRooms(); // Refresh the room list
      } catch (error) {
        message.error("Failed to create room. Please try again.");
      }
    };

  return (
    <Modal 
       title="Create New Room" 
       open={visible} 
       onCancel={onClose} 
       footer={null}
    >
      <Form 
        form={form} 
        onFinish={formSubmit}
      >

        <Form.Item name="roomName" rules={[{ required: true, message: "Please enter the room name" }]}>
          <Input placeholder="Enter room name" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Create Room</Button>
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default RoomCreationModal;
