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
    const [swapOuts, setSwapOuts] = useState([]);

    const [frames, setFrames] = useState([])
    const [frameNumbers, setFrameNumbers] = useState([])
    const [frameSize, setFrameSize] = useState(0)

    const [modified, setModified] = useState([])
    const [pages, setPages] = useState([]);
    const [frameAsigned, setFrameAsigned] = useState([]);
    const [valid, setValid] = useState([]);

    const [indexDir, setIndexDir] = useState(0);
    const [indexFrames, setIndexFrames] = useState(0)

    const [pageFail, setPageFail] = useState(0);

    const [log, setLog] = useState([]);

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
            const newValid = [...valid]
            const newFrameAsigned = [...frameAsigned];
            const newModified = [...modified];

            const page = Math.floor((dir) / frameSize);

            let frame;
            let fisDir;
            let swapIn;
            let swapOut = "";
            let newLog = "";

            if (!isPageOnFrames(page)) {
                frame = indexFrames

                if (frames[indexFrames] != 0) {
                    newValid[frames[indexFrames]] = 0;
                    newLog += `Se encontro un fallo de página en la página ${page} \n`
                }

                const lastPage = newFrames[frame];
                if (lastPage !== "x") {
                    newFrameAsigned[lastPage] = "";
                    newLog += `Se saco la página ${lastPage} del marco ${frame}\n`
                }


                if (modified[lastPage] === 1) {
                    swapOut = "x";
                    modified[lastPage] = 0;
                    newLog += `La pagina ${lastPage} fue modificada, se produjo un swap out \n`
                }

                newFrames[frame] = page;
                newFrameAsigned[page] = frame
                newLog += `Se le asigno el marco ${frame} a la página ${page} \n`
                setFrames(newFrames);

                fisDir = indexFrames * frameSize + (dir % frameSize)
                swapIn = "x";
                newValid[page] = 1;
                setPageFail(pageFail + 1)
                setValid(newValid)

                indexFrames >= (frames.length - 1) ? setIndexFrames(0) : setIndexFrames(indexFrames + 1);
            } else {
                setFrames(newFrames)
                newLog += `La página ${page} ya se encuentra en memoria \n`
                frame = getFrameNumber(page);
                fisDir = frame * frameSize + (dir % frameSize);
                swapIn = "";
            }

            if (operations[indexDir] === "E") {
                newModified[page] = 1;
                newLog += `La página ${page} fue modificada, su bit de modificado ahora es 1\n`
            }

            setPageNumbers(pageNumbers.concat([page]));
            setFrameNumbers(frameNumbers.concat([frame]))
            setFrameAsigned(newFrameAsigned);
            setModified(newModified);
            setFisDirs(fisDirs.concat([fisDir]));
            setSwapIns(swapIns.concat([swapIn]));
            setSwapOuts(swapOuts.concat([swapOut]));
            setLog(log.concat([newLog]));
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
        // const frameSize = parseInt(document.getElementById('frameSize').value)
        const frameSize = 4
        setFrameSize(frameSize);

        const framesNumber = parseInt(document.getElementById('framesNumber').value)
        setFrames(new Array(framesNumber).fill("x"))

        SOSize = document.getElementById('SOSize').value;

        //processSize = document.getElementById('processSize').value;
        processSize = 30;
        const numPages = Math.ceil(processSize / frameSize)
        
        setPages(new Array(numPages).fill(0));
        setFrameAsigned(new Array(numPages).fill(""));
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
                <p><b>Fallos de página: </b> {pageFail}</p>
            </div>
            <div>
                <p><b>Reemplazos: </b> {pageFail - frames.length > 0 ? pageFail - frames.length : 0}</p>
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
                        <tr>
                            <td>Swap Out</td>
                            {
                                swapOuts.map((dir, index) => <motion.td initial="hidden" animate="visible" variants={variants} transition={{ duration: 1 }}>{dir}</motion.td>)
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
                                        <motion.td initial="hidden" animate="visible" variants={variants} transition={{ duration: 1 }}>{frameAsigned[index]}</motion.td>
                                        <motion.td initial="hidden" animate="visible" variants={variants} transition={{ duration: 1 }}>{valid[index]}</motion.td>
                                        <motion.td initial="hidden" animate="visible" variants={variants} transition={{ duration: 1 }}>{modified[index]}</motion.td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div>
                {
                    log.map((log, index) => {
                        return (
                            <div>
                                <p><b>Número de iteración: </b> {index}</p>
                                <p style={{ "white-space": "pre-line" }}>{log}</p>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Home