import './Home.scss';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/NavBar';
import { Outlet, useNavigate } from 'react-router';

const navItems = [
  {
    text: "系统配置",
    subItems: [
      { text: "系统管理员设置", href: "managersSetting" }
    ]
  },
  {
    text: "宿舍管理",
    subItems: [
      { text: "宿舍信息一览", href: "dormitoriesList" },
      { text: "宿舍分配", href: "dormitoriesDis" }
    ]
  },
  {
    text: "学生管理",
    subItems: [
      { text: "学生个人信息", href: "studnetList" },
      { text: "院系信息管理", href: "departments" }
    ]
  },
  {
    text: "财产",
    subItems: [
      { text: "财产信息录入", href: "" },
      { text: "财产报修记录", href: "" },
      { text: "财产维护", href: "" }
    ]
  },
  {
    text: "报修",
    subItems: [
      { text: "报修信息登记", href: "" },
      { text: "维修状态跟踪", href: "" },
      { text: "报修历史查询", href: "" }
    ]
  },
  {
    text: "电费",
    subItems: [
      { text: "电费使用明细", href: "" },
      { text: "电费缴纳记录", href: "" },
      { text: "电费历史查询", href: "" }
    ]
  },
  {
    text: "访客",
    subItems: [
      { text: "访客信息登记", href: "" },
    ]
  },
]

const Home: React.FC = () => {
  const { isLogin, login, logout } = useContext(AuthContext)!;
  const navigate = useNavigate()
  return (
    <div className='app_container'>
      <Navbar title="学生宿舍管理系统" navItems={navItems} />
      <div className='context_box'>
        {/*context top nav*/}
        <div className="context_nav">
          <div className='context_userName'>
            用户名
          </div>
          <div className='contex_logout_button' onClick={() => {
            logout();
            navigate("/login")
          }}>退出</div>
        </div>
        {/*  */}
        <div className='context'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
