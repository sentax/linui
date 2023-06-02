import { useContext } from "react"
import { AppContext } from "../../utlis/appContext"
const TaskbarItem = ({ app, onClick, children }) => {
    return (
        <div className="taskbar-item" onClick={onClick}>
            {children}
        </div>
    )
}

export default () => {
    const platform = useContext(AppContext)
    return (
        <div className="taskbar">
            <TaskbarItem type={'dialog'} onClick={platform.TaskManager.ToggleXDialog} >
                X
            </TaskbarItem>
        </div>
    )
}