import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Link, connect, Dispatch } from 'umi';
import { StateType } from '@/models/login';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import LoginForm from './components/Login';

import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginForm;
interface LoginProps {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
}

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

const Login: React.FC<LoginProps> = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };
  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="User Login">
          {status === 'error' && loginType === 'account' && !submitting && (
            <LoginMessage content="Enter: admin/ant.design" />
          )}

          <UserName
            name="userName"
            placeholder="Enter admin or user"
            rules={[
              {
                required: true,
                message: 'Enter a valid username.',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="Enter test123"
            rules={[
              {
                required: true,
                message: 'Password did not match.',
              },
            ]}
          />
        </Tab>
        <Tab key="mobile" tab="Mobile Login">
          {status === 'error' && loginType === 'mobile' && !submitting && (
            <LoginMessage content="Verification code error." />
          )}
          <Mobile
            name="mobile"
            placeholder="Phone number"
            rules={[
              {
                required: true,
                message: 'Enter a valid phone number.',
              },
              {
                pattern: /^\d{10}$/,
                message: 'Enter a valid phone number.',
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="Verification code"
            countDown={120}
            getCaptchaButtonText="Verify"
            getCaptchaSecondText=""
            rules={[
              {
                required: true,
                message: 'Verification code invalid.',
              },
            ]}
          />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            Remember me
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            Forgot password?
          </a>
        </div>
        <Submit loading={submitting}>Login</Submit>
        <div className={styles.other}>
          <Link className={styles.register} to="/user/register">
            Register New Account
          </Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
