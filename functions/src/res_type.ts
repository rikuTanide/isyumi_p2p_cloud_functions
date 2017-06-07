export interface Response {

}

export interface OnOtherDeviceLogin {
    group_id:string;
    device_id:string;
}

export interface OnGroupCreate {
    group_id:string;
    device_id:string;
}

export interface ItemRequest {
    group_id:string;
    item_id_list:string[];
    give_device_id:string;
    take_device_id:string;
    take_peer_id:string;
}

export interface ItemRequestForAll {
    group_id:string;
    item_id_list:string[];
    take_device_id:string;
    take_peer_id:string;
}