import {Context} from "../process";
import {OnDeviceLogin} from "../req_type";
import {OnOtherDeviceLogin} from "../res_type";

export async function doLoginRequest(context: Context, login_request: OnDeviceLogin) {
    let registered_user_id = await context.query.queryDeviceID(login_request.device_id);
    let user_id = context.user_id;

    console.log([registered_user_id, user_id]);

    if (registered_user_id != null && registered_user_id != user_id) {
        return;
    }

    await context.put_registry.setDeviceID(login_request.device_id, user_id);

    let all_belong_group_list = await context.query.queryAllMember();
    console.log(all_belong_group_list);
    let belong_group_id_list = all_belong_group_list.filter(b => b.user_id == user_id).map(b => b.group_id);
    console.log(belong_group_id_list);

    for (let belong_group_id of belong_group_id_list) {
        let member_user_id_list = all_belong_group_list.filter(b => b.group_id == belong_group_id).map(b => b.user_id);
        for (let member_user_id of member_user_id_list) {
            await context.put_user.pushOnOtherDeviceLogin(member_user_id, <OnOtherDeviceLogin>{
                group_id: belong_group_id,
                device_id: login_request.device_id,
            });
        }
    }

}