import { Button, Container, Row, Table } from "react-bootstrap"

function ManagersSetting() {

    return (
        <>
            <Container fluid style={{ height: "100%" }}>
                <Row className="mb-3">
                    <h3>管理员信息管理</h3>
                </Row>
                <Row className="mb-3">
                    <Table bordered hover responsive="xl">
                        <thead>
                            <tr>
                                <th className="text-center">编号</th>
                                <th className="text-center">名称</th>
                                <th className="text-center">管理</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td className="text-center" style={{ verticalAlign: "middle" }}>1</td>
                                <td className="text-center" style={{ verticalAlign: "middle" }}>小明</td>
                                <td className="text-center" style={{ verticalAlign: "middle" }}>
                                    <Button variant="outline-success" size="sm" >修改信息</Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    )
}

export default ManagersSetting