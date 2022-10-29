
interface SearchApiOptions {
    searchTerm: string,
    startIndex: number,
    hitsPerPage: number,
    facetFilters: string[],
    branchFilters: string[],
    sortCriteria: string,
    targetAudience: string,
    addToHistory: true,
    dbCodes: string[],
    audienceCharacteristicsFilters: string[],
    readingLevelFilters: null
}

export function parseSearchApiOptions<Opts extends Partial<SearchApiOptions>>(
    {
        searchTerm = "",
        startIndex = 0,
        hitsPerPage = 20,
        facetFilters = [],
        branchFilters = [],
        sortCriteria = "Relevancy",
        targetAudience = "",
        addToHistory = true,
        dbCodes = [],
        audienceCharacteristicsFilters = [],
        readingLevelFilters = null
    }: Opts
): SearchApiOptions {
    return {
        searchTerm,
        startIndex,
        hitsPerPage,
        facetFilters,
        branchFilters,
        sortCriteria,
        targetAudience,
        addToHistory,
        dbCodes,
        audienceCharacteristicsFilters,
        readingLevelFilters
    }
}

export function createPacApiWrapper(pacHost: string) {
    function fetchWrapper<OptionsType>(resource: string, optionsParser: (options: Partial<OptionsType>) => OptionsType) {
        return function (options: Partial<OptionsType>) {
            return fetch(`https://${pacHost}/${resource}?_=${Date.now()}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(optionsParser(options))
            }).then(r => r.json())
        }
    }

    return {
        search: fetchWrapper('search', parseSearchApiOptions)
    }

}