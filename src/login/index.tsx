import React, { useEffect, useState } from "react";
import { Row, Input, Col, Button, message } from 'antd';
import { withRouter } from "react-router-dom";
import { testLogin } from './action/index'
const Login = (props) => {
    const [username, setUserName] = useState('jgh');
    const [password, setPassword] = useState('123');

    const testLoginAction = () => {
        testLogin({ username, password }).then(res => {
            message.success('登录成功', 1, () => {
                props.history.push('/test/user');
            });
        });
    };
    return <div style={{ marginTop: 300, marginLeft: 100 }}>
        <Row>
            <Col span={3}>用户名</Col>
            <Col span={10}>
                <Input
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />
            </Col>
        </Row>

        <Row>
            <Col span={3}>密码</Col>
            <Col span={10}>
                <Input
                    value={password}
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Col>
        </Row>

        <Row>
            <Button
                type='primary'
                onClick={() => testLoginAction()}
            >登录</Button>
        </Row>
    </div>
};
export default withRouter(Login);
