import fakeStudents from "../fakes/fakeStudent"

function StudentList() {
    const fakeStudent = fakeStudents()
    return (
        <>
            <h1>学生信息管理</h1>
            <p>{fakeStudent.id}:{fakeStudent.name}</p>
        </>
    )
}

export default StudentList