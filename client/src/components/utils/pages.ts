export const getPageCount = (totalCount:number, limit:number) => {
    return Math.ceil(totalCount/limit)
}

export const getPagesArray = (curPage:number, totalPages:number) => {
    let result = []
    let start = Math.floor(curPage / 10) * 10
    let start_index = start === 0 ? start + 1 : start;
    let end = start_index + 10 > totalPages ? totalPages : start_index + 10;
    let end_index = start_index === 1 ? end - 1 : end;
    end_index = end;

    for (let i=start_index; i<=end_index; i++) {
        result.push(i)
    }
    return result;
}

export const getNumberSearchPage = (page:number) => {
    return Math.floor(page / 10) + 1;
}