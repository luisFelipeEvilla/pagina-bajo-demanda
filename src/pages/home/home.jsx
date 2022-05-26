import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import EventEmitter from 'events'

import FrameTable from '../../components/frameTable/frameTable';
import PageTable from '../../components/pageTable/pageTable';
import PaginationTable from '../../components/paginationTable/paginationTable';
import MemoryRepresentation from '../../components/memoryRepresentation/memoryRepresentation';
import DiskRepresentation from '../../components/diskRepresentation/diskRepresentation';
import DataForm from '../../components/dataForm/dataForm';
import Modal from '../../components/modal/modal';

import './home.scss'

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

    const [usageTimes, setUsageTimes] = useState([]);

    const [totalFrames, setTotalFrames] = useState([]);
    const [totalPages, setTotalPages] = useState([]);

    const [start, setStart] = useState(false);
    const [message, setMessage] = useState("");

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
            const newUsageTimes = [...usageTimes];

            const page = Math.floor((dir) / frameSize);

            let frame;
            let fisDir;
            let swapIn;
            let swapOut = "";
            let newLog = "";

            frames.forEach(frame => {
                if (frame !== "x") {
                    newUsageTimes[frame] += 1;
                }
            })

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
            setUsageTimes(newUsageTimes);
            setIndexDir(indexDir + 1);
        }
    }
    )

    function isPageOnFrames(pageNumber) {
        const found = frames.find(frame => frame === pageNumber)

        return found != undefined ? true : false
    }

    function getFrameNumber(page) {
        const number = frames.findIndex(frame => frame === page)

        return number;
    }

    function isPage(pageNumber) {
        const found = pages.find(page => page === pageNumber);

        return found ? true : false;
    }

    function ValidateForm() {
        const frameSize = parseInt(document.getElementById('frameSize').value)
        const framesNumber = parseInt(document.getElementById('framesNumber').value)
        const SOSize = document.getElementById('SOSize').value;
        const processSize = document.getElementById('processSize').value;
        const directions = document.getElementById('directions').value;

        return (frameSize && framesNumber && SOSize && processSize && directions) ? true : false;
    }

    function isValidSOSize() {
        const SOSize = document.getElementById('SOSize').value;
        const frameSize = parseInt(document.getElementById('frameSize').value)
        const framesNumber = parseInt(document.getElementById('framesNumber').value);

        return Math.ceil(SOSize / frameSize) < framesNumber ? true : false
    }

    const handleClick = () => {
        if (ValidateForm()) {
            const frameSize = parseInt(document.getElementById('frameSize').value)
            const framesNumber = parseInt(document.getElementById('framesNumber').value)
            const SOSize = document.getElementById('SOSize').value;
            processSize = document.getElementById('processSize').value;
            const diskSize = document.getElementById('diskSize').value;

            if (isValidSOSize()) {
                setFrameSize(frameSize);
                setTotalFrames(new Array(framesNumber).fill("x"));
                setFrames(new Array(Math.floor(framesNumber - SOSize / frameSize)).fill("x"))

                if (processSize < diskSize) {
                    const numPages = Math.ceil(processSize / frameSize)

                    setTotalPages(new Array(Math.ceil(diskSize / frameSize)).fill("x"))

                    setPages(new Array(numPages).fill(0));
                    setFrameAsigned(new Array(numPages).fill(""));
                    setValid(new Array(numPages).fill(0));
                    setModified(new Array(numPages).fill(0));
                    setUsageTimes(new Array(numPages).fill(0));
                    setStart(true);

                    const diskRepresentation = document.getElementById('diskRepresentation');
                    diskRepresentation.focus()
                } else {
                    alert("El tamaño del proceso debe ser menor al tamaño del disco")
                }
            } else {
                alert(`El tamaño del sistema operativo debe ser menor a ${frameSize * (framesNumber - 1)}`);
            }

        } else {
            alert("Debe diligenciar todos los campos");
        }
    }

    async function showFile(e) {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const lines = (e.target.result).split("\n")
            const directions = lines[0].split(",");
            const operations = lines[1].split(",");

            setDirections(directions)
            setOperations(operations)
        };
        reader.readAsText(e.target.files[0])
    }


    return (
        <div className='container'>
            {!start ?
                <DataForm
                    handleClick={handleClick}
                    showFile={showFile}
                /> :
                <div> </div>
            }

            {
                start ?
                    <div className='container'>
                        <div>
                            <button className='btn btn-large btn-primary' onClick={() => eventEmitter.emit('next')}>Siguiente</button>
                        </div>

                        <div>
                            <p><b>Fallos de página: </b> {pageFail}</p>
                        </div>

                        <div>
                            <p><b>Reemplazos: </b> {pageFail - frames.length > 0 ? pageFail - frames.length : 0}</p>
                        </div>

                        <div>
                            <PaginationTable
                                directions={directions}
                                operations={operations}
                                pageNumbers={pageNumbers}
                                frameNumbers={frameNumbers}
                                fisDirs={fisDirs}
                                swapIns={swapIns}
                                swapOuts={swapOuts}
                            />
                        </div>

                        <div className='element-container'>
                            <MemoryRepresentation
                                totalFrames={totalFrames}
                                frames={frames}
                            />

                            <PageTable
                                pages={pages}
                                variants={variants}
                                frameAsigned={frameAsigned}
                                valid={valid}
                                modified={modified}
                                usageTimes={usageTimes}
                            />
                        </div>
                        <div className='element-container'>
                            <DiskRepresentation
                                totalPages={totalPages}
                                pages={pages}
                            />
                            <FrameTable
                                frames={frames}
                                variants={variants}
                            />

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
                    </div> : <div></div>
            }

        </div>
    )
}

export default Home