import { Card } from "./Card";

export type Deck={
    id?:string;
    title:string,
    description?:string,
    cards:Card[];
}