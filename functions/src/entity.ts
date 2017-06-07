export interface Group {
    group_id: string;
    group_name: string;
}

export interface Item {
    group_id: string;
    item_id: string;
    title?: string;
}

export interface Member {
    group_id: string;
    user_id: string;
    member_name: string;
}

export interface GroupJoinRequest {
    group_id: string;
    user_id: string;
    member_name: string;
}