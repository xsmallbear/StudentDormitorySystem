import { useState } from "react"
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
    return <div className="navbar_container">
        <div className="navbar_title">
            {title}
        </div>
        {
            navItems?.map((navItem, index) => (
                <div key={index} className="navbar_item">
                    <div className="navbar_item_title"
                        onClick={() => {
                            setItemStates(p => ({ ...p, [index]: !p[index] }))
                        }}
                    >
                        {navItem.text}
                    </div>
                    <div style={{
                        display: itemStates[index] ? "block" : "none"
                    }} className="navbar_subitem_container">
                        {
                            navItem.subItems?.map((subItem, subIndex) =>
                                <div key={subIndex} className="navbar_subitem">
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