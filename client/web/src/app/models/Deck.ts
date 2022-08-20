import { Card } from "./Card";

export type Deck={
    _id?:string;
    title:string;
    description?:string;
    owner:number;
    favorite:boolean;
    cards:Card[];
}