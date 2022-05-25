import React from "react";
import { motion } from "framer-motion";

function FrameTable(props) {

    return (
        <div>
            <h3>Tabla de marcos</h3>
            <table>
                <thead>
                    <th>
                        Número de marco
                    </th>

                    <th>
                        Número de página
                    </th>
                </thead>

                <tbody>
                    {
                        props.frames.map((frame, index) => (
                            <tr>
                                <motion.td initial="hidden" animate="visible" variants={props.variants} transition={{ duration: 1 }}>{index}</motion.td>
                                <motion.td initial="hidden" animate="visible" variants={props.variants} transition={{ duration: 1 }}>{frame}</motion.td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default FrameTable;