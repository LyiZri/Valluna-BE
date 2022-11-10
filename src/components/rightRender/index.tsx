// @ts-nocheck
import React, { useRef, useEffect } from 'react';
import { Avatar, Dropdown, Menu, Spin, message } from 'antd';
import { GoogleLogout } from 'react-google-login';
import { LogoutOutlined } from '@ant-design/icons';
import { ILayoutRuntimeConfig } from '../types/interface.d';
import { history } from 'umi';
import { removeUserInfo } from '@/utils/user';
import { CLIENT_ID } from '@/types/user';
import { gapi } from 'gapi-script';
export default function RightContent(
  runtimeLayout: ILayoutRuntimeConfig,
  loading: boolean,
  initialState: any,
  setInitialState: any,
) {
  if (runtimeLayout.rightRender) {
    return runtimeLayout.rightRender(initialState, setInitialState, runtimeLayout);
  }
  const googleOutRef = useRef(null);
  const logout = () => {
    console.log(123123);

    removeUserInfo();
    history.push('/user/login');
    message.success('Logout successfully');
  };
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  });
  const menu = (
    <Menu className="umi-plugin-layout-menu">
      <Menu.Item
        key="logout"
        onClick={() => {
          googleOutRef.current?.click();
        }}
      >
        <LogoutOutlined className="mr-2" />
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
      {/* <Dropdown overlay={menu} overlayClassName="umi-plugin-layout-container">
        {avatar}
      </Dropdown> */}
      <GoogleLogout
        ref={googleOutRef}
        clientId={CLIENT_ID}
        buttonText="Log Out"
        onLogoutSuccess={logout}
      ></GoogleLogout>
    </div>
  );
}
