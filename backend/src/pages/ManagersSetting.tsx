import fakeManager from "../fakes/fakeManager"
import Manager from "../types/Manager"

function ManagersSetting() {

    const fakeDatas:Array<Manager> = [
        fakeManager(),
        fakeManager(),
        fakeManager(),
        fakeManager(),
        fakeManager(),
        fakeManager(),
        fakeManager(),
        fakeManager(),
        fakeManager(),
        fakeManager(),
    ] 

    return (<>
        <h1>管理员系统设定</h1>
        {
            fakeDatas.map((item, index)=><p>{index} {item.managerPasswordHash} {item.managerSalt} {item.managerUsername}</p>)
        }
    </>)
}

export default ManagersSetting