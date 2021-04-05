export type THeaderColumn = {
    key: string;
    value: string;
    sortable: boolean;
    showOnMobile?: boolean;
}

export type TBodyColumn = {
    key: string;
    renderFunction: (item: any) => JSX.Element;
    showOnMobile?: boolean;
}
