export const productUnits = [
    {
        id: 1,
        description: 'un.'
    },
    {
        id: 2,
        description: 'kg'
    },
    {
        id: 3,
        description: 'litro'
    }
];

export const getUnitObject = (itemUnit: number) => (
    productUnits.find((unit) => unit.id === itemUnit) || productUnits[0]
);
