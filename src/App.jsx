import React, {useState} from 'react'

import './App.css'
import {ImportExistingData} from "./components/ImportExistingData.js";
import {ImportNewData} from "./components/ImportNewData.js";
import {DisplayTabularData} from "./components/DisplayTabularData.js";
import {formatData} from "./components/formats.json";

function App() {
    const [existingData, setExistingData] = useState([]);
    const [formatMatrix, setFormatMatrix] = useState([]);
    const [outputData, setOutputData] = useState([]);

    return (
        <>
            <h1>dlb-compare</h1>
            <h2>Problem:</h2>
            <p>Schools provide data that contains alternative email addresses that are no longer picked up by regular
                expressions, or their replacement: domain checking.</p>
            <p>For example: a school using the format of <code>[Student ID]@school.com</code> as their primary format,
                and this will
                be used for LTI integrations or Single Sign On.</p>
            <p>Then one teacher sends in or uses their alternative
                format: <code>[Forename].[Surname]@school.com</code><br/>
                This will create duplicate accounts which we want to avoid</p>
            <p>
                Previous this would have been picked up by a Regular Expression such
                as <code>{'^\\d{5,6}@school\\.com$'}</code>
            </p>

            <hr/>
            <h2>Solution:</h2>

            <p>Use existing data to generate a likely format and apply to future uploads as a warning about
                mis-matches</p>

            <hr/>
            <h2>Testing:</h2>
            <h3>Import existing account data and generate a likely format:</h3>
            <ImportExistingData setData={setExistingData} setFormatMatrix={setFormatMatrix} formats={formatData}/>
            <hr/>
            <h3>Detected formats:</h3>

            {formatData.map((value, index) => (
                <div key={index}><code>{value.name} - {formatMatrix[index]}</code></div>
            ))}
            <br/><br/>
            <b>Highest ranked format:&nbsp;
                <code>{formatMatrix.length > 0 && formatData[formatMatrix.indexOf(Math.max(...formatMatrix))].name}</code>
            </b>
            <hr/>

            <h3>Import new data and compare:</h3>
            <ImportNewData existingData={existingData} formatIndex={formatMatrix.indexOf(Math.max(...formatMatrix))} formats={formatData} setData={setOutputData}/>
            <hr/>

            <h3>Output</h3>
            <DisplayTabularData filename={"output.csv"} headers={["Forename","Surname","Email", "Status"]} data={outputData}/>
        </>
    )
}

export default App
