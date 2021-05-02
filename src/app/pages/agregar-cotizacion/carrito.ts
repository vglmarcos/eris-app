interface ICarrito {
    id: number,
    nombre_producto: string,
    tipo: string,
    precio_unitario: number,
    cantidad: number,
    precio_total: number
}

export let CARRITO: ICarrito[] = [
    {
        id: 1,
        nombre_producto: 'Tornillo',
        tipo: 'Pieza',
        precio_unitario: 40,
        cantidad: 5,
        precio_total: 5 * 40
    },
    {
        id: 1,
        nombre_producto: 'Tornillo',
        tipo: 'Pieza',
        precio_unitario: 40,
        cantidad: 5,
        precio_total: 5 * 40
    },
    {
        id: 1,
        nombre_producto: 'Tornillo',
        tipo: 'Pieza',
        precio_unitario: 40,
        cantidad: 5,
        precio_total: 5 * 40
    },
    {
        id: 1,
        nombre_producto: 'Tornillo',
        tipo: 'Pieza',
        precio_unitario: 40,
        cantidad: 5,
        precio_total: 5 * 40
    },
]