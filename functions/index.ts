import * as functions from "firebase-functions";
import {CFQuery} from "./src/cf/cfquery";
import {CFPutRegistry, CFPutUser} from "./src/cf/cfput";
import {
    AcceptGroupJoinRequest,
    AddItem,
    GroupJoinRequest,
    CreateGroup,
    DeleteItem,
    OnDeviceLogin,
    RejectGroupJoinRequest,
    ItemRequest,
    ItemRequestForAll
} from "./src/req_type";
import {Context} from "./src/process";
import {doGroupJoinRequest} from "./src/process/group_join_request";
import {doLoginRequest} from "./src/process/login_request";
import {CFRandom} from "./src/cf/cfrandom";
import {doCreateGroupRequest} from "./src/process/create_group_request";
import {doItemRequest} from "./src/process/item_request";
import {doItemRequestForAll} from "./src/process/item_request_for_all_request";
import {doAddItemRequest} from "./src/process/add_item_request";
import {doItemDeleteRequest} from "./src/process/item_delete_request";
import {doAcceptGroupJoinRequest} from "./src/process/accept_gropu_join_request";
import {doRejectGroupJoinRequest} from "./src/process/reject_group_join_request";


export let request = functions.database.ref("/write/{user_id}/{id}").onWrite(async e => {
    let user_id = e.params["user_id"];
    let val = e.data.val();

    let type = (val as { type: string, payload: any }).type;
    let query = new CFQuery(e);
    let put_registry = new CFPutRegistry(e);
    let put_user = new CFPutUser(e);
    let random = new CFRandom();

    let context = <Context>{
        user_id: user_id,
        put_user: put_user,
        put_registry: put_registry,
        query: query,
        random: random,
    };

    switch (type) {
        case "accept_group_join_request":
            await doAcceptGroupJoinRequest(context, val.payload as AcceptGroupJoinRequest);
            return;
        case "reject_group_join_request":
            await doRejectGroupJoinRequest(context,val.payload as RejectGroupJoinRequest);
            return;
        case "group_join_request":
            await doGroupJoinRequest(context, val.payload as GroupJoinRequest);
            return;
        case "on_device_login":
            await doLoginRequest(context, val.payload as OnDeviceLogin);
            return;
        case "create_group":
            await doCreateGroupRequest(context, val.payload as CreateGroup);
            return;
        case "item_request":
            await doItemRequest(context, val.payload as ItemRequest);
            return;
        case "item_request_for_all":
            await doItemRequestForAll(context, val.payload as ItemRequestForAll);
            return;
        case "add_item":
            await doAddItemRequest(context, val.payload as AddItem);
            return;
        case "delete_item":
            await doItemDeleteRequest(context, val.payload as DeleteItem);
            return;
    }
});