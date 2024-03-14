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
        <div style={{ textAlign: "center", backgroundColor: "lightgray" }}>
            <form>
                <label style={{ margin: "40px", display: "inline-block", cursor: "pointer", borderRadius: "10px", padding: "5px", backgroundColor: "lightblue", borderStyle: "solid" }}>
                    Choose file
                    <input type="file" style={{ display: "none" }} onChange={handleFileChange} />
                </label>
                <br />

                <label style={{ display: "inline-block", marginTop: "10px", width: "200px" }}>
                    Caesar shift
                    <br />
                    <input style={{ width: "100%" }} type="number" min="0" max="25" onChange={handleShiftChange} />
                </label>
                <label style={{ display: "inline-block", marginLeft: "10px", width: "200px" }}>
                    Vigenere key
                    <br />
                    <input style={{ width: "100%" }} type="text" onChange={handleKeyChange} />
                </label>
                <br />

                <label style={{ display: "inline-block", marginTop: "10px", width: "200px" }}>
                    Choose compression type
                    <br />
                    <select style={{ width: "50%" }} value={compressionType} onChange={handleCompressionTypeChange}>
                        {compression_options}
                     </select>
                </label>
                <br />
                
                <button style={{ width: "100px", margin: "10px" }} type="button" onClick={handleCompress} disabled={fileName === "" || (compressionType === compression_types.caesar && shift === null) || (compressionType === compression_types.vigenere && key === "")}>Compress</button>
                <button style={{ width: "100px", margin: "10px" }} type="button" onClick={handleDecompress} disabled={fileName === "" || (compressionType === compression_types.caesar && shift === null) || (compressionType === compression_types.vigenere && key === "")}>Decompress</button>
            </form>
            <div style={{ margin: "auto", height: "400px", width: "400px", backgroundColor: "white" }}>
                {result}
            </div>
            <form>
                <button style={{ margin: "10px" }} type="button" onClick={handleSave} disabled={result === ""}>Save</button>
            </form>
        </div>
    );
}

export default Main;