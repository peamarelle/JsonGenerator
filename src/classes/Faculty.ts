import { IFaculty } from "@/interfaces/IFaculty";

export class Faculty implements IFaculty {
    title: string;
    carreras: any[];

    constructor(_title: string, _carreras: any[]) {
        this.title = _title;
        this.carreras = _carreras;
    }
}