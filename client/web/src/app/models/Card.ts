import { Answer } from "./Answer";

export type Card={
    question:string,
    answers:Answer[],
    confirmed:boolean;
}