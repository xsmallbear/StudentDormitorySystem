import { Button } from "react-bootstrap";
import "./Login.sass"
import { useState } from "react"
import LoginApi from "../service/LoginAPi";

function Login() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const handlerClickLoginButton = () => {
        // const data = {
        //     userName:userName,
        //     password:password
        // }
        LoginApi.login(userName, password)
    }

    return <>
        <div className="login_container">
            <div className="login_box">
                <div className="login_item">
                    <label>用户名:</label>
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="login_item">
                    <label>密码:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="login_buttons">
                    <Button>清除</Button>
                    <Button onClick={() => {
                        handlerClickLoginButton()
                    }} >登入</Button>
                </div>
            </div>
        </div>
    </>
}

export default Login