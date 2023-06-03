import React, { useContext, useEffect, useRef } from "react"
import ReactDOM from "react-dom/client"
import { AppContext } from "../../utlis/appContext"
import { motion, motionValue } from 'framer-motion'
import Terminal from '../Terminal'
const Application = ({ app }) => {
    const x = motionValue(50)
    const y = motionValue(50)

    return (
        <motion.div

            style={{


                position: 'absolute',
                top: y,
                left: x,
            }}
        >

            <motion.div
                className="window-title"
                drag
                dragElastic={false}
                dragMomentum={false}



                style={{ backgroundColor: '#f00', }}
            // drag

            // dragPropagation={true}

            >
                <span>{app.id}</span>

            </motion.div>
            <motion.div
                drag={false}
                style={{
                    pointerEvents: 'none',
                    backgroundColor: '#00f',
                    width: 500,
                    height: 200,
                }}>

                <Terminal app={app} />


            </motion.div>
        </motion.div >
    )
}

export default () => {
    console.log("WindowHolder")
    const holderRef = useRef()
    const platform = useContext(AppContext)
    useEffect(() => {
        const adder = ({ detail }) => {
            const { app } = detail
            //render react component
            const appHolder = document.createElement("div")
            appHolder.style.position = "absolute"
            appHolder.style.top = 50
            appHolder.style.left = 50



            holderRef.current.appendChild(appHolder)
            const root = ReactDOM.createRoot(appHolder)
            root.render(<Application app={app} />)
        }
        document.addEventListener("appRunned", adder)
        return () => {
            document.removeEventListener("appRunned", adder)
        }

    }, [])

    return (
        <div ref={holderRef}>

        </div>
    )
}