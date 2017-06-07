import {AcceptGroupJoinRequest} from "../req_type";
import {Context} from "../process";
import {Member, GroupJoinRequest} from "../entity";
import {updateReceiveJoinRequestListAboutAllGroupMember} from "./group_join_request";
import {SentGroupJoinRequest} from "../state";

export async function doAcceptGroupJoinRequest(context: Context, accept_join_request: AcceptGroupJoinRequest) {

    let all_join_request = await context.query.queryAllJoinRequest();
    let all_member_list = await context.query.queryAllMember();

    await updateMemberList(context, accept_join_request, all_member_list, all_join_request);

    await updateJoinRequestList(context, accept_join_request, all_join_request);

    let new_all_group_join_request = await context.query.queryAllJoinRequest();
    let new_member_list = await context.query.queryAllMember();

    await updateReceiveJoinRequestListAboutAllGroupMember(context, accept_join_request.group_id, new_all_group_join_request, new_member_list);

    await updateMemberListAboundAllGroupMember(context, accept_join_request.group_id, new_member_list);

    await updateSentJoinRequest(context, accept_join_request.user_id, new_all_group_join_request);


    // 本人の参加バンド一覧を更新
    await updateBelongGroupList(context, accept_join_request.user_id, new_member_list);

    // 本人の曲一覧を更新
    let item_list = (await context.query.queryAllItem()).filter(s => s.group_id == accept_join_request.group_id);
    await context.put_user.setItemList(accept_join_request.user_id, accept_join_request.group_id, item_list);
}

async function updateMemberList(context: Context, accept_join_request: AcceptGroupJoinRequest, all_member_list: Member[], all_join_request: GroupJoinRequest[]) {
    // バンドマン一覧に追加
    let join_request = all_join_request.filter(j => j.group_id == accept_join_request.group_id && j.user_id == accept_join_request.user_id)[0];
    let member_name = join_request.member_name;

    let new_member_list = all_member_list.concat(<Member[]>[{
        user_id: accept_join_request.user_id,
        group_id: accept_join_request.group_id,
        member_name: member_name
    }]);

    await context.put_registry.setMemberList(new_member_list);
}
async function updateJoinRequestList(context: Context, accept_join_request: AcceptGroupJoinRequest, all_join_request: GroupJoinRequest[]) {
    // JoinRequestListから削除
    let new_join_request_list = all_join_request.filter(j => !(j.user_id == accept_join_request.user_id && j.group_id == accept_join_request.group_id));
    await context.put_registry.setJoinRequestList(new_join_request_list);
}

export async function updateMemberListAboundAllGroupMember(context: Context, group_id: string, new_member_list: Member[]) {
    //このバンドのバンドマン一覧
    let join_member_list = new_member_list.filter(b => b.group_id == group_id);
    let join_member_id_list = join_member_list.map(b => b.user_id);
    for (let join_member_id of join_member_id_list) {
        await context.put_user.setMemberList(join_member_id, group_id, join_member_list);
    }
}
export async function updateSentJoinRequest(context: Context, user_id: string, all_join_request: GroupJoinRequest[]) {
    // バンドメンバーのバンドマン一覧を更新
    // 本人の送信一覧を更新
    let sent_join_request = all_join_request.filter(j => j.user_id == user_id).map(j => <SentGroupJoinRequest>{
        group_id: j.group_id,
        member_name: j.member_name,
    });
    await context.put_user.setSentJoinRequestList(user_id, sent_join_request);
}
export async function updateBelongGroupList(context: Context, user_id: string, new_member_list: Member[]) {
    let belong_group_id_list = new_member_list.filter(b => b.user_id == user_id).map(b => b.group_id);
    await context.put_user.setBelongGroupList(user_id, belong_group_id_list);
}
