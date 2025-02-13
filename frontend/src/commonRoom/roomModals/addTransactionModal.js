import React, { useState } from "react";
import { Modal, Form, Input, Button, DatePicker, message } from "antd";
import axiosInstance from "../../services/axiosInstance";

const AddTransactionModal = ({ visible, onClose, selectedRoomId,  fetchRoomTransactions  }) => {
  const [form] = Form.useForm();


  const handleFinish = async (values) => {

    const { amount, description, date } = values;

    try {
      const response = await axiosInstance.post("/common-room/add-transaction", {
        amount,
        description,
        roomId: selectedRoomId, // Passed programmatically
        date: date ? date.toISOString() : undefined, // Optional field
      });
      // fetch fresh transactions
      fetchRoomTransactions();
      message.success("Transaction added successfully!");
      form.resetFields();
      onClose(); // Close modal on success
    } catch (error) {
      console.error("Error adding transaction:", error);
      message.error(error.response?.data?.message || "Failed to add transaction.");
    } 
  };

  return (
    <Modal
      title="Add Transaction"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ amount: "", description: "", date: null }}
      >
        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please enter the amount" }]}
        >
          <Input type="number" placeholder="Enter amount" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ max: 200, message: "Description cannot exceed 200 characters" }]}
        >
          <Input.TextArea placeholder="Enter description (optional)" />
        </Form.Item>

        <Form.Item label="Date" name="date">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit"  block>
            Add Transaction
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTransactionModal;
