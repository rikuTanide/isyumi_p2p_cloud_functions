import {Context} from "../process";
import * as Req  from "../req_type";
import * as Entity from "../entity";
import {ReceiveGroupJoinRequest, SentGroupJoinRequest} from "../state";
export async function doGroupJoinRequest(context: Context, group_join_request: Req.GroupJoinRequest) {


    await updateJoinRequestList(context, group_join_request);


    let all_member_list = await context.query.queryAllMember();
    let all_group_join_request_list = await context.query.queryAllJoinRequest();
    await updateReceiveJoinRequestListAboutAllGroupMember(context, group_join_request.group_id, all_group_join_request_list, all_member_list);

    await updateSendJoinRequestList(context, all_group_join_request_list);

}

async function updateSendJoinRequestList(context: Context, all_group_join_request_list: Entity.GroupJoinRequest[]) {
    let sent_join_request_list = all_group_join_request_list.filter(j => j.user_id == context.user_id).map(j => <SentGroupJoinRequest>{
        group_id: j.group_id,
        member_name: j.member_name,
    });
    await context.put_user.setSentJoinRequestList(context.user_id, sent_join_request_list);
}

async function updateJoinRequestList(context: Context, group_join_request: Req.GroupJoinRequest) {
    let join_request_list = await context.query.queryAllJoinRequest();
    let new_join_request_list = join_request_list.concat([{
        group_id: group_join_request.group_id,
        user_id: context.user_id,
        member_name: group_join_request.member_name,
    }]);
    await context.put_registry.setJoinRequestList(new_join_request_list);
}

export async function updateReceiveJoinRequestListAboutAllGroupMember(context: Context, group_id: string, all_group_join_request_list: Entity.GroupJoinRequest[], all_member_list: Entity.Member[]) {
// 処理をべき等にするため、すべて上書きする
    // あるバンドに参加リクエストが来たら
    // そのバンドの参加リクエストリストを作り
    // そのバンドに参加しているすべてのユーザーを列挙し
    // 参加リクエストリストを更新する
    //


    // このバンドの新しい受信バンドリクエスト一覧
    let new_receive_join_request_list = all_group_join_request_list
        .filter(r => r.group_id == group_id)
        .map(r => <ReceiveGroupJoinRequest>{
            user_id: r.user_id,
            member_name: r.member_name,
        });

    // このバンドに所属しているユーザー一覧
    let affect_user_list = all_member_list
        .filter(b => b.group_id == group_id)
        .map(b => b.user_id);

    for (let affect_user of affect_user_list) {
        await context.put_user.setReceivedJoinRequestList(affect_user, group_id, new_receive_join_request_list);
    }
}