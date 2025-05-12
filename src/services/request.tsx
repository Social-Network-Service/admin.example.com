import axios from 'axios';
import {message} from 'antd';
import {HttpStatus, CodeEnum} from '@/enums';
import {SvgIcon} from '@/components';
import {logout} from "@/utils";

class LoadingCounter {
  private static count = 0;
  private static readonly loadingKey = 'global-loading';

  static increment(): void {
    if (this.count++ === 0) {
      message.loading({
        key: this.loadingKey,
        content: null,
        className: 'global-api-loading',
        duration: 0,
        icon: <SvgIcon name="loading" className={'icon-loading'}/>,
      });
    }
  }

  static decrement(): void {
    if (--this.count === 0) {
      message.destroy(this.loadingKey);
    }
  }
}

const instance = axios.create({
  timeout: 60 * 1000,
  withCredentials: true,
});

instance.interceptors.request.use(config => {
  return config;
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error(error);
    const txt = `${error?.name}: ${error?.message} ( ${error?.code} )`;
    message.error(txt);
  }
);

export async function request(options: any) {
  const {
    debug = false,
    loading = false,
    successNotice = false,
    errorNotice = false,
    responseAfterCallback,
    getResponse = false,
    ...config
  } = options;

  loading && LoadingCounter.increment();

  debug && console.log(`===> request: ${options.url}`, {options, config});

  try {
    const response = await instance(config);

    debug && console.log(`===> response: ${options.url}`, {response});

    responseAfterCallback && responseAfterCallback(response);

    if (response?.status === HttpStatus.OK) {
      const result = response.data;

      if (result.code === 401) {
        logout();
      }

      if (
        successNotice &&
        ((Object.hasOwn(result, 'code') && result?.code === CodeEnum.SUCCESS) ||
          (Object.hasOwn(result, 'status') && result?.status === CodeEnum.SUCCESS))
      ) {
        message.success(result?.message || result?.msg || '成功', 2);
      }

      if (
        errorNotice &&
        ((Object.hasOwn(result, 'code') && result?.code !== CodeEnum.SUCCESS) ||
          (Object.hasOwn(result, 'status') && result?.status !== CodeEnum.SUCCESS))
      ) {
        message.error(result?.message || result?.msg || '错误', 2);
      }

      return getResponse ? response : result;
    }
    return Promise.reject(response);
  } catch (error: any) {
    console.log('Request error:', error?.message);
    throw error;
  } finally {
    loading && LoadingCounter.decrement();
  }
}
