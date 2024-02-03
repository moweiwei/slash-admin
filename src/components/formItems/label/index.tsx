import { Form } from 'antd';
import { ReactNode } from 'react';

type Props = {
  content: ReactNode;
};

export default function Label({ content }: Props) {
  return (
    <Form.Item label="Plain Text">
      <span className="ant-form-text">{content}</span>
    </Form.Item>
  );
}
