import * as React from "react";
import * as Papa from "papaparse";
import {confirmFormat} from "./DetectFormat";

interface myProps {
    setData: (data: string[][]) => void;
    formatIndex: number;
    formats:any;
}

export const ImportNewData = (props: myProps) => {
    const {setData, formatIndex, formats} = props;
    const [csvFile, setCsvFile] = React.useState<File>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setCsvFile(event.target.files[0]);
        }
    };

    const handleFileSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (csvFile === undefined) return;
        var existingData;

        Papa.parse(csvFile, {
            header: false,
            skipEmptyLines: true,
            complete: function (result: Papa.ParseResult<unknown>) {
                existingData = result.data.splice(1) as string[][];

                //Check data
                existingData.forEach(input =>{
                    input.push(confirmFormat(input, formats, formatIndex)?"Yes":"No");
                });
                console.table(existingData);
                setData(existingData);
            },
        });


    };

    return (
        <div>
            <form id="new-data-form" onSubmit={() => {
            }}>
                <label htmlFor="file">Import new data:</label>
                <br/>
                <input
                    type="file"
                    name="file"
                    id="file"
                    accept=".csv"
                    onChange={(event) => {
                        handleFileChange(event);
                    }}
                ></input>

                <button
                    onClick={(event) => {
                        handleFileSubmit(event);
                    }}
                >
                    Process
                </button>
            </form>
        </div>
    );
};