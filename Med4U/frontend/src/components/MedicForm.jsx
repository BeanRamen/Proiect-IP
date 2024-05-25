import React from "react";
import { Form, Input, Button } from "antd";

const MedicForm = ({ onSubmit, loading }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error("Error submitting medic data:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-emerald-700 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Adăugare Medic</h2>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="nume"
            label="Nume"
            rules={[
              { required: true, message: "Introduceți numele medicului." },
            ]}
          >
            <Input className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#147B72] focus:border-[#147B72] sm:text-sm" />
          </Form.Item>
          <Form.Item
            name="codParafa"
            label="Cod Parafă"
            rules={[
              { required: true, message: "Introduceți codul de parafă." },
            ]}
          >
            <Input className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#147B72] focus:border-[#147B72] sm:text-sm" />
          </Form.Item>
          <Form.Item
            name="specializare"
            label="Specializare"
            rules={[
              {
                required: true,
                message: "Introduceți specializarea medicului.",
              },
            ]}
          >
            <Input className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#147B72] focus:border-[#147B72] sm:text-sm" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Introduceți adresa de email." },
            ]}
          >
            <Input
              type="email"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#147B72] focus:border-[#147B72] sm:text-sm"
            />
          </Form.Item>
          <Form.Item
            name="numar_telefon"
            label="Număr Telefon"
            rules={[
              { required: true, message: "Introduceți numărul de telefon." },
            ]}
          >
            <Input className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#147B72] focus:border-[#147B72] sm:text-sm" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Parolă"
            rules={[{ required: true, message: "Introduceți parola." }]}
          >
            <Input.Password className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#147B72] focus:border-[#147B72] sm:text-sm" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full px-4 py-2 h-10 bg-[#147B72] text-white rounded-full shadow-md hover:bg-white hover:text-[#147B72] mb-0"
            >
              Adăugare Medic
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default MedicForm;
