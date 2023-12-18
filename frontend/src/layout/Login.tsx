import "./Login.scss"
import React, { useContext, useState } from "react"
import LoginAPI from "../service/LoginAPI";
import { useNavigate } from "react-router";
import { AuthContext } from '../context/AuthContext';
import { Button, Form } from "react-bootstrap";
import { error } from "console";

const Login: React.FC = () => {
    const { login } = useContext(AuthContext)!;
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handlerClickLoginButton = () => {
        LoginAPI.login(userName, password).then(response => {
            const data = response.data
            if (data) {
                if (data.status) {
                    login()
                    navigate("/home")
                }
                else {
                }
            }
        })
    }

    return <>
        <div className="mh-100 vh-100 d-flex justify-content-center flex-column align-items-center">
            <h1 className="Login_title mb-3">宿舍管理系统</h1>
            <div className="login_box">
                <fieldset>
                    <Form.Group className="mb-3">
                        <Form.Label>用户名:</Form.Label>
                        <Form.Control type="text" placeholder="请输入用户名" onChange={(e) => setUserName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>密码:</Form.Label>
                        <Form.Control type="password" placeholder="请输入密码" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <div className="d-grid">
                        <Button className="mb-3" variant="primary" onClick={() => { handlerClickLoginButton() }}>登入</Button>
                        <Button className="mb-3" variant="danger" onClick={() => { }}>注册</Button>
                    </div>
                </fieldset>
            </div>
        </div>
    </>
}

export default Login