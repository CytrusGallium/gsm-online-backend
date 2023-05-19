export function getTodayDateRange() {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).setHours(0, 0, 0, 0);
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).setHours(23, 59, 59, 999);

    return { startOfDay: new Date(startOfDay), endOfDay: new Date(endOfDay) };
}

export function getYesterdayDateRange() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const startOfDay = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()).setHours(0, 0, 0, 0);
    const endOfDay = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()).setHours(23, 59, 59, 999);

    return { startOfDay: new Date(startOfDay), endOfDay: new Date(endOfDay) };
}