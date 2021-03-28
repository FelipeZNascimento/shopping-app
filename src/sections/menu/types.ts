type TMenuDropdown = {
    display: string;
    path: string;
}

export type TMenuItem = {
    id: number;
    display: string;
    route: string;
    hasDropdown: boolean;
    dropdownOptions?: TMenuDropdown[];
}
