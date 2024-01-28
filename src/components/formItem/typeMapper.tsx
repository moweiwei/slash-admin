import { Input, Select, Radio, Divider } from 'antd';
import { ComponentType } from 'react';

import Label from './label';

type TypeMapper = {
  [key: string]: ComponentType<any>;
};

const typeMapper: TypeMapper = {
  label: Label,
  input: Input,
  select: Select,
  divider: Divider,
  radio: Radio,
  // 'radio-group': RadioGroup
};

export default typeMapper;
