import { useEffect, useState } from "react";
import fakeDormitories from "../fakes/fakeDormitories";
import Dormitories from "../types/Dormitories"
import { Button, Card, Container } from "react-bootstrap";

function DormitoriesList() {

    const [dormitoriesList, setDormitoriesList] = useState<Dormitories[]>([]);

    useEffect(() => {
        let data = []
        for (let i = 0; i < 10; i++) {
            data.push(fakeDormitories())
        }
        setDormitoriesList(data)
    }, [])

    return (
        <div>
            {
                dormitoriesList.map((item, index) => <>
                    <Card>
                        <Card.Body>
                            <Card.Title>{item.id}</Card.Title>
                            <Card.Text>
                                {item.type}
                            </Card.Text>
                            <Button variant="primary">这是个按钮</Button>
                        </Card.Body>
                    </Card>
                </>
                )
            }
        </div>
    )
}

export default DormitoriesList
