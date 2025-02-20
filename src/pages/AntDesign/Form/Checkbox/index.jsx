import React from 'react';
import {Checkbox, Col, Row} from 'antd';

const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
};
const App = () => (
    <Checkbox.Group
        style={{
            width: '100%',
        }}
        onChange={onChange}
    >
        <Row>
            <Col span={2}>
                <Checkbox value="A">A</Checkbox>
            </Col>
            <Col span={2}>
                <Checkbox value="B">B</Checkbox>
            </Col>
            <Col span={2}>
                <Checkbox value="C">C</Checkbox>
            </Col>
            <Col span={2}>
                <Checkbox value="D">D</Checkbox>
            </Col>
            <Col span={2}>
                <Checkbox value="E">E</Checkbox>
            </Col>
        </Row>
    </Checkbox.Group>
);
export default App;