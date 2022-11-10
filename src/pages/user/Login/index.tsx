import { userLogin } from '@/service/user';
import { message } from 'antd';
import { useEffect } from 'react';
import { history } from 'umi';
// import { FormattedMessage, history, useIntl } from 'umi';
import styles from './index.less';
import { setUserInfo } from '@/utils/user';
import { stringToMd5 } from '@/utils';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import { gapi } from 'gapi-script';
import { gmailLogin } from '@/service/user';
import { CLIENT_ID } from '@/types/user';

const Login = () => {
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  });
  // const intl = useIntl();

  const onSuccess = async (res: GoogleLoginResponse) => {
    try {
      // 登录
      /** 此方法会跳转到 redirect 参数所在的位置 */
      if (!history) return;
      const data = await gmailLogin({
        email: res?.profileObj?.email,
        idtoken: res?.tokenId,
      });
      if (data.code != 1 && !data.data.token) {
        throw Error;
      }
      const userInfo = data.data;
      setUserInfo(userInfo);
      const { query } = history.location;
      const { redirect } = query as { redirect: string };

      history.push(redirect || '/');
      message.success('Success');
      return;
      // 如果失败去设置用户错误信息
    } catch (error) {
      message.error('Login Error,Please try again');
    }
  };
  const onFailure = (err: any) => {
    console.log('failed:', err);
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div
          className="w-full h-full text-center flex justify-center"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ textAlign: 'center', fontWeight: 800 }}>
            <h1 style={{ fontSize: 60, marginTop: 200 }}>Welcome To Valluna BackEnd</h1>
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Sign in with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
