import { Form, Input, InputNumber, Button } from "antd";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Register = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: "${label} este obligatoriu!",
    types: {
      email: "${label} nu este un email valid!",
      number: "${label} nu este un număr valid!",
    },
    number: {
      range: "${label} trebuie să fie între ${min} și ${max}",
    },
  };

  const { loading, error, registerUser } = useSignup();

  const onFinish = (values) => {
    console.log({ user: values.user });
    registerUser({ user: values.user });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-emerald-700 w-full max-w-xl relative">
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
        <h2 className="text-2xl font-bold mb-6 text-center">Creează cont</h2>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "nume"]}
            label="Nume"
            rules={[{ required: true }]}
          >
            <Input placeholder="Introduceti numele si prenumele" />
          </Form.Item>
          <Form.Item
            name={["user", "cnp"]}
            label="CNP"
            rules={[
              {
                required: true,
                pattern: /^[0-9]{13}$/,
                message: "CNP-ul trebuie să fie un număr de exact 13 cifre!",
              },
            ]}
          >
            <Input placeholder="Introduceti CNP-ul" />
          </Form.Item>
          <Form.Item
            name={["user", "varsta"]}
            label="Vârsta"
            rules={[{ type: "number", min: 0, max: 99, required: true }]}
          >
            <InputNumber placeholder="Introduceti vârsta" className=" w-full" />
          </Form.Item>
          <Form.Item
            name={["user", "numar_telefon"]}
            label="Telefon"
            rules={[{ required: true }]}
          >
            <Input placeholder="Introduceti numarul de telefon" />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[{ type: "email", required: true }]}
          >
            <Input placeholder="Introduceti email-ul" />
          </Form.Item>
          <Form.Item
            name={["user", "adresa"]}
            label="Adresa"
            rules={[{ required: true }]}
          >
            <Input placeholder="Introduceti adresa" />
          </Form.Item>
          <Form.Item
            name={["user", "loc_munca"]}
            label="Locul de muncă"
            rules={[{ required: true }]}
          >
            <Input placeholder="Introduceti locul de munca" />
          </Form.Item>
          <Form.Item
            name={["user", "descriere"]}
            label="Descriere"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Alergii + alte specificatii" />
          </Form.Item>
          <Form.Item
            name={["user", "password"]}
            label="Parola"
            rules={[{ required: true, min: 6 }]}
          >
            <Input.Password placeholder="Introduceti parola" />
          </Form.Item>
          <Form.Item
            name={["user", "passwordConfirm"]}
            label="Confirmare Parola"
            rules={[{ required: true, min: 6 }]}
          >
            <Input.Password placeholder="Confirmati parola" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="px-4 py-2 h-10 bg-[#147B72] text-white rounded-full shadow-md hover:bg-white hover:text-[#147B72] mb-3 w-full"
            >
              Creează cont
            </Button>
          </Form.Item>
        </Form>
        <div className="mt-4 text-center">
          <Link to="/login">
            <Button
              type="link"
              className="px-4 py-2 h-10 bg-[#147B72] text-white rounded-full shadow-md hover:bg-white hover:text-[#147B72] mb-3  w-9/12"
            >
              Autentifică-te
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
