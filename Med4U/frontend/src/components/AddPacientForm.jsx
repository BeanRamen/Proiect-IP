// src/components/AddPacientForm.jsx

import React from "react";
import { Form, Input, Button } from "antd";

const AddPacientForm = ({ onSubmit, loading }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      layout="vertical"
      className="w-full max-w-md mx-auto bg-white p-4 rounded-lg shadow-md"
    >
      <Form.Item
        name="nume"
        label="Nume"
        rules={[{ required: true, message: "Introduceți numele pacientului." }]}
      >
        <Input placeholder="Introduceți numele pacientului" />
      </Form.Item>
      <Form.Item
        name="cnp"
        label="CNP"
        rules={[{ required: true, message: "Introduceți CNP-ul pacientului." }]}
      >
        <Input placeholder="Introduceți CNP-ul pacientului" />
      </Form.Item>
      <Form.Item
        name="varsta"
        label="Vârstă"
        rules={[{ required: true, message: "Introduceți vârsta pacientului." }]}
      >
        <Input placeholder="Introduceți vârsta pacientului" />
      </Form.Item>
      <Form.Item
        name="numar_telefon"
        label="Număr Telefon"
        rules={[
          {
            required: true,
            message: "Introduceți numărul de telefon al pacientului.",
          },
        ]}
      >
        <Input placeholder="Introduceți numărul de telefon al pacientului" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Introduceți email-ul pacientului." },
        ]}
      >
        <Input placeholder="Introduceți email-ul pacientului" />
      </Form.Item>
      <Form.Item
        name="adresa"
        label="Adresă"
        rules={[{ required: true, message: "Introduceți adresa pacientului." }]}
      >
        <Input placeholder="Introduceți adresa pacientului" />
      </Form.Item>
      <Form.Item
        name="loc_munca"
        label="Loc de muncă"
        rules={[
          {
            required: true,
            message: "Introduceți locul de muncă al pacientului.",
          },
        ]}
      >
        <Input placeholder="Introduceți locul de muncă al pacientului" />
      </Form.Item>
      <Form.Item
        name="specificatii"
        label="Specificații"
        rules={[
          {
            required: true,
            message: "Introduceți specificațiile pacientului.",
          },
        ]}
      >
        <Input.TextArea placeholder="Introduceți specificațiile pacientului" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Parola"
        rules={[{ required: true, message: "Introduceți parola pacientului." }]}
      >
        <Input.Password placeholder="Introduceți parola pacientului" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full bg-[#147B72] text-white"
        >
          Adaugă Pacient
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddPacientForm;
