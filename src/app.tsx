// import RightContent from '@/components/RightContent';
// import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading } from '@ant-design/pro-components';
import { message } from 'antd';
import { RequestConfig } from 'umi';
import { history } from 'umi';
import { extend } from 'umi-request';
export const initialStateConfig = {
  loading: <PageLoading />,
};

export const request: RequestConfig = {
  // 统一的请求设定
  timeout: 15000,
  // headers: {
  //   'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json',
  // },
  // 响应拦截器
  responseInterceptors: [
    async (response, req) => {
      // 拦截响应数据，进行个性化处理
      const data = await response.clone().json();
      if (data.code != 1 && data.code != 200) {
        message.error(data.msg);
      }
      return response;
    },
  ],
};
