import React, { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'

const NotificationCom: React.FC<{ message: string }> = ({ message }) => {
    const divRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const div = divRef.current as HTMLDivElement
        const width = window.getComputedStyle(div).width.replaceAll("px", "");
        console.log(width)
        div.style.left = `calc(50% - ${Number(width) / 2}px)`
    }, [])

    return (
        <>
            <div ref={divRef} className="notification" style={{
                backgroundColor: "white",
                color: "#1864ab",
                position: "fixed",
                padding: "10px 50px",
                border: "2px solid #74c0fc",
                borderRadius: "4px",
                top: "20px",
                zIndex: "114514",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <div>{message}</div>
            </div>
        </>
    )
}

const Notification = (message: string, showTime: number = 2000) => {
    const div = document.createElement("div")
    document.body.appendChild(div)

    const root = createRoot(div)
    root.render(<NotificationCom message={message} />)

    setTimeout(() => {
        root.unmount()
        div.remove()
    }, showTime)
}

export default Notification