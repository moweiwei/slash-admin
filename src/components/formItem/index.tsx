import { Form, Divider, Input } from 'antd';
import { ReactNode } from 'react';

import typeMapper from './typeMapper';

type Props = {
  type?: string;
  content?: ReactNode;
  component?: ReactNode;
  props?: object;
  // className?: string;
  // style?: CSSProperties;
};

export default function FormItem(props: Props) {
  const { component, type = 'input', content, props: componentProps, ...formItemProps } = props;

  if (component) <Form.Item {...formItemProps}>{component}</Form.Item>;
  console.log('content', content);
  if (type === 'label')
    <Form.Item {...formItemProps}>
      <span className="ant-form-text">{content || '-'}</span>
    </Form.Item>;

  if (type === 'divider') {
    <Form.Item label="">
      <Divider />
    </Form.Item>;
  }

  const Component = typeMapper[type] || Input;

  return (
    <Form.Item {...formItemProps}>
      <Component {...componentProps} />
    </Form.Item>
  );
}
