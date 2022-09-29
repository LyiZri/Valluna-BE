// import RightContent from '@/components/RightContent';
// import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading } from '@ant-design/pro-components';
// import type { RunTimeLayoutConfig } from 'umi';
// import { history } from 'umi';
// import defaultSettings from '../config/defaultSettings';

// const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
// export async function getInitialState(): Promise<{
//   settings?: Partial<LayoutSettings>;
//   loading?: boolean;
// }> {
//   const fetchUserInfo = async () => {
//     try {
//       // const msg = await queryCurrentUser();
//       // return msg.data;
//     } catch (error) {
//       history.push(loginPath);
//     }
//     return undefined;
//   };
//   // 如果不是登录页面，执行
//   if (history.location.pathname !== loginPath) {
//     const currentUser = await fetchUserInfo();
//     return {
//       fetchUserInfo,
//       currentUser,
//       settings: defaultSettings,
//     };
//   }
//   return {
//     fetchUserInfo,
//     settings: defaultSettings,
//   };
// }

// ProLayout 支持的api https://procomponents.ant.design/components/layout
// export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
//   return {
//     rightContentRender: () => <RightContent />,
//     disableContentMargin: false,
//     waterMarkProps: {
//       content: initialState?.currentUser?.name,
//     },
//     onPageChange: () => {
//     },
//     menuHeaderRender: undefined,
//     // 自定义 403 页面
//     // unAccessible: <div>unAccessible</div>,
//     // 增加一个 loading 的状态
//     childrenRender: (children: any, props: any) => {
//       // if (initialState?.loading) return <PageLoading />;
//       return (
//         <>
//           {children}
//           {!props.location?.pathname?.includes('/login') && (
//             <SettingDrawer
//               disableUrlParams
//               enableDarkTheme
//               settings={initialState?.settings}
//               onSettingChange={(settings) => {
//                 setInitialState((preInitialState) => ({
//                   ...preInitialState,
//                   settings,
//                 }));
//               }}
//             />
//           )}
//         </>
//       );
//     },
//     ...initialState?.settings,
//   };
// };