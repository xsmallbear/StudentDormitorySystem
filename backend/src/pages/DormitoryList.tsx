import { useEffect, useState } from "react";
import fakeDormitories from "../fakes/fakeDormitories";
import Dormitory from "../types/Dormitory"
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Building from "../types/Building";
import BuildingAPI from "../service/BuildingAPI";
import DormitoryAPI from "../service/DormitoryAPI";
import DataResponse from "../types/DataResponse";
import Arrayutil from "../utils/Arrayutil";

function DormitoryList() {
    const [dormitoriesList, setDormitoriesList] = useState<Array<Array<Dormitory>>>([]);
    const [buildingList, setbuildingList] = useState<Building[]>([]);
    const [buildingSelect, setBuildingSelect] = useState<string>();


    const getRandData = (): Array<Dormitory> => {
        let data = new Array<Dormitory>
        for (let i = 0; i < 20; i++) {
            data.push(fakeDormitories())
        }
        return data;
    }

    useEffect(() => {
        const fetchData = async () => {
            const bRes: DataResponse = (await BuildingAPI.gets()).data
            if (bRes.code === 200) {
                setbuildingList([...bRes.data as Building[]])
                const staringBuildingId = bRes.data[0].id;
                setBuildingSelect(staringBuildingId)
                updateDormitoryFromBuildingId(staringBuildingId)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        updateDormitoryFromBuildingId(buildingSelect as string);
    }, [buildingSelect]);

    const updateDormitoryFromBuildingId = async (buildingId: string) => {
        const dRes: DataResponse = (await DormitoryAPI.getsByBuildingId(buildingId as string)).data
        console.log(buildingId, dRes)
        if (dRes.code === 200) {
            const SPLIICE_INDEX = 6
            const resultData: Array<Array<Dormitory>> = Arrayutil.spliceArrayToArrays<Dormitory>(dRes.data, SPLIICE_INDEX);
            setDormitoriesList([...resultData])
        }
    }

    return (
        <Container fluid>
            <Row className="mb-3">
                <Col xl={5}>
                    <Form.Select onChange={(value: React.ChangeEvent<HTMLSelectElement>) => {
                        setBuildingSelect(value.target.value)
                        console.log(value.target.value)
                    }}>
                        {
                            buildingList.map((building, index) =>
                                <option key={index} value={building.id}>{building.name}</option>)
                        }
                    </Form.Select>
                </Col>
                <Col xs="auto">
                    <Button variant="primary">楼栋详细信息</Button>
                </Col>
                <Col xs="auto">
                    <Button variant="primary">管理楼栋</Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xl={8}>
                    <Form.Control type="text" placeholder="请输入房间号" />
                </Col>
                <Col xl="auto">
                    <Button style={{ paddingLeft: "30px", paddingRight: "30px" }} variant="primary">查找</Button>
                </Col>
                <Col xl="auto">
                    <Button variant="primary">添加宿舍</Button>
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
                                        <Card border="primary">
                                            <Card.Body>
                                                <Card.Title>宿舍名称:{dormitory.rootNumber}</Card.Title>
                                                <Card.Text>
                                                    <p>
                                                        入住人数: 1/8
                                                    </p>
                                                    {/* <p>楼层 {dormitory.floor}</p>
                                                    <p>类型 {dormitory.type}</p>
                                                    <p>状态 {dormitory.status}</p> */}
                                                </Card.Text>
                                                <div className="d-flex justify-content-center">
                                                    <Button variant="outline-primary" >人员信息明细</Button>
                                                    <Button className="ms-2" variant="outline-danger" >管理</Button>
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
    )
}

export default DormitoryList
