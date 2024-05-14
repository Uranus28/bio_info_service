import { Form, Input } from "antd";
import React from "react";
import { FC } from "react";
interface FormInputProps {
  inputType: boolean;
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  message: string;
}
export const FormInput: FC<FormInputProps> = ({
  inputType,
  label,
  name,
  message,
  value,
  onChange,
}) => {
  if (inputType) {
    return (
      <Form.Item
        label={label}
        name={name}
        rules={
          name == "email"
            ? [{ required: true, type: "email", message: message }]
            : [{ required: true, message: message }]
        }
      >
        <Input required value={value} onChange={onChange} />
      </Form.Item>
    );
  } else {
    return (
      <Form.Item
        label={label}
        name={name}
        rules={[
          { required: true, message: message },
          {
            message: "Длина пароля должна быть хотя бы 4 символа",
            min: 4,
          },
        ]}
      >
        <Input.Password
          required
          type={"password"}
          value={value}
          onChange={onChange}
        />
      </Form.Item>
    );
  }
};
