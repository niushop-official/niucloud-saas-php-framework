export function formatDateTime(dateTime){
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = date.getHours();

    return `${year}-${month}-${day} ${hour}点`;
}
export function formatRange(startDateTime, endDateTime) {
    const startFormatted = formatDateTime(startDateTime);
    const endDate = new Date(endDateTime);
    let endFormatted;

    // 检查是否是00:00，如果是则替换为24点
    if (endDate.getHours() === 0 && endDate.getMinutes() === 0 && endDate.getSeconds() === 0) {
        const endYear = endDate.getFullYear();
        const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
        const endDay = String(endDate.getDate()).padStart(2, '0');
        endFormatted = `${endYear}-${endMonth}-${endDay} 24点`;
    } else {
        endFormatted = formatDateTime(endDateTime);
    }

    return `${startFormatted} 至 ${endFormatted}`;
}
export function inArray(elem, arr) {
    if (arr == null) return -1; // 如果数组为空，则返回 -1

    if (elem === -1) {
        // 找到数组中所有值为 -1 的下标
        const negativeOneIndexes = arr
            .map((value, index) => (value === -1 ? index : -1))
            .filter(index => index !== -1);

        // 如果没有找到值为 -1 的下标，返回 -1
        if (negativeOneIndexes.length === 0) return -1;

        // 随机选择一个值为 -1 的下标
        const randomIndex = Math.floor(Math.random() * negativeOneIndexes.length);
        return negativeOneIndexes[randomIndex];
    }

    // 否则，正常返回 elem 在数组中的下标
    return arr.indexOf(elem);
}
export function cover(str){
    if (typeof str == 'string' && str.length > 0) {
        return str.substr(0, 1) + '******' + str.substr(-1);
    } else {
        return '';
    }
}
export  function convertToQueryParams(obj) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(obj)) {
        params.append(key, value.toString());
    }
    return params.toString();
}