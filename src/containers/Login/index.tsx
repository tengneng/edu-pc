/* eslint-disable react-refresh/only-export-components */
import {
  LockOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Tabs, message, theme } from 'antd';
import { useMutation } from '@apollo/client';
import styles from './index.module.less';
import { LOGIN, SEND_CODE_MSG } from '@/graphql/auth';
import { AUTH_TOKEN } from '@/utils/constants';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTitle } from '@/hooks';
 
interface IValue {
  tel: string;
  code: string;
  autoLogin: boolean;
}

const Page = () => {
  const { token } = theme.useToken();
  const [run] = useMutation(SEND_CODE_MSG);
  const [login] = useMutation(LOGIN);
  const [params] = useSearchParams();
  const nav = useNavigate();

  useTitle('login');

  const loginHandler = async (values: IValue) => {
    const res = await login({
      variables: values,
    });
    if(res.data.login.code === 200) {
      if(values.autoLogin) {
        sessionStorage.setItem(AUTH_TOKEN, '');
        localStorage.setItem(AUTH_TOKEN, res.data.login.data);
      }else {
        localStorage.setItem(AUTH_TOKEN, '');
        sessionStorage.setItem(AUTH_TOKEN, res.data.login.data);
      }
      message.success(res.data.login.message);
      nav(params.get('orgUrl') || '/');
      return;
    }
    message.error(res.data.login.message);
  }
  return (
    <div className={styles.container}>
      <LoginFormPage
        initialValues={{ tel: '15620943208' }}
        onFinish={loginHandler}
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="http://water-drop-assets-tyn.oss-cn-shanghai.aliyuncs.com/images/henglogo@2x.png"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
        }}
        activityConfig={{
          style: {
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
            color: token.colorTextHeading,
            borderRadius: 8,
            backgroundColor: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(4px)',
          },
          title: '活动标题，可配置图片',
          subTitle: '活动介绍说明文字',
          action: (
            <Button
              size="large"
              style={{
                borderRadius: 20,
                background: token.colorBgElevated,
                color: token.colorPrimary,
                width: 120,
              }}
            >
              去看看
            </Button>
          ),
        }}
      >
        <Tabs centered>
          <Tabs.TabPane key={'phone'} tab={'手机号登录'} />
        </Tabs>
        <>
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: (
                <MobileOutlined
                  style={{
                    color: token.colorText,
                  }}
                  className={'prefixIcon'}
                />
              ),
            }}
            name="tel"
            placeholder={'手机号'}
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              }
            ]}
          />
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: (
                <LockOutlined
                  style={{
                    color: token.colorText,
                  }}
                  className={'prefixIcon'}
                />
              ),
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
            phoneName="tel"
            name="code"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
            onGetCaptcha={async (tel: string) => {
              const res = await run({
                variables: {
                  tel,
                }
              });
              if(res.data.sendCodeMsg.code === 200) {
                message.success(res.data.sendCodeMsg.message);
              }else {
                message.error(res.data.sendCodeMsg.message);
              }
            }}
          />
        </>
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};