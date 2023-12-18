import React, { ChangeEvent, useEffect, useState } from "react";
import Dormitory from "../types/Dormitory"
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Building from "../types/Building";
import BuildingAPI from "../service/BuildingAPI";
import DormitoryAPI from "../service/DormitoryAPI";
import DataResponse from "../types/DataResponse";
import Arrayutil from "../utils/Arrayutil";
import BuldingManagerModa from "../components/BuldingManagerModa"
import BuildingInfoModa from "../components/BuildingInfoModa"
import { useNavigate } from "react-router";

function DormitoryList() {
    const [dormitoriesList, setDormitoriesList] = useState<Array<Array<Dormitory>>>([]);
    const [buildingList, setbuildingList] = useState<Building[]>(new Array());
    const [buildingSelect, setBuildingSelect] = useState<Building>();

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const dataRes: DataResponse = (await BuildingAPI.gets()).data
            if (dataRes.code === 200) {
                setbuildingList([...dataRes.data as Building[]])
                const staringBuilding: Building = dataRes.data[0];

                setBuildingSelect(staringBuilding)
                updateDormitoryList(staringBuilding.id)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (buildingSelect)
            updateDormitoryList(buildingSelect.id);
    }, [buildingSelect]);

    /**
     * 跟新宿舍列表的显示状态
     * @param buildingId 
     */
    const updateDormitoryList = async (buildingId: string) => {
        const dRes: DataResponse = (await DormitoryAPI.getsByBuildingId(buildingId as string)).data
        if (dRes.code === 200) {
            const SPLIICE_INDEX = 6
            const resultData: Array<Array<Dormitory>> = Arrayutil.spliceArrayToArrays<Dormitory>(dRes.data, SPLIICE_INDEX);
            setDormitoriesList([...resultData])
        }
    }

    return (<>
        <Container fluid>
            <Row className="mb-3">
                <Col xs="auto">
                    <BuildingInfoModa modalData={[buildingSelect!, dormitoriesList]} />
                </Col>
                <Col xs="auto">
                    <Button variant="primary" onClick={() => { navigate("../bulding-list") }}>管理楼栋</Button>
                </Col>
                <Col xl={4}>
                    <Form.Select onChange={(value: React.ChangeEvent<HTMLSelectElement>) => {
                        const selectBuilding: Building = buildingList.filter(b => b.id === value.target.value)[0]
                        setBuildingSelect(selectBuilding)
                    }}>
                        {
                            buildingList.map((building, index) =>
                                <option key={index} value={building.id}>{building.name}</option>)
                        }
                    </Form.Select>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xl={8}>
                    <Form.Control type="text" placeholder="请输入宿舍名称进行搜索" />
                </Col>
                <Col xl="auto">
                    <Button className="mb-3" style={{ paddingLeft: "30px", paddingRight: "30px" }} variant="primary">查找</Button>
                </Col>
                <Col xl="auto">
                    <Button className="mb-3" style={{ paddingLeft: "30px", paddingRight: "30px" }} variant="danger">清除</Button>
                </Col>
                <Col xl="auto">
                    <Button className="mb-3" variant="primary">添加宿舍</Button>
                </Col>
            </Row>
            {/* render datas */}
            {
                dormitoriesList.map((datas: Array<Dormitory>, index: number) => (
                    <Row key={index}>
                        {
                            datas.map((dormitory, dataIndex) => {
                                return (
                                    <Col xl={2} key={dataIndex} style={{ padding: "5px" }}>
                                        <Card border={dormitory.type == "Male" ? "primary" : "danger"}>
                                            <Card.Body>
                                                <Card.Title>宿舍名称:{dormitory.rootNumber}</Card.Title>
                                                <Card.Text className="mb-1">
                                                    {dormitory.type == "Male" ? "男生宿舍" : "女生宿舍"}
                                                </Card.Text>
                                                <Card.Text>
                                                    入住人数: 1/8
                                                </Card.Text>
                                                <div className="d-flex justify-content-start">
                                                    <Button size="sm" variant="outline-primary" >人员信息明细</Button>
                                                    <Button size="sm" className="ms-2" variant="outline-danger" >管理</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>)
                )
            }
        </Container>
    </>)
}

export default DormitoryList
