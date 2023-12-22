import { useEffect, useState, ChangeEvent } from "react"
import { Button, Col, Container, Form, Pagination, Row, Table } from "react-bootstrap"
import StudentAPI from "../service/StudentAPI"
import Student from "../types/Student"
import DataResponse from "../types/DataResponse"
import Department from "../types/Department"
import DepartmentAPI from "../service/DepartmentAPI"

function StudentList() {
    const [studentList, setSstudentList] = useState<Array<Student>>([])
    const [departmentList, setdepartmentList] = useState<Array<Department>>([])
    const [studetnCount, setStudetnCount] = useState<number>(0)
    const [currentPage, setcurrentPage] = useState<number>(1)
    const [currentPageSize, setCurrentPageSize] = useState<number>(10)
    const [currentMaxPageToShow, setCurrentMaxPageToShow] = useState<number>(5)
    const [refresh, setrefresh] = useState(false)

    const refreshFuc = () => setrefresh(!refresh)

    //获取楼栋的数量
    useEffect(() => {
        const fetchCount = async () => {
            const data: DataResponse = await StudentAPI.getCount()
            if (data.code === 200) {
                setStudetnCount(data.data)
            }
        }
        fetchCount()
    }, [])


    useEffect(() => {
        const fetchCount = async () => {
            const data: DataResponse = (await DepartmentAPI.gets())
            setdepartmentList(data.data)
        }
        fetchCount()
    }, [])

    //回调刷新
    useEffect(() => {
        const fetchData = async () => {
            const data: DataResponse = (await StudentAPI.getPage(currentPageSize, (currentPage - 1) * currentPageSize))
            setSstudentList([...data.data])
        }
        fetchData()
    }, [refresh,
        currentPageSize,
        currentPage])

    const renderPage = () => {
        const totalPages = Math.ceil(studetnCount / currentPageSize);
        let startPage = 1;
        let endPage = totalPages;

        if (totalPages > currentMaxPageToShow) {
            const halfMaxPages = Math.floor(currentMaxPageToShow / 2);
            if (currentPage <= halfMaxPages) {
                endPage = currentMaxPageToShow;
            } else if (currentPage >= totalPages - halfMaxPages) {
                startPage = totalPages - currentMaxPageToShow + 1;
            } else {
                startPage = currentPage - halfMaxPages;
                endPage = currentPage + halfMaxPages;
            }
        }
        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Pagination.Item
                    key={i}
                    active={currentPage === i}
                    onClick={() => setcurrentPage(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }
        return (
            <Pagination>
                <Pagination.Prev
                    disabled={currentPage <= 1}
                    onClick={() => setcurrentPage(currentPage - 1)}
                />
                {startPage > 1 && (
                    <>
                        <Pagination.Item onClick={() => setcurrentPage(1)}>1</Pagination.Item>
                        {startPage > 2 && <Pagination.Ellipsis />}
                    </>
                )}
                {pages}
                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <Pagination.Ellipsis />}
                        <Pagination.Item onClick={() => setcurrentPage(totalPages)}>
                            {totalPages}
                        </Pagination.Item>
                    </>
                )}
                <Pagination.Next
                    disabled={currentPage >= totalPages}
                    onClick={() => setcurrentPage(currentPage + 1)}
                />
            </Pagination>
        );
    };

    return (
        <Container fluid style={{ height: "100%" }}>
            <Row className="mb-3">
                <h3>学生信息管理</h3>
            </Row>
            <Row className="mb-3">
                <Col sm="auto">
                    <Button variant="primary">导入学生</Button>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Table bordered hover responsive="xl">
                        <thead>
                            <tr>
                                <th className="text-center" style={{ verticalAlign: "middle", width: "80px" }}>编号</th>
                                <th className="text-center">姓名</th>
                                <th className="text-center">性别</th>
                                <th className="text-center">学院</th>
                                <th className="text-center">管理</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList.map((value, index) => {
                                return <tr>
                                    <td className="text-center" style={{ verticalAlign: "middle" }}>
                                        {(currentPage - 1) * currentPageSize + index + 1}
                                    </td>
                                    <td className="text-center" style={{ verticalAlign: "middle" }}>
                                        {value.name}
                                    </td>
                                    <td className="text-center" style={{ verticalAlign: "middle" }}>
                                        {value.sex === "Male" ? "男" : "女"}
                                    </td>
                                    <td className="text-center" style={{ verticalAlign: "middle" }}>
                                        {departmentList.filter(d => d.id == value.departmentId).map(v => <>{v.name}</>)}
                                    </td>
                                    <td className="text-center" style={{ verticalAlign: "middle" }}>
                                        <Button variant="outline-success" size="sm" >管理</Button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </Table></Col>
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
        </Container>
    )
}

export default StudentList