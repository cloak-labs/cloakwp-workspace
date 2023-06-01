import classNames from "@/utils/classNames";
import { motion } from 'framer-motion'

export function Eyebrow({className, children, ...props}) {
    return (
        <motion.p
            className={classNames('mb-0 text-sm font-medium tracking-widest text-blue-700 uppercase min-w-fit md:text-md lg:text-lg', className)}
            {...props}
        >
            {children}
        </motion.p>
    )
}