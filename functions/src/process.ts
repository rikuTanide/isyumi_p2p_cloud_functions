import {PutRegistry, PutUser} from "./put";
import {Query} from "./query";

export interface Context {
    user_id: string;
    put_user: PutUser;
    put_registry: PutRegistry;
    query: Query;
    random: Random;
}


export interface Random {
    getRandom(length: number):string;
}
