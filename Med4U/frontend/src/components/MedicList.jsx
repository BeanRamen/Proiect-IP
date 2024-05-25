import React from "react";
import { List, Button, message } from "antd";

const MedicList = ({ medici, onDelete, loading }) => {
  const handleDelete = async (medicId) => {
    onDelete(medicId);
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={medici}
      renderItem={(medic) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              danger
              onClick={() => handleDelete(medic._id)}
              loading={loading}
            >
              Șterge
            </Button>,
          ]}
        >
          <List.Item.Meta title={medic.nume} description={medic.specializare} />
        </List.Item>
      )}
    />
  );
};

export default MedicList;
