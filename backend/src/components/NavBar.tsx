import { useState } from "react"
import { useNavigate } from "react-router"
import "./NavBar.scss"

interface NavSubItem {
    href?: string
    text: string
}

interface NavItem {
    text: string
    subItems?: Array<NavSubItem>
}

interface props {
    className?: string
    title?: string
    navItems?: Array<NavItem>
}

const Navbar: React.FC<props> = ({ className, title, navItems }) => {
    const [itemStates, setItemStates] = useState<{ [index: number]: boolean }>({})
    const navigate = useNavigate()

    const hanldeClickSubItem = (navItem: NavSubItem, index: number) => {
        if (navItem.href) {
            navigate(navItem.href)
        }
    }

    const handleClicktitleItem = (index: number) => {
        setItemStates((itemStates) => {
            const newStates = { ...itemStates };
            newStates[index] = !itemStates[index];
            return newStates;
        });
    }

    return (
        <div className={`navbar_container ${className}`} >
            <div className="navbar_title">
                {title}
            </div>
            {
                navItems?.map((navItem, index) => (
                    <>
                        <div key={index} className="navbar_item" onClick={() => {
                            handleClicktitleItem(index)
                        }}>
                            {navItem.text}
                        </div>
                        <div className={`navbar_subitem_container ${itemStates[index] ? 'open' : ''}`}>
                            {
                                navItem.subItems?.map((subItem, subIndex) =>
                                    <div
                                        onClick={() => { hanldeClickSubItem(subItem, index) }}
                                        key={subIndex} className={`navbar_subitem`}>
                                        {subItem.text}
                                    </div>)
                            }
                        </div>
                    </>
                ))
            }
            <div className="navbar_item" onClick={() => {
                navigate("/")
            }}>退出登入</div>
        </div >
    )
}

export default Navbar