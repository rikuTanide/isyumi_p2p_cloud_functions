import {Context} from "../process";
import {DeleteItem} from "../req_type";
import {updateUserItemList} from "./add_item_request";
export async function doItemDeleteRequest(context: Context, item_delete: DeleteItem) {
    let all_item_list = await context.query.queryAllItem();
    let new_item_list = all_item_list.filter(b => b.group_id != item_delete.group_id || b.item_id != item_delete.item_id);
    await context.put_registry.setItemList(new_item_list);
    await updateUserItemList(context, item_delete.group_id);
}