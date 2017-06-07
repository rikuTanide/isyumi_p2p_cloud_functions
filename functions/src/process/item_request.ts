import {Context} from "../process";
import {ItemRequest} from "../req_type";
import * as Response from "../res_type";

export async function doItemRequest(context: Context, item_request: ItemRequest) {
    // 要求がPushされる

    let user_id = await context.query.queryDeviceID(item_request.give_device_id);

    if (user_id == null) {
        return;
    }

    await context.put_user.pushItemRequest(user_id, <Response.ItemRequest>{
        group_id: item_request.group_id,
        item_id_list: item_request.item_id_list,
        give_device_id: item_request.give_device_id,
        take_device_id: item_request.take_device_id,
        take_peer_id: item_request.take_peer_id,
    });

}