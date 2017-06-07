import {RejectGroupJoinRequest} from "../req_type";
import {Context} from "../process";
import {GroupJoinRequest} from "../entity";
import {updateReceiveJoinRequestListAboutAllGroupMember} from "./group_join_request";
import {updateSentJoinRequest} from "./accept_group_join_request";

async function updateJoinRequestList(context: Context, accept_join_request: RejectGroupJoinRequest, all_join_request: GroupJoinRequest[]) {
    let new_join_request = all_join_request.filter(j => j.user_id != accept_join_request.user_id || j.group_id != accept_join_request.group_id);
    await context.put_registry.setJoinRequestList(new_join_request);
}
export async function doRejectJoinRequest(context: Context, accept_join_request: RejectGroupJoinRequest) {
    // 参加申請を削除
    let all_join_request = await context.query.queryAllJoinRequest();
    await updateJoinRequestList(context, accept_join_request, all_join_request);

    let new_all_group_join_request = await context.query.queryAllJoinRequest();
    let new_member_list = await context.query.queryAllMember();

    // メンバーの受信申請一覧をアップデート
    await updateReceiveJoinRequestListAboutAllGroupMember(context, accept_join_request.group_id, new_all_group_join_request, new_member_list);

    // 本人の申請一覧をアップデート
    await updateSentJoinRequest(context, accept_join_request.user_id, new_all_group_join_request);

}