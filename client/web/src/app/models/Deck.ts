import { Card } from "./Card";

export type Deck={
    id?:string;
    title:string;
    description?:string;
    owner:number;
    favorite:boolean;
    cards:Card[];
}