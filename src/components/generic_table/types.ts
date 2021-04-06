export type THeaderColumn = {
    key: string;
    renderFunction: () => React.ReactNode;
    sortable: boolean;
    showOnMobile?: boolean;
}

export type TBodyColumn = {
    key: string;
    renderFunction: (item: any) => React.ReactNode;
    showOnMobile?: boolean;
}
