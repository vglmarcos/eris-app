import { IPeriodo } from "./IPeriodo";

export interface IReporte {
    _id?: string,
    id?: number,
    nombre: string,
    periodo: IPeriodo,
    createdAt?: Date,
    updatedAt?: Date,
    __v?: number
}