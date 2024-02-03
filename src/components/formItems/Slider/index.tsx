import { Col, InputNumber, Row, Slider } from 'antd';

type Props = {
  value: number;
  onChange: (value: number | null) => void;
  min: number;
  max: number;
  step: number;
};

export default function SliderInput({ value, onChange, ...rest }: Props) {
  const { min, max, step } = rest;
  return (
    <Row>
      <Col span={12}>
        <Slider
          min={min}
          max={max}
          step={step}
          onChange={(newValue) => onChange(newValue)}
          value={typeof value === 'number' ? value : 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={min}
          max={max}
          style={{
            margin: '0 16px',
          }}
          value={value}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
}
