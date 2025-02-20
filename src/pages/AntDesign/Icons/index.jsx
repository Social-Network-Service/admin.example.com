import {
    CaretDownFilled,
    DoubleRightOutlined,
    GithubFilled,
    InfoCircleFilled,
    LogoutOutlined,
    PlusCircleFilled,
    QuestionCircleFilled,
    SearchOutlined,
} from '@ant-design/icons';
import {theme} from "antd";

export default () => {
    const {token} = theme.useToken();
    return (
        <>
            <InfoCircleFilled key="InfoCircleFilled"/>
            <br/>
            <QuestionCircleFilled key="QuestionCircleFilled"/>
            <br/>
            <GithubFilled key="GithubFilled"/>
            <br/>
            <PlusCircleFilled
                style={{
                    color: token.colorPrimary,
                    fontSize: 24,
                }}
            />
        </>
    )
}