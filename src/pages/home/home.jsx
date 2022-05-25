import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import EventEmitter from 'events'

import './home.css'

function Home(props) {
    const [directions, setDirections] = useState([]);
    const [operations, setOperations] = useState([]);

    const [pageNumbers, setPageNumbers] = useState([]);
    const [fisDirs, setFisDirs] = useState([]);

    const [swapIns, setSwapIns] = useState([]);

    const [frames, setFrames] = useState([])
    const [frameNumbers, setFrameNumbers] = useState([])
    const [frameSize, setFrameSize] = useState(0)

    const [modified, setModified] = useState([])
    const [pages, setPages] = useState([]);
    const [valid, setValid] = useState([]);
    
    const [indexDir, setIndexDir] = useState(0);
    const [indexFrames, setIndexFrames] = useState(0)

    const [start, setStart] = useState(true)

    let SOSize = 0;
    let processSize = 0;

    const eventEmitter = new EventEmitter();

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    }

    useEffect(() => {

    }, [directions])

    eventEmitter.on('next', () => {
        if (indexDir < directions.length) {
            const dir = directions[indexDir];
            const newFrames = [...frames]

            const page = Math.floor((dir) / frameSize);
            const isPageLoaded = isPage(page);

            let frame;
            let fisDir;
            let swapIn;

            if (!isPageOnFrames(page)) {
                frame = indexFrames
                newFrames[frame] = page;
                setFrames(newFrames)
                fisDir = indexFrames * frameSize + (dir % frameSize)
                swapIn = "x";

                indexFrames >= (frames.length - 1) ? setIndexFrames(0) : setIndexFrames(indexFrames + 1);
            } else {
                setFrames(newFrames)
                frame = getFrameNumber(page);
                fisDir = frame * frameSize + (dir % frameSize);
                swapIn = "";
            }

            setPageNumbers(pageNumbers.concat([page]));
            setFrameNumbers(frameNumbers.concat([frame]))
            setFisDirs(fisDirs.concat([fisDir]));
            setSwapIns(swapIns.concat([swapIn]));
            setIndexDir(indexDir + 1);
        }
    }
    )

    function isPageOnFrames(pageNumber) {
        const found = frames.find(frame => frame == pageNumber)

        return found ? true : false
    }

    function getFrameNumber(page) {
        const number = frames.findIndex(frame => frame == page)

        return number;
    }

    function isPage(pageNumber) {
        const found = pages.find(page => page == pageNumber);

        return found ? true : false;
    }

    const handleClick = () => {
        const frameSize = parseInt(document.getElementById('frameSize').value)
        setFrameSize(frameSize);
        setFrames(new Array(frameSize).fill(0))

        SOSize = document.getElementById('SOSize').value;
        
        processSize = document.getElementById('processSize').value;
        const numPages = Math.ceil(processSize/frameSize)
        setPages(new Array(numPages).fill(0));
        setValid(new Array(numPages).fill(0));
        setModified(new Array(numPages).fill(0));
        
        setDirections(document.getElementById('directions').value);
        
        setDirections([21, 26, 25, 6, 5, 29, 4, 5, 17, 16, 24, 25, 4, 7, 21, 1, 14, 15, 21, 22]);
        setOperations(["L", "L", "E", "E", "L", "L", "L", "E", "E", "E", "E", "L", "E", "L", "E", "E", "L", "L", "E", "E"]);
    }


    return (
        <div className='container'>
            <div className='form-container'>
                <form>
                    <div className='form-group'>
                        <label htmlFor="frameSize">Tamaño del marco</label>
                        <input id="frameSize" type="number" name='frameSize' placeholder='Ingrese el tamaño del marco'></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="SOSize">Tamaño del sistema operativo</label>
                        <input id="SOSize" type="number" name='SOSize' placeholder='Ingrese el tamaño del Sistema operativo'></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='processSize'>Tamaño del proceso</label>
                        <input id="processSize" type="number" name='processSize' placeholder='Ingrese el tamaño del proceso'></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="directions">Direcciones del proceso</label>
                        <input id="directions" name="directions" type="file" placeholder='Direcciones del proceso' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="framesNumber">Número de marcos</label>
                        <input id="framesNumber" name="framesNumber" type="number" placeholder='Ingrese el número de marcos' />
                    </div>
                    <div className='form-group submit-container'>
                        <button onClick={handleClick} type='button'>Enviar</button>
                    </div>
                </form>
            </div>

            <div>
                <button onClick={() => eventEmitter.emit('next')}>Siguiente</button>
            </div>
            <div>
                <table>
                    <thead>
                        <th>Dir Lógica</th>
                        {
                            directions.map(dir => <th>{dir}</th>)
                        }
                    </thead>
                    <tbody>
                        <tr>
                            <td>Lect / Escri </td>
                            {
                                operations.map(operation => <td>{operation}</td>)
                            }
                        </tr>
                        <tr>
                            <td>Núm pag</td>
                            {
                                pageNumbers.map((dir, index) => <motion.td initial="hidden" animate="visible" variants={variants} transition={{ duration: 1 }}>{dir}</motion.td>)
                            }
                        </tr>
                        <tr>
                            <td>Núm Marco</td>
                            {
                                frameNumbers.map((dir, index) => <motion.td initial="hidden" animate="visible" variants={variants} transition={{ duration: 1 }}>{dir}</motion.td>)
                            }
                        </tr>
                        <tr>
                            <td>Dir Fisica</td>
                            {
                                fisDirs.map((dir, index) => <motion.td initial="hidden" animate="visible" variants={variants} transition={{ duration: 1 }}>{dir}</motion.td>)
                            }
                        </tr>
                        <tr>
                            <td>Swap In</td>
                            {
                                swapIns.map((dir, index) => <motion.td initial="hidden" animate="visible" variants={variants} transition={{ duration: 1 }}>{dir}</motion.td>)
                            }
                        </tr>
                    </tbody>
                </table>
            </div>

            
            <div className='page-table-container'>
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
                    </thead>
                    <tbody>
                        {
                            pages.map((page, index) => {
                                return (
                                    <tr>
                                        <motion.td initial="hidden" animate="visible" variants={variants} transition={{ duration: 1 }}>{index}</motion.td>
                                        <motion.td initial="hidden" animate="visible" variants={variants} transition={{ duration: 1 }}>{valid[index]}</motion.td>
                                        <motion.td initial="hidden" animate="visible" variants={variants} transition={{ duration: 1 }}>{valid[index]}</motion.td>
                                        <motion.td initial="hidden" animate="visible" variants={variants} transition={{ duration: 1 }}>{modified[index]}</motion.td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home