import * as functions from "firebase-functions";
import {Query} from "../query";
import {Group, Member, GroupJoinRequest, Item} from "../entity";
import {DeltaSnapshot} from "firebase-functions/lib/providers/database";
export class CFQuery implements Query {

    e: functions.Event<DeltaSnapshot>;

    constructor(e: functions.Event<DeltaSnapshot>) {
        this.e = e;
    }

    async queryDeviceID(device_id): Promise<string> {
        return (await this.e.data.ref.root.child("/entities/devices").child(device_id).once('value')).val();
    }

    async queryAllGroup(): Promise<Group[]> {
        let val = (await this.e.data.ref.root.child("/entities/groups").once('value')).val();
        if (val == null) {
            return [];
        }
        return val;
    }

    async queryAllMember(): Promise<Member[]> {
        let val = (await this.e.data.ref.root.child("/entities/members").once('value')).val();
        if (val == null) {
            return [];
        }
        return val;
    }

    async queryAllJoinRequest(): Promise<GroupJoinRequest[]> {
        let val = (await this.e.data.ref.root.child("/entities/join_requests").once('value')).val();
        if (val == null) {
            return [];
        }
        return val;
    }

    async queryAllItem(): Promise<Item[]> {
        let val = (await this.e.data.ref.root.child("/entities/items").once('value')).val();
        if (val == null) {
            return [];
        }
        return val;
    }

}