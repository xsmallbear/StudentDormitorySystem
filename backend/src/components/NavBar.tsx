import "./NavBar.css"

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
    return <>
        <div className="navbar_container">
            <div className="navbar_title">
                {title}
            </div>
            {
                navItems?.map(navItem => <div className="navbar_item">
                    <div className="navbar_item_title">{navItem.text}</div>
                    <div className="navbar_subitem_container">
                        {
                            navItem.subItems?.map(subItem =>
                                <div className="navbar_subitem">
                                    {subItem.text}
                                </div>)
                        }
                    </div>
                </div>)
            }
        </div>
    </>
}

export default Navbar