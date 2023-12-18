import { useState } from "react";
import Building from "../types/Building";
import Dormitory from "../types/Dormitory"
import { Button, Modal } from "react-bootstrap";

const BuildingInfoModa: React.FC<{ modalData: [Building, Array<Array<Dormitory>>]; }> = ({ modalData }) => {
    const [state, setState] = useState(false);
    const [bilding, dormitoryList] = modalData ?? []
    const handleOpen = () => {
        setState(true);
    }
    const handleClose = () => {
        setState(false);
    };
    const calcDormitoryCount = (data: Array<Array<Dormitory>>): number => {
        let sum = 0
        data.forEach(data => {
            sum += data.length
        })
        return sum
    }
    return (
        <>
            <Button variant="success" onClick={handleOpen}>楼栋详细信息</Button>
            <Modal centered show={state} onHide={handleClose}>
                <Modal.Body>
                    {bilding ? (<>
                        <div>楼栋名称:{bilding?.name}</div>
                        <div>宿舍数量:{calcDormitoryCount(dormitoryList as Array<Array<Dormitory>>)}</div>
                    </>) : (
                        <div>数据加载中</div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default BuildingInfoModa