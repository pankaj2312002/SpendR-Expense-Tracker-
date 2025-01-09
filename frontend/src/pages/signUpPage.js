import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, clearError } from "../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Alert, Typography, notification } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const { Text } = Typography;

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      // Show success notification
      notification.success({
        message: "Signup Successful",
        description: "Welcome! Your account has been created successfully.",
      });

      // Redirect to the home page after successful signup
      navigate("/");
    }
  }, [user, navigate]);

  // Handle error notifications
  useEffect(() => {
    if (error) {
      notification.error({
        message: "Signup Failed",
        description: error, // Error message from Redux
      });
    }
  }, [error]);

  const handleSignup = (values) => {
    dispatch(signupUser(values));
  };

  return (
    <div className="signup-container max-w-md mx-auto p-8 ">
      <Card
        title={<h3 className="text-center text-2xl font-semibold">Create Your Account</h3>}
        bordered={false}
        className="shadow-lg"
      >
        <Form
          name="signup"
          onFinish={handleSignup}
          initialValues={{ name, email, password }}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your name!" }              
            ]}
            className="relative mb-6"
          >
            <Input
              prefix={<UserOutlined />}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              autoComplete="off"
              className="input-tailwind"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: 'email', message: "Please enter a valid email!" }, // Valid email format check
            ]}
            className="relative mb-6"
          >
            <Input
              prefix={<MailOutlined />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="off"
              className="input-tailwind"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
            className="relative mb-6"
          >
            <Input.Password
              prefix={<LockOutlined />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input-tailwind"
            />
          </Form.Item>

          {error && <Alert message={error} type="error" showIcon className="mb-4" />}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="bg-blue-600 hover:bg-blue-700 text-white border-none"
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <Text>
            Already have an account?{" "}
            <a
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Login
            </a>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default SignUpPage;
