import { motion } from 'framer-motion'
export default ({ value, children, style }) => {

    return (
        <motion.div
            style={style}
            className='slide-dialog'
            transition={{
                type: "tween",
                stiffness: 260,
                damping: 20,
                duration: 0.15,
            }}
            animate={{
                bottom: value === 'open' ? '5%' : '-100%',
            }}
        >

            {children}
        </motion.div>
    )
}