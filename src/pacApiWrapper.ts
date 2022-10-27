
interface PacApiWrapperOptions {
    pacHost: string;
    pacProtocol?: 'http' | 'https',
}

interface SearchApiOptions {
    "searchTerm": string,
    "startIndex": number,
    "hitsPerPage": number,
    // "facetFilters": [],
    // "branchFilters": [],
    // "sortCriteria": "Relevancy",
    // "targetAudience": "",
    // "addToHistory": true,
    // "dbCodes": [],
    // "audienceCharacteristicsFilters": [],
    // "readingLevelFilters": null
}

export function parseSearchApiOptions<Opts extends Partial<SearchApiOptions>>(
 {
    searchTerm = "",
    startIndex = 0,
    hitsPerPage = 20
 }: Opts
): SearchApiOptions {
    return {
        searchTerm,
        startIndex,
        hitsPerPage
    }
}

export function createPacApiWrapper({
    pacHost,
    pacProtocol = 'https',
}: PacApiWrapperOptions) {
    function fetchWrapper<BodyType>(resource: string, body: BodyType) {
        return fetch(`${pacProtocol}://${pacHost}/${resource}?_=${Date.now()}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(r => r.json())
    }

    return {
        search: function ({ searchTerm, startIndex, hitsPerPage }: SearchApiOptions) {
            return fetchWrapper('search', {
                searchTerm,
                startIndex,
                hitsPerPage,
                facetFilters: [],
                branchFilters: [],
                sortCriteria: "Relevancy",
                targetAudience: "",
                addToHistory: true,
                dbCodes: [],
                audienceCharacteristicsFilters: [],
                readingLevelFilters: null
            })
        }
    }

}