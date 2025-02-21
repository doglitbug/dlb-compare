import * as React from "react";
import * as Papa from "papaparse";
import {detectFormat} from "./DetectFormat";

interface myProps {
    setData: (data: string[][]) => void;
    setFormatMatrix: (formatMatrix: number[]) => void;
    formats: any;
}

export const ImportExistingData = (props: myProps) => {
    const {setData, setFormatMatrix, formats} = props;
    const [csvFile, setCsvFile] = React.useState<File>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setCsvFile(event.target.files[0]);
        }
    };

    const handleFileSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if (csvFile === undefined) return;

        Papa.parse(csvFile, {
            header: false,
            skipEmptyLines: true,
            complete: function (result: Papa.ParseResult<unknown>) {
                var existingData = result.data.splice(1) as string[][];
                setData(existingData);
                var results = detectFormat(existingData, formats);
                setFormatMatrix(results);
            },
        });
    };

    return (
        <div>
            <form id="existing-data-form" onSubmit={() => {
            }}>
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