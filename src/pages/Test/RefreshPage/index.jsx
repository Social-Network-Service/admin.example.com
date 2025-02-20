import React from 'react';
import {Button} from 'antd';
import RefreshPage from './RefreshPage'

export default () => {
    let val = parseInt(Math.random() * 100);

    const [key, setKey] = React.useState(1);

    function updateRefreshKey() {
        setKey(key + 1);
    }

    return (
        <RefreshPage key={key} updateRefreshKey={updateRefreshKey}></RefreshPage>
    )
}