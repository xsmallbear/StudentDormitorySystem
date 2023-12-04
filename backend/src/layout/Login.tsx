import { Button } from "react-bootstrap";
import "./Login.sass"
import { useState } from "react"

function Login() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    return <>
        <div className="login_container">
            <div className="login_box">
                <div className="login_item">
                    <label>用户名:</label>
                    <input type="text" />
                </div>
                <div className="login_item">
                    <label>密码:</label>
                    <input type="password" />
                </div>
                <div className="login_buttons">
                    <Button>清除</Button>
                    <Button>登入</Button>
                </div>
            </div>
        </div>
    </>
}

export default Login