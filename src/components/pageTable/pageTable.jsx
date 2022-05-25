import React from "react";
import { motion } from "framer-motion";

function PageTable(props) {
    return (
        <div>
            <h3>Tabla de páginas</h3>
            <table>
                <thead>
                    <th>
                        Número de página
                    </th>
                    <th>
                        Número de marco
                    </th>
                    <th>
                        Bit de válido
                    </th>
                    <th>
                        Bit de modificado
                    </th>
                    <th>
                        Tiempo de utilización (ms)
                    </th>
                </thead>
                <tbody>
                    {
                        props.pages.map((page, index) => {
                            return (
                                <tr>
                                    <motion.td initial="hidden" animate="visible" variants={props.variants} transition={{ duration: 1 }}>{index}</motion.td>
                                    <motion.td initial="hidden" animate="visible" variants={props.variants} transition={{ duration: 1 }}>{props.frameAsigned[index]}</motion.td>
                                    <motion.td initial="hidden" animate="visible" variants={props.variants} transition={{ duration: 1 }}>{props.valid[index]}</motion.td>
                                    <motion.td initial="hidden" animate="visible" variants={props.variants} transition={{ duration: 1 }}>{props.modified[index]}</motion.td>
                                    <motion.td initial="hidden" animate="visible" variants={props.variants} transition={{ duration: 1 }}>{props.usageTimes[index]}</motion.td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default PageTable;