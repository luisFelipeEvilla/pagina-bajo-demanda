import React from "react";
import { motion } from "framer-motion";

function PaginationTable(props) {
    return (
        <div>
            <table>
                <thead>
                    <th>Dir Lógica</th>
                    {
                        props.directions.map(dir => <th>{dir}</th>)
                    }
                </thead>
                <tbody>
                    <tr>
                        <td>Lect / Escri </td>
                        {
                            props.operations.map(operation => <td>{operation}</td>)
                        }
                    </tr>
                    <tr>
                        <td>Núm pag</td>
                        {
                            props.pageNumbers.map((dir, index) => <motion.td initial="hidden" animate="visible" variants={props.variants} transition={{ duration: 1 }}>{dir}</motion.td>)
                        }
                    </tr>
                    <tr>
                        <td>Núm Marco</td>
                        {
                            props.frameNumbers.map((dir, index) => <motion.td initial="hidden" animate="visible" variants={props.variants} transition={{ duration: 1 }}>{dir}</motion.td>)
                        }
                    </tr>
                    <tr>
                        <td>Dir Fisica</td>
                        {
                            props.fisDirs.map((dir, index) => <motion.td initial="hidden" animate="visible" variants={props.variants} transition={{ duration: 1 }}>{dir}</motion.td>)
                        }
                    </tr>
                    <tr>
                        <td>Swap In</td>
                        {
                            props.swapIns.map((dir, index) => <motion.td initial="hidden" animate="visible" variants={props.variants} transition={{ duration: 1 }}>{dir}</motion.td>)
                        }
                    </tr>
                    <tr>
                        <td>Swap Out</td>
                        {
                            props.swapOuts.map((dir, index) => <motion.td initial="hidden" animate="visible" variants={props.variants} transition={{ duration: 1 }}>{dir}</motion.td>)
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PaginationTable