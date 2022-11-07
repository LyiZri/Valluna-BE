import { userLogin } from '@/service/user';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { Alert, message, Tabs } from 'antd';
import { values } from 'lodash';
import React from 'react';
import { history } from 'umi';
// import { FormattedMessage, history, useIntl } from 'umi';
import styles from './index.less';
import { setUserToken, setUserInfo } from '@/utils/user';
import { stringToMd5 } from '@/utils';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  // const intl = useIntl();

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      // 登录
      /** 此方法会跳转到 redirect 参数所在的位置 */
      console.log(values);
      console.log(stringToMd5(values.password));

      if (!history) return;
      const data = await userLogin({
        email: values.username,
        password: stringToMd5(values.password),
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

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.png" />}
          title="Valluna Back End"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
        >
          {status === 'error' && (
            <LoginMessage
              content={
                'pages.login.accountLogin.errorMessage'
                //   intl.formatMessage({
                //   id: 'pages.login.accountLogin.errorMessage',
                //   defaultMessage: '账户或密码错误(admin/ant.design)',
                // })
              }
            />
          )}
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'Please Input the username'}
              rules={[
                {
                  required: true,
                  message: 'Please Input the username',
                  // <FormattedMessage
                  //   id="pages.login.username.required"
                  //   defaultMessage="请输入用户名!"
                  // />
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'Pleas Input the Password!'}
              rules={[
                {
                  required: true,
                  message: 'Pleas Input the Password!',
                  // <FormattedMessage
                  //   id="pages.login.password.required"
                  //   defaultMessage="请输入密码！"
                  // />
                },
              ]}
            />
          </>
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              {/* <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" /> */}
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <span id="pages.login.forgotPassword">forget the password</span>
            </a>
          </div>
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
