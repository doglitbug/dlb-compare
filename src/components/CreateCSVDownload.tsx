/**
 * Generate and down a CSV of the provided data
 * @param headers 1d array of column headers
 * @param data 2d array of string data
 * @param filename name to download as
 * @constructor
 */
export function DownloadCSV(headers: string[], data: string[][], filename: string): void {
    const csv = [];
    let rows: string[] = [];

    csv.push(`${headers.map(header => MakeSafe(header)).join(",")}\n`);

    for (const row of data) {
        rows.push(row.map(item => MakeSafe(item)).join(","));
    }
    csv.push(rows.join("\n"));

    const blob = new Blob(csv, {type: "text/csv"});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `${filename}.csv`);
    a.click();
}

function MakeSafe(input: string): string {
    if (input === "" || input===null) return ""
    return RequiresQuotes(input) ? SurroundWithQuotes(DoubleQuote(input)) : input;
}

function RequiresQuotes(input: string): boolean {
    return input.includes(',') || input.includes('"');
}

function DoubleQuote(input: string): string {
    return input.replace(/"/g, '""');
}

function SurroundWithQuotes(input: string): string {
    return '"' + input + '"';
}