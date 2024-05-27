import React, { useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";

const LogoutDropdown = () => {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleMenuClick = () => {
    setOpen(false);
    logout();
  };

  const items = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleMenuClick,
    },
  ];

  return (
    <Dropdown menu={{ items }} open={open} onOpenChange={setOpen}>
      <Button
        shape="circle"
        icon={<UserOutlined />}
        className="bg-teal-500 text-white border-none hover:bg-teal-600"
      />
    </Dropdown>
  );
};

export default LogoutDropdown;
