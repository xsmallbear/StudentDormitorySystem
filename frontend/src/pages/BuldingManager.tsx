import { useRef, useState, useEffect } from "react";
import DataResponse from "../types/DataResponse";
import BuildingAPI from "../service/BuildingAPI"
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import Building from "../types/Building";
import { useNavigate } from "react-router";


const BuldingManager: React.FC = () => {
    const [buildingList, setBuildingList] = useState<Building[]>([])
    const inputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const dataRes: DataResponse = (await BuildingAPI.gets()).data
            if (dataRes.code === 200) {
                setBuildingList([...dataRes.data])
            }
        }
        fetchData()
    }, [])

    const HandleChangeNameButton = (index: number, value: string) => {
    }

    // const updateName = async () => {
    //     const needUpdateNameBuildig = modalData[editRows]
    //     if (needUpdateNameBuildig.name === editValue) {
    //         setEditRows(-1)
    //         setEditValue("")
    //         return
    //     }
    //     //表单验证
    //     if (editValue.length <= 0 || editValue.length > 32) {
    //         inputRef.current!.style.outline = "solid red"
    //     } else {
    //         const bRes: DataResponse = (await BuildingAPI.update(needUpdateNameBuildig.id, editValue)).data
    //         if (bRes.code == 200) {
    //             modalData[editRows].name = editValue
    //             setEditRows(-1)
    //             setEditValue("")
    //             return
    //         } else {
    //             inputRef.current!.style.outline = "solid red"
    //         }
    //     }
    // }


    return (
        <>
            <Modal>

            </Modal>
            <Container>
                <Row>
                    <Col className="mb-3">
                        <Button variant="primary" onClick={() => { navigate("../dormitory-list") }}>返回</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th className="text-center">楼栋名称</th>
                                    <th className="text-center">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {buildingList!.map((value, index) => {
                                    return <>
                                        <tr key={index}>
                                            <td className="text-center" style={{ width: "250px", verticalAlign: "middle", position: "relative" }}>
                                                {value.name}
                                            </td>
                                            <td className="text-center ">
                                                <Button variant="outline-success" size="sm" onClick={(() => HandleChangeNameButton(index, value.name))}>改名</Button>
                                                <Button variant="outline-danger ms-2" size="sm">删除</Button>
                                            </td>
                                        </tr>
                                    </>
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

// const AddBuildigModal: React.FC = () => {
//     const [state, setState] = useState(false);
//     const handleOpen = () => {
//         setState(true);
//     }
//     const handleClose = () => {
//         setState(false);
//     };
//     return (
//         <>
//             <Button size="sm" className="mb-3" onClick={handleOpen}>添加楼栋</Button>
//             <Modal static centered show={state} onHide={handleClose} >
//                 <Modal.Body>
//                     <h1>添加楼栋</h1>
//                 </Modal.Body>
//             </Modal>
//         </>
//     )
// }

export default BuldingManager