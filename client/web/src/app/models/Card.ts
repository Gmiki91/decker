import { Answer } from "./Answer";

export type Card={
    front:string,
    back:Answer[],
    confirmed:boolean;
}