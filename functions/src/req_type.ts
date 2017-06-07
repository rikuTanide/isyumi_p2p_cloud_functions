export interface OnDeviceLogin {
    device_id: string;
}

export interface GroupJoinRequest {
    group_id: string;
    member_name: string;
}

export interface AcceptGroupJoinRequest {
    group_id: string;
    user_id: string;
}

export interface RejectGroupJoinRequest {
    group_id: string;
    user_id: string;
}

export interface CreateGroup {
    group_name: string;
    member_name: string;
    device_id: string;
}

export interface ItemRequest {
    group_id: string;
    item_id_list: string[];
    give_device_id: string;
    take_device_id: string;
    take_peer_id: string;
}

export interface ItemRequestForAll {
    group_id: string;
    item_id_list: string[];
    take_device_id: string;
    take_peer_id: string;
}

export interface AddItem {
    group_id: string;
    item_id: string;
}

export interface DeleteItem {
    group_id: string;
    item_id: string;
}