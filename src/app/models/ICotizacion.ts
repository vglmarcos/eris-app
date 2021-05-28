import { IElemento } from "./IElemento";

export interface ICotizacion {
    _id?: string,
    id?: number,
    id_empleado: number,
    id_cliente: number,
    carrito: IElemento[],
    subtotal: number,
    total: number,
    estado: string,
    createdAt?: Date,
    updatedAt?: Date,
    __v?: number
}