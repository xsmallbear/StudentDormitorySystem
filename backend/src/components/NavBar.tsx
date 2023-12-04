import { useState } from "react"
import { useNavigate } from "react-router"
import "./NavBar.sass"

interface NavSubItem {
    href?: string
    text: string
}

interface NavItem {
    text: string
    subItems?: Array<NavSubItem>
}

interface props {
    title?: string
    navItems?: Array<NavItem>
}

const Navbar: React.FC<props> = ({ title, navItems }) => {
    const [itemStates, setItemStates] = useState<{ [key: number]: boolean }>({})
    const navigate = useNavigate()

    const hanldeClickSubItem = (navItem: NavSubItem, index: number) => {
        if (navItem.href) {
            navigate(navItem.href)
        }
    }

    const handleClicktitleItem = (index: number) => {
        setItemStates((prevState) => {
            const newState = { ...prevState };
            // Object.keys(newState).forEach((key) => {
            //     newState[parseInt(key)] = false;
            // });
            newState[index] = !prevState[index];
            return newState;
        });
    }

    return <div className="navbar_container">
        <div className="navbar_title">
            {title}
        </div>
        {
            navItems?.map((navItem, index) => (
                <div key={index} className="navbar_item">
                    <div className="navbar_item_title"
                        onClick={() => {
                            handleClicktitleItem(index)
                        }}
                    >
                        {navItem.text}
                    </div>
                    <div
                        className={`navbar_subitem_container ${itemStates[index] ? 'open' : ''}`}
                    >
                        {
                            navItem.subItems?.map((subItem, subIndex) =>
                                <div
                                    onClick={() => { hanldeClickSubItem(subItem, index) }}
                                    key={subIndex} className="navbar_subitem">
                                    {subItem.text}
                                </div>)
                        }
                    </div>
                </div>
            ))
        }
    </div >
}

export default Navbar