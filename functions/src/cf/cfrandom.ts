import {randomBytes} from "crypto";
import {Random} from "../process";

export class CFRandom implements Random {
    getRandom(length: number): string {
        return randomBytes(length).toString('hex');
    }
}