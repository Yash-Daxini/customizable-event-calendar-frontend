export const replaceIdsInUrl = (url: string, ids: number[]) => {
    try {
        const regExp: RegExp = /:[a-zA-Z]+/g;
        const occurrences: string[] = [...url.matchAll(regExp)].map(match => match[0]);

        if (!occurrences)
            return url;

        ids.forEach((id, index) => {
            url = url.replace(occurrences[index], id.toString());
        });

        return url;
    }
    catch (exception) {
        console.error("Can't replace ids in url.")
    }
}