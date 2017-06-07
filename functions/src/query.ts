import * as Entity from "./entity";
export interface Query {
    queryDeviceID(device_id): Promise<string>;
    queryAllGroup(): Promise<Entity.Group[]>;
    queryAllMember(): Promise<Entity.Member[]>;
    queryAllJoinRequest(): Promise<Entity.GroupJoinRequest[]>;
    queryAllItem(): Promise<Entity.Item[]>;
}