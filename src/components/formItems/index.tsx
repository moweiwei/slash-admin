import { Form, Divider, Input, FormItemProps } from 'antd';
import { ReactNode, CSSProperties } from 'react';

import typeMapper from './typeMapper';

// Form.Item 默认绑定值属性到 value 上，而 Switch、Checkbox 等组件的值属性为 checked。通过 valuePropName 来修改绑定的值属性。
const valuePropNameMapper = {
  switch: 'checked',
  checkbox: 'checked',
  upload: 'fileList',
};

type Props = FormItemProps & {
  type?: string;
  content?: ReactNode;
  component?: ReactNode;
  hidden?: boolean;
  props?: object;
  className?: string;
  style?: CSSProperties;
  isFormItem?: boolean;
};

export function FormItem(props: Props) {
  const {
    component,
    type = 'input',
    content,
    props: componentProps,
    isFormItem = false,
    ...formItemProps
  } = props;

  // 修改绑定属性
  if (Object.keys(valuePropNameMapper).includes(type)) {
    formItemProps.valuePropName = valuePropNameMapper[type as keyof typeof valuePropNameMapper];
  }

  // 自定义控件
  if (component) return <Form.Item {...formItemProps}>{component}</Form.Item>;

  // 标签
  if (type === 'label')
    return (
      <Form.Item {...formItemProps}>
        <span className="ant-form-text">{content || '-'}</span>
      </Form.Item>
    );

  // 分割线
  if (type === 'divider') {
    return (
      <Form.Item label=" " noStyle>
        <Divider />
      </Form.Item>
    );
  }

  const Component = typeMapper[type] || Input;

  if (isFormItem) {
    const { label, name, ...rest } = formItemProps;
    return (
      <Form.Item label={label}>
        <Form.Item name={name} {...rest}>
          <Component {...componentProps} />
        </Form.Item>
      </Form.Item>
    );
  }

  return (
    <Form.Item {...formItemProps}>
      <Component {...componentProps} />
    </Form.Item>
  );
}

export default function FormItems(props: { formItems: Array<FormItemProps> }) {
  const { formItems = [] } = props;
  return (
    <>
      {formItems
        .filter(({ hidden }: FormItemProps) => !hidden)
        .map((it: FormItemProps, index: number) => (
          <FormItem key={index} {...it} />
        ))}
    </>
  );
}
