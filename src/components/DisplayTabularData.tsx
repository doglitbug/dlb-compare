import * as React from "react";
import {DownloadCSV} from "./CreateCSVDownload"

interface myProps {
    filename: string;
    headers: string[];
    data: string[][];
}

export const DisplayTabularData = (props: myProps) => {
    return (
        <div>
            <button onClick={() => DownloadCSV(props.headers, props.data, props.filename)}>Export CSV</button>
            &nbsp;{props.data.length}&nbsp; rows.
            <table className="display">
                {props.headers && <TableHeader columnHeaders={props.headers}/>}
                {props.data && <TableBody data={props.data.slice(0, 10)}/>}
            </table>
        </div>
    );
};

const TableHeader = (props: { columnHeaders: string[] }) => {
    return (
        <thead>
        <tr>
            {props.columnHeaders.map((header) => (
                <th key={header}>{header}</th>
            ))}
        </tr>
        </thead>
    );
};

const TableBody = (props: { data: string[][] }) => {
    return (
        <tbody>
        {props.data.map((data, row) => (
            <tr key={row}>
                {data.map((item, column) => (
                    <td key={column}>{item}</td>
                ))}
            </tr>
        ))}
        </tbody>
    );
};