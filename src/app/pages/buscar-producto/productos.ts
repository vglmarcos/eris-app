interface IProductos {
    id: number,
    nombre_producto: string,
    tipo: string,
    precio: number
}

export let PRODUCTOS: IProductos[] = [
    {
        id: 1,
        nombre_producto: "Producto1",
        tipo: "Reparación",
        precio: 500
    },
    {
        id: 2,
        nombre_producto: "Producto2",
        tipo: "Herramienta",
        precio: 500
    },
    {
        id: 3,
        nombre_producto: "Producto3",
        tipo: "Pieza",
        precio: 500
    },
    {
        id: 4,
        nombre_producto: "Producto4",
        tipo: "Reparación",
        precio: 500
    }
]