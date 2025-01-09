import React, { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Card,
  Typography,
  Space,
  Alert,
  notification,
} from "antd";

const { Title, Text } = Typography;

const LoginPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false); // Track form validity
  const { error, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogin = (values) => {
    dispatch(loginUser(values));
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      // Show success notification
      notification.success({
        message: "Login Successful",
        description: "Welcome back! You have logged in successfully.",
      });

      // Redirect to the home page
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-96 rounded-lg shadow-lg">
        <Space direction="vertical" size="large" className="w-full">
          <div className="text-center">
            <Title level={3}>Welcome Back</Title>
            <Text className="text-gray-500">Log in to your account</Text>
          </div>

          {error && (
            <Alert
              message="Login Failed"
              description={error.message || error} // Safely access the message
              type="error"
              showIcon
              closable
            />
          )}

          <Form
            form={form}
            layout="vertical"
            onFinish={handleLogin}
            initialValues={{ email: "", password: "" }}
            onFieldsChange={(_, allFields) => {
              setIsFormValid(
                allFields.every((field) => field.errors.length === 0)
              );
            }}
          >
            {/* Email Field */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" }, // Required field validation
                { type: "email", message: "Please enter a valid email" }, // Email format validation
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" }, // Required field validation
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            {/* Login Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                disabled={!isFormValid} // Button disabled until form is valid
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center">
            <Text>
              Don't have an account?{" "}
              <a
                onClick={() => navigate("/signup")}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Sign Up
              </a>
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default LoginPage;
