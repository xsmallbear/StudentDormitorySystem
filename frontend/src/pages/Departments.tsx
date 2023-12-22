import React, { ChangeEvent, useEffect, useState } from "react"
import { Button, Col, Container, Form, Pagination, Row, Table } from "react-bootstrap"
import DataResponse from "../types/DataResponse"
import Department from "../types/Department"
import DepartmentAPI from "../service/DepartmentAPI"

const Departments: React.FC = () => {
    const [departmentList, setdepartmentList] = useState<Array<Department>>([])
    const [departmentCount, setDepartmentCount] = useState<number>(0)
    const [currentPage, setcurrentPage] = useState<number>(1)
    const [currentPageSize, setCurrentPageSize] = useState<number>(10)
    const [refresh, setrefresh] = useState(false)

    useEffect(() => {
        const fetchCount = async () => {
            const data: DataResponse = (await DepartmentAPI.getCount())
            setDepartmentCount(data.data)
        }
        fetchCount()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const data: DataResponse = (await DepartmentAPI.getPage(currentPageSize, (currentPage - 1) * currentPageSize))
            setdepartmentList([...data.data])
        }

        fetchData()
    }, [refresh,
        currentPageSize,
        currentPage])

    const renderPage = () => <Pagination >
        {<Pagination.Prev disabled={currentPage >= 1} onClick={() => setcurrentPage(currentPage - 1)} />}
        {
            Array.from({ length: Math.ceil(departmentCount / currentPageSize) }, (_, index) => {
                const pageNmber = index + 1
                return (<Pagination.Item active={currentPage === pageNmber} onClick={() => { setcurrentPage(pageNmber) }}>{pageNmber}</Pagination.Item>)
            })
        }
        {<Pagination.Next disabled={currentPage >= Math.ceil(departmentCount / currentPageSize)} onClick={() => setcurrentPage(currentPage + 1)} />}
    </Pagination>

    return (
        <Container fluid style={{ height: "100%" }}>
            <Row className="mb-3">
                <h3>学院管理</h3>
            </Row>
            <Row className="mb-3">
                <Col sm="auto">
                    <Button variant="primary">添加学院</Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Table bordered hover responsive="xl">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ verticalAlign: "middle", width: "80px" }}>编号</th>
                            <th className="text-center">名称</th>
                            <th className="text-center">管理</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            departmentList.map((value, index) => {
                                return <tr>
                                    <td className="text-center" style={{ verticalAlign: "middle" }}>
                                        {(currentPage - 1) * currentPageSize + index + 1}
                                    </td>
                                    <td className="text-center">
                                        {value.name}
                                    </td>
                                    <td className="text-center">
                                        <Button variant="outline-success" size="sm">修改</Button>
                                        <Button variant="outline-danger ms-2" size="sm">删除</Button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>
            </Row>
            <Row>
                <Col sm="auto" className="d-flex justify-content-center align-items-center">
                    {renderPage()}
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
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
        </Container >
    )
}

export default Departments