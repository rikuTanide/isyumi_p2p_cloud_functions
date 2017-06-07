import {Context} from "../process";
import {CreateGroup} from "../req_type";
import {updateBelongGroupList} from "./accept_group_join_request";
import {Member} from "../state";

export async function doCreateGroupRequest(context: Context, create_group: CreateGroup) {
    let group_list = await context.query.queryAllGroup();

    let group_id = context.random.getRandom(16);
    let new_group_list = group_list.concat([{group_id: group_id, group_name: create_group.group_name}]);
    await context.put_registry.setGroupList(new_group_list);

    let member_list = await context.query.queryAllMember();
    let new_member_list = member_list.concat([{
        group_id: group_id,
        user_id: context.user_id,
        member_name: create_group.member_name
    }]);

    await context.put_registry.setMemberList(new_member_list);

    let all_group_belong_list = await context.query.queryAllMember();

    await updateBelongGroupList(context, context.user_id, all_group_belong_list);


    // ここはテスト書いてない

    await context.put_user.setMemberList(context.user_id, group_id, [{
        user_id: context.user_id,
        member_name: create_group.member_name,
        group_id: group_id
    }]);

    // ここまで

    await context.put_user.pushOnGroupCreate(context.user_id, {group_id: group_id, device_id: create_group.device_id});

}