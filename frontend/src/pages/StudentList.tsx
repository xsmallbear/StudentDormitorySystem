import { Container, Row, Table } from "react-bootstrap"

function StudentList() {
    return (
        <>
            <Container fluid style={{ height: "100%" }}>
                <Row className="mb-3">
                    <h3>学生信息管理</h3>
                </Row>
                <Row className="mb-3">
                </Row>
                <Row className="mb-3">
                    <Table bordered hover responsive="xl">
                        <thead>
                            <tr>
                                <th className="text-center">编号</th>
                                <th className="text-center">姓名</th>
                                <th className="text-center">性别</th>
                                <th className="text-center">学院</th>
                                <th className="text-center">管理</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    )
}

export default StudentList