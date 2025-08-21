import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ConfigProvider,
  theme,
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  message,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../styles/login/login.scss";
import Thumbnail from "../../assets/image/Thumbnail.svg";
import Logo from "../../assets/image/company.svg"

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate?.();
  const location = useLocation?.();
  const from = location?.state?.from?.pathname || "/giao-dich-phat-sinh/tai-san";

  const onFinish = async (values) => {
    try {
      const ok =
        (values.username === "demo" && values.password === "demo") ||
        (values.username === "hanhvh" && values.password === "123456");

      if (!ok) throw new Error("Sai tài khoản hoặc mật khẩu");

      if (values.remember) {
        localStorage.setItem("username", values.username);
      } else {
        localStorage.removeItem("username");
      }

      message.success("Đăng nhập thành công");
      navigate && navigate(from, { replace: true });
    } catch (e) {
      message.error(e.message || "Đăng nhập thất bại");
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#5b5bd6",
          colorBgBase: "#0f1320",
          colorBgContainer: "#171b26",
          colorBorder: "#2a3244",
          borderRadiusLG: 24,
          controlHeight: 44,
        },
      }}
    >
      <div className="login">
        <div className="login__split">
   
          <div className="login__left">
            <img src={Thumbnail} alt="thumbnail" />
          </div>

       
          <div className="login__right">
            <img className="login__logo" src={Logo} alt="brand" /> 

                <Form
                form={form}
                name="login"
                layout="vertical"
                className="login__form"  
                requiredMark={false}        
                initialValues={{
                    remember: true,
                    username: localStorage.getItem("username") || "",
                }}
                onFinish={onFinish}
                >

                <Typography.Title level={3} className="login__title">
                    Đăng nhập
                </Typography.Title>
                {/* Tài khoản */}
                <Form.Item
                    label="Tên đăng nhập"
                    name="username"
                    rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
                >
                    <Input
                    size="large"
                    placeholder="Nhập..."
                    prefix={<UserOutlined />}   
                    />
                </Form.Item>

                {/* Mật khẩu */}
                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
                >
                    <Input.Password
                    size="large"
                    placeholder="Nhập..."
                    prefix={<LockOutlined />}
                    />
                </Form.Item>

                {/* Lưu + Quên MK */}
                <div className="login__row">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Lưu</Checkbox>
                    </Form.Item>
                    <a className="link" href="#forgot">Quên mật khẩu?</a>
                </div>

                <Form.Item className="login__actions">
                    <Button type="primary" htmlType="submit" block size="large">
                    Đăng nhập
                    </Button>
                </Form.Item>


              <div className="login__links">
                <a href="#policy">Chính sách thông tin</a>
                <a href="#stk">Tra cứu STK</a>
                <a href="#support">Liên hệ hỗ trợ</a>
                <a href="#risk">Công bố rủi ro</a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Login;
