import { ReactNode, createContext, useState } from "react"

interface AuthProviderProps {
    children: ReactNode
}

interface AuthContextProps {
    isLogin: boolean
    login: () => void
    logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false)

    const login = () => {
        setIsLogin(true);
    }
    const logout = () => {
        setIsLogin(false)
    }

    return (
        <AuthContext.Provider value={{ isLogin, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }