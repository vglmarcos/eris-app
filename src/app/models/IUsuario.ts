export interface IUsuario {
    _id?: string,
    id?: number,
    nombre: string,
    apellidos: string,
    tipo: string,
    correo: string,
    telefono: string,
    usuario: string,
    contra: string,
    estado: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    __v?: number
}