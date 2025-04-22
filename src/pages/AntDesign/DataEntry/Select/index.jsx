import React from 'react';
import {Select, Space} from 'antd';

export default () => {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <Space wrap>
            <Select
                defaultValue="lucy"
                style={{
                    width: 120,
                }}
                onChange={handleChange}
                options={[
                    {
                        value: 'jack',
                        label: 'Jack',
                    },
                    {
                        value: 'lucy',
                        label: 'Lucy',
                    },
                    {
                        value: 'disabled',
                        label: 'Disabled',
                        disabled: true,
                    },
                ]}
            />
            <Select
                defaultValue="lucy"
                style={{
                    width: 120,
                }}
                disabled
                options={[
                    {
                        value: 'lucy',
                        label: 'Lucy',
                    },
                ]}
            />

        </Space>
    )
}