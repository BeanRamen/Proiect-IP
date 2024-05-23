import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const { error, loading, loginUser } = useLogin();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    loginUser(values);
  };

  const [placeholderText, setPlaceholderText] = useState("Introduceti CNP-ul");

  const handleUserTypeChange = (e) => {
    if (e.target.value === "pacient") {
      setPlaceholderText("Introduceti CNP-ul");
    } else if (e.target.value === "medic") {
      setPlaceholderText("Introduceti codul de parafa");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-emerald-700 w-full max-w-md">
        <Link to="/" className="absolute left-4 top-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
        <h2 className="text-2xl font-bold mb-6 text-center">Autentificare</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <div className="mb-4">
            <label
              htmlFor="userType"
              className="block text-sm font-medium text-gray-700"
            >
              Selectați tipul de utilizator:
            </label>
            <select
              id="userType"
              onChange={handleUserTypeChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#147B72] focus:border-[#147B72] sm:text-sm"
            >
              <option value="pacient">Pacient</option>
              <option value="medic">Medic</option>
            </select>
          </div>

          <Form.Item
            name="cnp"
            rules={[
              {
                required: true,
                message: `${placeholderText}!`,
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={placeholderText}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Introduceti parola!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Introduceti parola"
            />
          </Form.Item>

          <div className="mb-4 text-right">
            <Link to="/forgot-password" className="text-[#147B72] text-sm">
              Ați uitat parola?
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="px-4 py-2 h-10 bg-[#147B72] text-white rounded-full shadow-md hover:bg-white hover:text-[#147B72] mb-0 w-full"
            >
              Autentificare
            </Button>
          </Form.Item>
        </Form>

        <Link to="/register">
          <Button
            type="primary"
            htmlType="submit"
            className="px-4 py-2 h-10 bg-[#147B72] text-white rounded-full shadow-md hover:bg-white hover:text-[#147B72] mb-3 w-full"
          >
            Cont nou
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
