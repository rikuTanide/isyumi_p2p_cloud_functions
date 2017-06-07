import {Context} from "../process";
import {AddItem} from "../req_type";


export async function doAddItemRequest(context: Context, add_item: AddItem) {
    // 曲を追加する

    let item_list = await context.query.queryAllItem();
    let new_item_list = item_list.concat([{
        group_id: add_item.group_id,
        item_id: add_item.item_id,
        title: add_item.title,
        publish_user_id: context.user_id,
        hash: add_item.hash
    }]);

    await context.put_registry.setItemList(new_item_list);

    // サウンドリストを設定する
    await updateUserItemList(context, add_item.group_id);

}
export async function updateUserItemList(context: Context, group_id: string) {
    let new_group_item_list = (await context.query.queryAllItem()).filter(s => s.group_id == group_id);

    let member_list = await context.query.queryAllMember();
    let belong_member_user_id_list = member_list.filter(b => b.group_id == group_id).map(b => b.user_id);

    for (let belong_member_user_id of belong_member_user_id_list) {
        await context.put_user.setItemList(belong_member_user_id, group_id, new_group_item_list);
    }
}