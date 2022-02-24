import { IFaculty } from "./IFaculty";

export interface IUniversity {
    title: string;
    provincia: string;
    Facultades: IFaculty[];
}