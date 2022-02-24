import { ICaree } from "@/interfaces/ICaree";

export class Caree implements ICaree {
    title: string;

    constructor(_title: string) {
        this.title = _title;
    }
}