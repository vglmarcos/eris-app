interface IReportes {
    id: number,
    nombre_reporte: string,
    nombre_producto: string,
    tipo_producto: string,
    periodo: string,
    fecha: string
}

export let REPORTES: IReportes[] = [
    {
        id: 1,
        nombre_reporte: "Reporte 1",
        nombre_producto: "Producto 1",
        tipo_producto: "Reparación",
        periodo: "DD/MM/AA - DD/MM/AA",
        fecha: "DD/MM/AA"
    },
    {
        id: 2,
        nombre_reporte: "Reporte 2",
        nombre_producto: "Producto 2",
        tipo_producto: "Reparación",
        periodo: "DD/MM/AA - DD/MM/AA",
        fecha: "DD/MM/AA"
    },
    {
        id: 3,
        nombre_reporte: "Reporte 3",
        nombre_producto: "Producto 3",
        tipo_producto: "Reparación",
        periodo: "DD/MM/AA - DD/MM/AA",
        fecha: "DD/MM/AA"
    },
    {
        id: 4   ,
        nombre_reporte: "Reporte 4  ",
        nombre_producto: "Producto 4    ",
        tipo_producto: "Reparación",
        periodo: "DD/MM/AA - DD/MM/AA",
        fecha: "DD/MM/AA"
    }
]