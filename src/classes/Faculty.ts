import { IFaculty } from "@/interfaces/IFaculty";

export class Faculty implements IFaculty {
    title: string;
    Carreras: any[];

    constructor(_title: string, _carreras: any[]) {
        this.title = _title;
        this.Carreras = _carreras;
    }
}