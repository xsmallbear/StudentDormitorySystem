import { Container, Row, Table } from "react-bootstrap"

function StudentList() {
    return (
        <>
            <Container fluid style={{ height: "100%" }}>
                <Row>
                    <h1>学生信息管理</h1>
                </Row>
                <Row>
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