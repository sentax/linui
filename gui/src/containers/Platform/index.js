import Taskbar from "./Taskbar"
import { useContext } from "react"
import { AppContext } from "../../utlis/appContext"
import SlideDialog from "../../components/SlideDialog"
import WindowHolder from "./WindowHolder"

const XDialog = () => {
    const platform = useContext(AppContext)
    const xDialog = platform.TaskManager.xDialog()
    const apps = platform.TaskManager.apps()

    return <SlideDialog value={xDialog.state} style={{
        left: 6,
        backgroundColor: '#333333',
        color: '#fff',
        width: '50%',
        height: '70%',
        borderRadius: 10,
        border: '1px solid #4d4d4d',
        overflow: 'hidden',
    }} >

        <div style={{
            padding: 30,
        }}>
            <input type="search" className="taskbar-search" />

            {apps.list.map((app, i) => {
                return <button key={i} onClick={() => {
                    apps.runApp(app)
                }}>
                    {app.title}
                </button>
            })}

        </div>
        <div style={{
            backgroundColor: '#202020',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #4d4d4d',
            paddingLeft: 50,
            paddingRight: 50,
            paddingTop: 10,
            paddingBottom: 10,
        }}>
            asd
        </div>

    </SlideDialog>
}
export default () => {
    return (
        <div>
            <Taskbar />
            <XDialog />
            <WindowHolder />
        </div>
    )

}