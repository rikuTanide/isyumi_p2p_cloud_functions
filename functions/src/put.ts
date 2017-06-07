import * as State from "./state";
import * as Entity from "./entity";
import * as Response from "./res_type";

export interface PutUser {
    setSentJoinRequestList(user_id: string, sent_join_request_list: State.SentGroupJoinRequest[]): Promise<any>;
    setReceivedJoinRequestList(user_id: string, group_id: string, received_join_request_list: State.ReceiveGroupJoinRequest[]): Promise<any>;
    setBelongGroupList(user_id: string, belong_group_list: string[]): Promise<any>;
    setItemList(user_id: string, group_id: string, item_list: State.Item[]): Promise<any>;
    setMemberList(user_id: string, group_id: string, member_list: State.Member[]): Promise<any>;

    pushOnOtherDeviceLogin(user_id: string, on_other_device_login: Response.OnOtherDeviceLogin): Promise<any>;
    pushOnGroupCreate(user_id: string, on_group_create: Response.OnGroupCreate): Promise<any>;
    pushItemRequest(user_id: string, item_request: Response.ItemRequest): Promise<any>;
    pushItemRequestForAll(user_id: string, item_request: Response.ItemRequestForAll): Promise<any>;
}

export interface PutRegistry {
    setMemberList(member_list: Entity.Member[]): Promise<any>;
    setJoinRequestList(group_join_request_list: Entity.GroupJoinRequest[]): Promise<any>;
    setGroupList(new_group_list: Entity.Group[]): Promise<any>;
    setDeviceID(device_id: string, user_id: string): Promise<any>;
    setItemList(item_list: Entity.Item[]): Promise<any>;
}