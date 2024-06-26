import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
  } from '@ant-design/icons';
  import {
    LoginForm,
    ProConfigProvider,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
    setAlpha,
  } from '@ant-design/pro-components';
  import { Space, Tabs, message, theme } from 'antd';
  import type { CSSProperties } from 'react';
  import { useState } from 'react';
  import styles from './index.module.less';
import { useMutation } from '@apollo/client';
import { loginByCode, sendCodeMsg } from '../../graphql/auth';
  
  type LoginType = 'phone' | 'account';
  interface IValue{
    tel: string;
    code: string;
  }
  
  export const Login = () => {
    const { token } = theme.useToken();
    const [loginType, setLoginType] = useState<LoginType>('phone');
  
    const iconStyles: CSSProperties = {
      marginInlineStart: '16px',
      color: setAlpha(token.colorTextBase, 0.2),
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
    };
    const [run] = useMutation(sendCodeMsg);
    const [runLoginByCode] = useMutation(loginByCode);
    const login = async ({tel,code}:IValue)=>{
      const res = await runLoginByCode({
        variables:{
            tel,
            code,
          }
      });
      // console.log(res);
      if(res.data.loginByCode === 'true'){
        message.success('登陆成功！');
      }else{
        message.error('登陆失败！');
      }
    }
  
    return (
      <ProConfigProvider hashed={false}>
        <div style={{ backgroundColor: token.colorBgContainer }} className={styles.container}>
          <LoginForm
            logo="
            http://water-drop-assest-1999.oss-ap-southeast-3.aliyuncs.com/images/1713261485988.jpg"
            title="Waterdrop"
            subTitle="好好学习，天天向上"
            onFinish={login}
          >
            <Tabs
              centered
              activeKey={loginType}
              onChange={(activeKey) => setLoginType(activeKey as LoginType)}
            >
              <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
              <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
            </Tabs>
            {loginType === 'account' && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={'prefixIcon'} />,
                  }}
                  placeholder={'用户名: admin or user'}
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名!',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                    strengthText:
                      'Password should contain numbers, letters and special characters, at least 8 characters long.',
                    statusRender: (value) => {
                      const getStatus = () => {
                        if (value && value.length > 12) {
                          return 'ok';
                        }
                        if (value && value.length > 6) {
                          return 'pass';
                        }
                        return 'poor';
                      };
                      const status = getStatus();
                      if (status === 'pass') {
                        return (
                          <div style={{ color: token.colorWarning }}>
                            强度：中
                          </div>
                        );
                      }
                      if (status === 'ok') {
                        return (
                          <div style={{ color: token.colorSuccess }}>
                            强度：强
                          </div>
                        );
                      }
                      return (
                        <div style={{ color: token.colorError }}>强度：弱</div>
                      );
                    },
                  }}
                  placeholder={'密码: ant.design'}
                  rules={[
                    {
                      required: true,
                      message: '请输入密码！',
                    },
                  ]}
                />
              </>
            )}
            {loginType === 'phone' && (
              <>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined className={'prefixIcon'} />,
                  }}
                  name="tel"
                  placeholder={'手机号'}
                  rules={[
                    {
                      required: true,
                      message: '请输入手机号！',
                    },
                    {
                      pattern: /^1\d{10}$/,
                      message: '手机号格式错误！',
                    },
                  ]}
                />
                <ProFormCaptcha
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                  }}
                  captchaProps={{
                    size: 'large',
                  }}
                  placeholder={'请输入验证码'}
                  captchaTextRender={(timing, count) => {
                    if (timing) {
                      return `${count} ${'获取验证码'}`;
                    }
                    return '获取验证码';
                  }}
                  phoneName='mobile'
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                  ]}
                  onGetCaptcha={async (tel: string) => {
                    // console.log(tel);
                    const res = await run({
                        variables:{
                            tel:'17356535701'
                        }
                    })
                    if(res.data.sendCodeMsg==='true'){
                      message.success('获取验证码成功!');
                    }else{
                      message.error('获取验证码失败');
                    }
                    // console.log('res of sendCodeMsg',res);
                  }}
                />
              </>
            )}
            <div
              style={{
                marginBlockEnd: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                忘记密码
              </a>
            </div>
          </LoginForm>
        </div>
      </ProConfigProvider>
    );
  };