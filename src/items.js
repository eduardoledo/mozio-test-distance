export const items = [
    { id: 'ba', label: 'Buenos Aires', lat: -34.6156648, long: -58.5733846 },
    { id: 'ny', label: 'New York', lat: 42.7287701, long: -78.013694 },
    { id: 'tk', label: 'Tokio', lat: 35.6735408, long: 139.570301 },
    { id: 'ams', label: 'Amsterdam', lat: 52.354775, long: 4.7585387 },
];

export const filterItems = (id) => {
    const filtered = items.filter((item) => item.id === id);
    if (filtered.length > 0) {
        return filtered.pop();
    }

    return null;
}