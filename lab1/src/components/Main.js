import { React, useEffect, useState } from "react";
import styles from "../styles/Main.module.css"
import { saveAs } from "file-saver";
import "../index.css"
import * as caesar from "../logic/caesar.js"
import * as vigenere from "../logic/vigenere.js"


const compression_types = {
    caesar: "caesar",
    vigenere: "vigenere"
}

let compression_options = [];

for (const [key, value] of Object.entries(compression_types)) {
    compression_options.push(<option value={value}>{key}</option>);
}

export function Main() {
    const [ file, setFile ] = useState({});
    const [ key, setKey ] = useState("");
    const [ shift, setShift ] = useState(null);
    const [ fileName, setFileName ] = useState("");
    const [ result, setResult ] = useState("");
    const [ compressionType, setCompressionType ] = useState(compression_types.caesar);

    function handleFileChange(e)
    {
        setFile(e.target.files[0]);
        setFileName(e.target.value);
    }

    function handleKeyChange(e)
    {
        setKey(e.target.value);
    }

    function handleShiftChange(e)
    {
        setShift(e.target.value);
    }

    function handleCompressionTypeChange(e)
    {
        setCompressionType(e.target.value);
    }

    function handleCompress()
    {
        const reader = new FileReader();
        reader.onload = async (e) => { 
            let text = e.target.result;
            if (compressionType === compression_types.caesar)
                setResult(caesar.Compress(text, Number(shift)));
            else
                setResult(vigenere.Compress(text, key));
        };
        reader.readAsText(file);
    }

    function handleDecompress()
    {
        const reader = new FileReader();
        reader.onload = async (e) => { 
            let text = e.target.result;
            if (compressionType === compression_types.caesar)
                setResult(caesar.Decompress(text, Number(shift)));
            else
                setResult(vigenere.Decompress(text, key));
        };
        reader.readAsText(file);
    }

    function handleSave()
    {
        const resFile = new Blob([result], { type: 'text/plain;charset=utf-8' });
        let name = prompt("Enter file name", "undefined.txt");
        if (name != null)
            saveAs(resFile, name);
    }

    return (
        <div>
            <form>
                <label>Choose file</label>
                <br />
                <input type="file" onChange={handleFileChange} />
                <br />
                <label>Caesar shift</label>
                <br />
                <input type="number" min="0" max="25" onChange={handleShiftChange} />
                <br />
                <label>Vigenere key</label>
                <br />
                <input type="text" onChange={handleKeyChange} />
                <br />
                <label>Choose compression type</label>
                <br />
                <select value={compressionType} onChange={handleCompressionTypeChange}>
                    {compression_options}
                </select>
                <br />
                <button type="button" onClick={handleCompress} disabled={fileName === "" || (compressionType === compression_types.caesar && shift === null) || (compressionType === compression_types.vigenere && key === "")}>Compress</button>
                <br />
                <button type="button" onClick={handleDecompress} disabled={fileName === "" || (compressionType === compression_types.caesar && shift === null) || (compressionType === compression_types.vigenere && key === "")}>Decompress</button>
            </form>
            <div style={{ height: "400px", width: "400px" }}>
                {result}
            </div>
            <form>
                <button type="button" onClick={handleSave} disabled={result === ""}>Save</button>
            </form>
        </div>
    );
}

export default Main;