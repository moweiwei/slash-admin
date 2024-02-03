import {
  Input,
  Select,
  Radio,
  Divider,
  InputNumber,
  Switch,
  Checkbox,
  DatePicker,
  TimePicker,
  Upload,
} from 'antd';
import { ComponentType } from 'react';

import Label from './label';
import Slider from './Slider';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

type TypeMapper = {
  [key: string]: ComponentType<any>;
};

const typeMapper: TypeMapper = {
  label: Label,
  input: Input,
  'input-number': InputNumber,
  select: Select,
  divider: Divider,
  radio: Radio,
  'radio-group': Radio.Group,
  switch: Switch,
  textarea: TextArea,
  checkbox: Checkbox,
  slider: Slider,
  'time-picker': TimePicker,
  'date-picker': DatePicker,
  'range-picker': RangePicker,
  upload: Upload,
};

export default typeMapper;
