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
            fakeDatas.map((item, index)=><p>{index} {item.passwordHash} {item.salt} {item.username}</p>)
        }
    </>)
}

export default ManagersSetting