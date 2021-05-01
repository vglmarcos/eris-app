interface ICotizaciones {
    id: number,
    nombre_cliente: string,
    total: number,
    estado: string,
    fecha: string,
    usuario: string
}

export let COTIZACIONES: ICotizaciones[] = [
    {
        id: 15,
        nombre_cliente: "Marco Antonio Guajardo Vigil",
        total: 4500,
        estado: "Pendiente",
        fecha: "18/04/2020",
        usuario: "Numpy"
    },
    {
        id: 16,
        nombre_cliente: "Jesús Eduardo Balleza de la Cruz",
        total: 3000,
        estado: "Pendiente",
        fecha: "18/04/2020",
        usuario: "balleza150"
    },
    {
        id: 17,
        nombre_cliente: "Fátima de la Rosa Picazo",
        total: 8000,
        estado: "Pendiente",
        fecha: "18/04/2020",
        usuario: "fatima20"
    },
    {
        id: 18,
        nombre_cliente: "Mario Ernesto Páez Trujillo",
        total: 2500,
        estado: "Pendiente",
        fecha: "18/04/2020",
        usuario: "mayinxd"
    }
]