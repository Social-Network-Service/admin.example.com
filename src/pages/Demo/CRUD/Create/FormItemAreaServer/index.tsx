import {Col, Form, Row, Select} from "antd";
import React, {useState, useEffect, useMemo} from "react";

export interface AreaItem {
    [key: string]: any;
}

export interface ServerItem {
    [key: string]: any;
}

export type AreasParams = Record<string, any>;
export type ServersParams = Record<string, any>;

interface AreaServerItemProps {
    areaId?: number;
    serverId?: number;
    required?: boolean;
    clearable?: boolean;
    onChange?: (values: { [key: string]: any }) => void;
    /** 获取区域列表的方法 */
    fetchAreas: (params?: AreasParams) => Promise<{ data: AreaItem[] }>;
    /** 获取服务器列表的方法 */
    fetchServers: (params?: ServersParams) => Promise<{ data: ServerItem[] }>;
    /** Form.Item的label文本 */
    label?: string;
    /** 区域请求前的钩子函数，返回值会作为请求参数 */
    beforeFetchAreas?: () => Promise<AreasParams | void> | AreasParams | void;
    /** 服务器请求前的钩子函数，返回值会作为请求参数 */
    beforeFetchServers?: (areaId: number) => Promise<ServersParams | void> | ServersParams | void;
    /** 外部依赖项，当这些值变化时会重新获取区服数据并重置选择 */
    dependencies?: any[];
    /** 区域选项的label键名 */
    areaLabelKey?: string;
    /** 区域选项的value键名 */
    areaValueKey?: string;
    /** 服务器选项的label键名 */
    serverLabelKey?: string;
    /** 服务器选项的value键名 */
    serverValueKey?: string;
    /** 区域字段名 */
    areaFieldName?: string;
    /** 服务器字段名 */
    serverFieldName?: string;
    width?: number | string;
}

export const FormItemAreaServer: React.FC<AreaServerItemProps> = (props) => {
    const {
        width,
        areaId = null,
        serverId = null,
        required = true,
        clearable = true,
        onChange,
        fetchAreas,
        fetchServers,
        label = "区服",
        beforeFetchAreas,
        beforeFetchServers,
        dependencies = [],
        areaLabelKey = "name",
        areaValueKey = "id",
        serverLabelKey = "name",
        serverValueKey = "id",
        areaFieldName = "areaId",
        serverFieldName = "serverId"
    } = props;
    const [selectedAreaId, setSelectedAreaId] = useState(areaId);
    const [selectedServerId, setSelectedServerId] = useState(serverId);
    const [areas, setAreas] = useState<AreaItem[]>([]);
    const [servers, setServers] = useState<ServerItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingServers, setLoadingServers] = useState(false);

    // 重置选择的区服
    const resetSelection = () => {
        setSelectedAreaId(null);
        setSelectedServerId(null);
        setServers([]);
        const values: any = {
            [areaFieldName]: null,
            [serverFieldName]: null
        };
        onChange?.(values);
    };

    // 获取区域列表
    const loadAreas = async () => {
        setLoading(true);
        try {
            // 执行请求前钩子并获取参数
            const params: any = await beforeFetchAreas?.();
            const {data} = await fetchAreas(params);
            setAreas(data);
            // 如果当前选择的区域不在新的区域列表中，重置选择
            if (selectedAreaId && !data.find((area) => area[areaValueKey] === selectedAreaId)) {
                resetSelection();
            }
        } catch (error) {
            console.error("获取区域列表失败:", error);
            resetSelection();
        } finally {
            setLoading(false);
        }
    };

    // 获取服务器列表
    const loadServers = async () => {
        setLoadingServers(true);
        try {
            // 执行请求前钩子并获取参数
            const params: any = await beforeFetchServers?.(selectedAreaId);
            const {data} = await fetchServers(params);
            setServers(data);
            // 如果当前选择的服务器不在新的服务器列表中，重置服务器选择
            if (selectedServerId && !data.find((server) => server[serverValueKey] === selectedServerId)) {
                setSelectedServerId(null);
                const values: any = {
                    [areaFieldName]: selectedAreaId,
                    [serverFieldName]: null
                };
                onChange?.(values);
            }
        } catch (error) {
            console.error("获取服务器列表失败:", error);
            setSelectedServerId(null);
            const values: any = {
                [areaFieldName]: selectedAreaId,
                [serverFieldName]: null
            };
            onChange?.(values);
        } finally {
            setLoadingServers(false);
        }
    };

    // 监听外部依赖变化
    useEffect(() => {
        resetSelection();
        loadAreas();
        loadServers();
    }, [...dependencies]);

    // 监听区域变化获取服务器列表
    useEffect(() => {
        loadServers();
    }, [selectedAreaId]);

    const handleAreaChange = (value: number) => {
        setSelectedAreaId(value);
        setSelectedServerId(null);
        const values: any = {
            [areaFieldName]: value,
            [serverFieldName]: null
        };
        onChange?.(values);
    };

    const handleServerChange = (value: number) => {
        if (selectedAreaId) {
            setSelectedServerId(value);
            const values = {
                [areaFieldName]: selectedAreaId,
                [serverFieldName]: value
            };
            onChange?.(values);
        }
    };

    useEffect(() => {
        if (areaId) setSelectedAreaId(areaId);
        if (serverId) setSelectedServerId(serverId);
    }, [areaId, serverId]);

    const areaOptions = useMemo(() => {
        return areas.map((area) => ({
            label: area[areaLabelKey],
            value: area[areaValueKey]
        }));
    }, [areas, areaLabelKey, areaValueKey]);

    const serverOptions = useMemo(() => {
        return servers.map((server) => ({
            label: server[serverLabelKey],
            value: server[serverValueKey]
        }));
    }, [servers, serverLabelKey, serverValueKey]);

    const validateAreaServer = () => {
        if (!selectedAreaId || !selectedServerId) {
            return Promise.reject(new Error(`请选择${label}`));
        }
        return Promise.resolve();
    };

    return (
        <Form.Item
            className="area-server-item"
            label={label}
            name="__area_server"
            required={required}
            rules={required ? [{validator: validateAreaServer}] : undefined}
        >
            <Row gutter={12}>
                <Col span={12}>
                    <Form.Item name={areaFieldName} noStyle>
                        <Select
                            showSearch
                            value={selectedAreaId}
                            onChange={handleAreaChange}
                            placeholder={`请选择`}
                            style={{width}}
                            allowClear={clearable}
                            loading={loading}
                            disabled={loading}
                            options={areaOptions}
                            filterOption={(input, option) =>
                                (option?.label ?? "").toString().toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name={serverFieldName} noStyle>
                        <Select
                            showSearch
                            value={selectedServerId}
                            onChange={handleServerChange}
                            placeholder={`请选择`}
                            style={{width}}
                            allowClear={clearable}
                            loading={loadingServers}
                            disabled={loadingServers}
                            options={serverOptions}
                            filterOption={(input, option) =>
                                (option?.label ?? "").toString().toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form.Item>
    );
};