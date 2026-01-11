export type Menu = {
    id?: number;
    name?: string;
    display_name?: string;
    groups_id?: number[];
    web_icon?: string;
    web_icon_data?: string;
    parent_id?: number[];
    parent_path?: string;
    action?: string;
    active?: boolean;
    child_id?: number[];
    complete_name?: string;
    [key: string]: any;
}
export type User = {
    id?: number;
    name?: string;
    email?: string;
    image_256?: string;
    groups_id?: any[];
    menu?: Menu[];
    [key: string]: any
}