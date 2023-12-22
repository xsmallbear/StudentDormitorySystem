import React, { useRef, useState, useEffect, ChangeEvent, MouseEvent } from "react"
import DataResponse from "../types/DataResponse"
import BuildingAPI from "../service/BuildingAPI"
import { Button, Col, Container, Form, InputGroup, Modal, Pagination, Row, Table } from "react-bootstrap"
import Building from "../types/Building"
import { useNavigate } from "react-router"
import Notification from "../components/Notification"


const AddBuildigModal: React.FC<{ callback: Function }> = ({ callback }) => {
    const [modaState, setModalState] = useState(false)
    const [newBuildingName, setNewBuildingName] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null)

    const handleOpen = () => {
        setModalState(true)
    }

    const handleClose = () => {
        setNewBuildingName("")
        setModalState(false)
    }

    const hanldeSave = async () => {
        const input = inputRef.current as HTMLInputElement
        if (newBuildingName.length <= 0 || newBuildingName.length >= 32) {
            input.style.border = "1px solid red"
            input.style.outline = "1px solid red"
            Notification("名称不能为空")
            return
        }
        const dRes = (await BuildingAPI.add(newBuildingName) as DataResponse).data
        if (dRes.code === 200) {
            handleClose()
            Notification("添加成功")
            callback()
        } else {
            Notification(dRes.message)
            input.style.border = "1px solid red"
            input.style.outline = "1px solid red"
        }
    }
    return (
        <>
            <Button className="mb-3" onClick={handleOpen}>添加楼栋</Button>
            <Modal show={modaState} centered onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>添加楼栋</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>楼栋名称:</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                ref={inputRef}
                                type="text"
                                placeholder="请输入新楼栋名称"
                                autoFocus
                                onChange={(event: ChangeEvent<HTMLInputElement>) => { setNewBuildingName(event.target.value) }}
                            />
                        </InputGroup>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>关闭</Button>
                    <Button variant="primary" type="submit" onClick={hanldeSave} >保存</Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}


const RemoveBuildingModal: React.FC<{ buildingId: string, buildingName: string }> = ({ buildingId, buildingName }) => {
    const [modaState, setModalState] = useState(false)
    const handleOpen = () => {
        setModalState(true)
    }

    const handleClose = () => {
        setModalState(false)
    }
    return (
        <>
            <Button variant="outline-danger ms-2" size="sm" onClick={handleOpen}>删除</Button>
            <Modal show={modaState} centered onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>删除楼栋</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    是否删除:{buildingName}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>取消</Button>
                    <Button variant="primary" type="submit" >确定</Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

const UpdateBuildingModal: React.FC<{ id: string, name: string, callback: Function }> = ({ id, name, callback }) => {
    const [modaState, setModalState] = useState(false)
    const [buildingNewName, setBuildingNewName] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null)
    const handleOpen = () => {
        setModalState(true)
        setBuildingNewName(name) //TODO
    }

    const handleClose = () => {
        setModalState(false)
    }

    const hanldeSave = async () => {
        const input = inputRef.current as HTMLInputElement
        if (buildingNewName.length <= 0 || buildingNewName.length >= 32) {
            input.style.border = "1px solid red"
            input.style.outline = "1px solid red"
            Notification("名称不能为空")
            return
        }
        const dRes = (await BuildingAPI.update(id, buildingNewName) as DataResponse).data
        if (dRes.code === 200) {
            handleClose()
            Notification("修改成功")
            callback()
        } else {
            Notification(dRes.message)
            input.style.border = "1px solid red"
            input.style.outline = "1px solid red"
        }
    }

    return (
        <>
            <Button variant="outline-success" size="sm" onClick={handleOpen}>修改名称</Button>
            <Modal show={modaState} centered onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>修改楼栋</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>楼栋名称:</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                ref={inputRef}
                                type="text"
                                placeholder="请输入新楼栋名称"
                                defaultValue={name}
                                autoFocus
                                onChange={(event: ChangeEvent<HTMLInputElement>) => { setBuildingNewName(event.target.value) }}
                            />
                        </InputGroup>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>关闭</Button>
                    <Button variant="primary" type="submit" onClick={hanldeSave} >保存</Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}


const BuldingManager: React.FC = () => {
    const [buildingList, setBuildingList] = useState<Building[]>([])
    //楼栋栋总数量
    const [buildingCount, setBuildingCount] = useState<number>(0)
    const [currentPage, setcurrentPage] = useState<number>(0)
    const [currentPageSize, setCurrentPageSize] = useState<number>(20)
    const [refresh, setrefresh] = useState(false)
    const navigate = useNavigate()

    const refreshFuc = () => setrefresh(!refresh)

    //获取楼栋的数量
    useEffect(() => {
        const getBuildingCount = async () => {
            const data: DataResponse = (await BuildingAPI.getCount()).data
            if (data.code === 200) {
                setBuildingCount(data.data)
            }
        }
        getBuildingCount()
    }, [])

    //回调刷新
    useEffect(() => {
        const fetchData = async () => {
            const data: DataResponse = (await BuildingAPI.gets()).data
            if (data.code === 200) {
                setBuildingList([...data.data])
            }
        }
        fetchData()
    }, [refresh,
        currentPageSize,
        currentPage])

    return (
        <>
            <Container fluid style={{ height: "100%" }}>
                <Row className="mb-1">
                    <Col sm="auto">
                        <Button variant="primary" onClick={() => { navigate("../dormitory-list") }}>{"< "}返回</Button>
                    </Col>
                    <Col sm="auto">
                        <AddBuildigModal callback={refreshFuc} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table bordered hover responsive="xl">
                            <thead>
                                <tr>
                                    <th className="text-center">编号</th>
                                    <th className="text-center">楼栋名称</th>
                                    <th className="text-center">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {buildingList!.map((value, index) => {
                                    return <>
                                        <tr key={index}>
                                            <td className="text-center" style={{ verticalAlign: "middle", width: "80px" }}>
                                                {index}
                                            </td>
                                            <td className="text-center" style={{ verticalAlign: "middle" }}>
                                                {value.name}
                                            </td>
                                            <td className="text-center" style={{ width: "300px" }}>
                                                <UpdateBuildingModal id={value.id} name={value.name} callback={refreshFuc} />
                                                <RemoveBuildingModal buildingId={value.id} buildingName={value.name} />
                                            </td>
                                        </tr>
                                    </>
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col sm="auto" className="d-flex justify-content-center align-items-center">
                        <Pagination >
                            {/* <Pagination.Prev />
                            <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Item>{2}</Pagination.Item>
                            <Pagination.Item>{3}</Pagination.Item>
                            <Pagination.Next /> */}
                        </Pagination>
                    </Col>
                    <Col sm="auto" >
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm="auto">
                                每页显示:
                            </Form.Label>
                            <Col sm="auto">
                                <Form.Select onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                    setCurrentPageSize(Number(event.target.value))
                                }}>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default BuldingManager