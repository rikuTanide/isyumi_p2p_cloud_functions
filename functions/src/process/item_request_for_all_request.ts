import {Context} from "../process";
import {ItemRequestForAll} from "../req_type";
import * as Response from "../res_type";

export async function doItemRequestForAll(context: Context, item_request_for_all: ItemRequestForAll) {

    // そのバンドの全員にリクエストが送られる
    let all_member = await context.query.queryAllMember();
    let belong_member_user_id_list = all_member.filter(b => b.group_id == item_request_for_all.group_id).map(b => b.user_id);

    for (let belong_group_user_id of belong_member_user_id_list) {
        await context.put_user.pushItemRequestForAll(belong_group_user_id, <Response.ItemRequestForAll>{
            group_id: item_request_for_all.group_id,
            item_id_list: item_request_for_all.item_id_list,
            take_device_id: item_request_for_all.take_device_id,
            take_peer_id: item_request_for_all.take_peer_id,
        });
    }

}
