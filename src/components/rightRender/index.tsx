// @ts-nocheck
import React from 'react';
import { Avatar, Dropdown, Menu, Spin, message } from 'antd';

import { LogoutOutlined } from '@ant-design/icons';
import { ILayoutRuntimeConfig } from '../types/interface.d';
import { history } from 'umi';
import { removeUserInfo } from '@/utils/user';

export default function RightContent(
  runtimeLayout: ILayoutRuntimeConfig,
  loading: boolean,
  initialState: any,
  setInitialState: any,
) {
  if (runtimeLayout.rightRender) {
    return runtimeLayout.rightRender(initialState, setInitialState, runtimeLayout);
  }

  const logout = () => {
    removeUserInfo();
    history.push('/user/login');
    message.success('Logout successfully');
  };

  const menu = (
    <Menu className="umi-plugin-layout-menu">
      <Menu.Item key="logout" onClick={logout}>
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );

  const avatar = (
    <span className="umi-plugin-layout-action">
      <Avatar
        size="small"
        className="umi-plugin-layout-avatar"
        src={
          initialState?.avatar ||
          'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
        }
        alt="avatar"
      />
      <span className="umi-plugin-layout-name">{initialState?.name}</span>
    </span>
  );

  // if (loading) {
  //   return (
  //     <div className="umi-plugin-layout-right">
  //       <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
  //     </div>
  //   );
  // }

  return (
    <div className="umi-plugin-layout-right anticon">
      <Dropdown overlay={menu} overlayClassName="umi-plugin-layout-container">
        {avatar}
      </Dropdown>
    </div>
  );
}
