import React, { ChangeEvent, KeyboardEvent, FocusEvent, useEffect, useState, useRef } from "react";
import Building from "../types/Building";
import DataResponse from "../types/DataResponse";
import BuildingAPI from "../service/BuildingAPI";
import { Button, Form, Modal, Table } from "react-bootstrap";
/**
 * 楼栋管理modal
 */
const BuldingManagerModa: React.FC<{ modalData: Array<Building> }> = ({ modalData }) => {
    const [state, setState] = useState(false);
    const [editRows, setEditRows] = useState<number>(-1)
    const [editValue, setEditValue] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null);
    const handleOpen = () => {
        setState(true);
    }
    const handleClose = () => {
        setState(false);
        setEditRows(-1)
        setEditValue("");
    };

    const HandleChangeNameButton = (index: number, value: string) => {
        setEditRows(index)
        setEditValue(value)
        console.log(index)
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEditValue(event.target.value)
    }

    const handkeInputKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            updateName()
        }
    };
    const handleInputOnBlur = (event: FocusEvent<HTMLInputElement>) => {
        updateName()
    }

    const updateName = async () => {
        const needUpdateNameBuilding = modalData[editRows]
        if (needUpdateNameBuilding.name === editValue) {
            setEditRows(-1)
            setEditValue("")
            return
        }
        //表单验证
        if (editValue.length <= 0 || editValue.length > 32) {
            inputRef.current!.style.outline = "solid red"
        } else {
            const bRes: DataResponse = (await BuildingAPI.update(needUpdateNameBuilding.id, editValue)).data
            if (bRes.code == 200) {
                modalData[editRows].name = editValue
                setEditRows(-1)
                setEditValue("")
                return
            } else {
                inputRef.current!.style.outline = "solid red"
            }
        }
    }

    useEffect(() => {
        if (inputRef.current)
            inputRef.current.focus();
    }, [editRows])

    return (
        <>
            <Button variant="primary" onClick={() =>
                handleOpen()
            }>管理楼栋</Button>
            <Modal show={state} centered onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>楼栋管理</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddBuildigModal />
                    <Table bordered size="sm">
                        <thead>
                            <tr>
                                <th className="text-center">楼栋名称</th>
                                <th className="text-center">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modalData!.map((value, index) => {
                                return <>
                                    <tr key={index}>
                                        <td className="text-center" style={{ width: "250px", verticalAlign: "middle", position: "relative" }}>
                                            {
                                                editRows === index ?
                                                    <Form.Control
                                                        style={{ height: "100%", textAlign: "center", border: "0", outline: "solid #74c0fc", borderRadius: "0" }}
                                                        onChange={handleInputChange} onKeyUp={handkeInputKeyUp} onBlur={handleInputOnBlur}
                                                        ref={inputRef}
                                                        type="text" defaultValue={value.name} />
                                                    :
                                                    <span>{value.name}</span>
                                            }
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
                </Modal.Body>
            </Modal>
        </>
    )
}

const AddBuildigModal: React.FC = () => {
    const [state, setState] = useState(false);
    const handleOpen = () => {
        setState(true);
    }
    const handleClose = () => {
        setState(false);
    };
    return (
        <>
            <Button size="sm" className="mb-3" onClick={handleOpen}>添加楼栋</Button>
            <Modal static centered show={state} onHide={handleClose} >
                <Modal.Body>
                    <h1>添加楼栋</h1>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default BuldingManagerModa 