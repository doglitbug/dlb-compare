/**
 *
 * @param formats Data on detectable formats
 * @param inputData Forename, Surname, Email
 */
export function detectFormat(inputData: string[][], formats: any): number[] {
    let results: number[] = Array(formats.length).fill(0);

    inputData.forEach(input => {
        let resultFound: boolean = false;
        for (let i = 1; i < formats.length; i++) {
            var username = input[2].split("@")[0];
            if (isRegExMatch(username, formats[i].regex)) {
                resultFound = true;
                results[i] = results[i] + 1;
            }
        }
        //TODO Check for 2 letters FN+2 Letter SN etc
        if (!resultFound) results[0]++;

    });

    return results;
}

/**
 *
 * @param input Forename, Surname, Email
 * @param formats Data on detectable formats
 * @param index Format index (TODO Remove this?)
 */
export function confirmFormat(input: string[], formats: any, index: number): boolean {
    //TODO Combine with detectFormat for less code duplication

    var username = input[2].split("@")[0];
    if (isRegExMatch(username, formats[index].regex)) {
        return true;
    }
    //TODO Check for 2 letters FN+2 Letter SN etc

    return false;
}

/**
 * Convert a regex match into a string no matter what (thanks typescript)
 * @param input input string
 * @param regex regex string
 * @param match match number
 * @returns string of result or an empty string
 */
export function getRegExMatch(input: string, regex: string, match: number): string {
    let output: string = "";
    let regexExec = RegExp(regex, "gi");
    let matches = input.match(regexExec);
    if (matches) {
        output = matches[match];
    }

    return output;
}

/**
 * Is this string a match to the provided regex?
 * @param input input string
 * @param regex regex string
 * @returns true if the regex pattern matches
 */
export function isRegExMatch(input: string, regex: string): boolean {
    return getRegExMatch(input, regex, 1) !== "";
}

/**
 * Get all regex matches from the provided string
 * @param input input string
 * @param regex regex string
 * @return RegExpMatchArray of results
 */
export function getRegExMatches(input: string, regex: string): RegExpMatchArray {
    let regexExec = RegExp(regex, "gi");
    return Array.from(input.matchAll(regexExec))[0];
}