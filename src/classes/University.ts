import { IFaculty } from "@/interfaces/IFaculty";
import { IUniversity } from "@/interfaces/IUniversity";

export class University implements IUniversity {
    title: string;
    provincia: string;
    Facultades: IFaculty[];

    constructor(_title: string, _provincia: string, _facultades: IFaculty[]) {
        this.title = _title;
        this.provincia = _provincia;
        this.Facultades = _facultades;
    }
}