export default function createDate(dateIso) {
    const date = new Date(dateIso);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return {
        end: year + ' / ' + month + ' / ' + day,
        start: day + ' / ' + month + ' / ' + year
    }
}