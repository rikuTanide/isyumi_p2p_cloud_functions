import {PutRegistry, PutUser} from "../put";
import {Group, Member, GroupJoinRequest, Item} from "../entity";
import {ReceiveGroupJoinRequest, SentGroupJoinRequest} from "../state";
import {OnGroupCreate, OnOtherDeviceLogin, ItemRequest, ItemRequestForAll} from "../res_type";
import {DeltaSnapshot} from "firebase-functions/lib/providers/database";
import * as functions from "firebase-functions";

export class CFPutUser implements PutUser {

    e: functions.Event<DeltaSnapshot>;

    constructor(e: functions.Event<DeltaSnapshot>) {
        this.e = e;
    }

    async setSentJoinRequestList(user_id: string, sent_join_request_list: SentGroupJoinRequest[]): Promise<any> {
        await this.e.data.ref.root.child("/state")
            .child(user_id)
            .child("sent_join_request_list")
            .set(sent_join_request_list);
    }

    async setReceivedJoinRequestList(user_id: string, group_id: string, received_join_request_list: ReceiveGroupJoinRequest[]): Promise<any> {
        await this.e.data.ref.root.child("/state")
            .child(user_id)
            .child("received_join_request_list")
            .child(group_id)
            .set(received_join_request_list);
    }

    async setBelongGroupList(user_id: string, belong_group_list: string[]): Promise<any> {
        await this.e.data.ref.root.child("/state")
            .child(user_id)
            .child("belong_group_list")
            .set(belong_group_list);
    }

    async setItemList(user_id: string, group_id: string, item_list: Item[]): Promise<any> {
        await this.e.data.ref.root.child("/state")
            .child(user_id)
            .child("item_list")
            .child(group_id)
            .set(item_list);
    }

    async setMemberList(user_id: string, group_id: string, member_list: Member[]): Promise<any> {
        await this.e.data.ref.root.child("/state")
            .child(user_id)
            .child("member_list")
            .child(group_id)
            .set(member_list);

    }

    async pushOnOtherDeviceLogin(user_id: string, on_other_device_login: OnOtherDeviceLogin): Promise<any> {
        await this.e.data.ref.root.child("/notifications")
            .child(user_id)
            .push({type: "on_other_device_login", payload: on_other_device_login});
    }

    async pushOnGroupCreate(user_id: string, on_group_create: OnGroupCreate): Promise<any> {
        await this.e.data.ref.root.child("/notifications")
            .child(user_id)
            .push({type: "on_group_create", payload: on_group_create});
    }

    async pushItemRequest(user_id: string, item_request: ItemRequest): Promise<any> {
        await this.e.data.ref.root.child("/notifications")
            .child(user_id)
            .push({type: "item_request", payload: item_request});
    }

    async pushItemRequestForAll(user_id: string, item_request: ItemRequestForAll): Promise<any> {
        await this.e.data.ref.root.child("/notifications")
            .child(user_id)
            .push({type: "item_request_for_all", payload: item_request});
    }


}

export class CFPutRegistry implements PutRegistry {

    e: functions.Event<DeltaSnapshot>;

    constructor(e: functions.Event<DeltaSnapshot>) {
        this.e = e;
    }


    async setMemberList(member_list: Member[]): Promise<any> {
        await this.e.data.ref.root.child("/entities/members").set(member_list);
    }

    async setJoinRequestList(group_join_request_list: GroupJoinRequest[]): Promise<any> {
        await this.e.data.ref.root.child("/entities/join_requests").set(group_join_request_list);
    }


    async setGroupList(new_group_list: Group[]): Promise<any> {
        await this.e.data.ref.root.child("/entities/groups").set(new_group_list);
    }

    async setDeviceID(device_id: string, user_id: string): Promise<any> {
        await this.e.data.ref.root.child("/entities/device_ids").child(device_id).set(user_id);
    }

    async setItemList(item_list: Item[]): Promise<any> {
        await this.e.data.ref.root.child("/entities/items").set(item_list);
    }


}