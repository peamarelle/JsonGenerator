import { IFaculty } from "./IFaculty";

export interface IUniversity {
    title: string;
    provincia: string;
    facultades: IFaculty[];
}