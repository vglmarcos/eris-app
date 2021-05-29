import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/servicios/snack-bar.service';
import { ConfirmarEliminarComponent } from 'src/app/components/confirmar-eliminar/confirmar-eliminar.component';
import { MatDialog } from '@angular/material/dialog';
import { ReciboService } from 'src/app/api/recibo/recibo.service';
import { IRecibo } from 'src/app/models/IRecibo';
import { CotizacionService } from 'src/app/api/cotizacion/cotizacion.service';
import { ICotizacion } from 'src/app/models/ICotizacion';
import { ClienteService } from 'src/app/api/cliente/cliente.service';
import { ICliente } from 'src/app/models/ICliente';
import { UsuarioService } from 'src/app/api/usuario/usuario.service';
import { IUsuario } from 'src/app/models/IUsuario';

@Component({
  selector: 'app-visualizar-recibo',
  templateUrl: './visualizar-recibo.component.html',
  styleUrls: ['./visualizar-recibo.component.css']
})
export class VisualizarReciboComponent implements OnInit {

  idTemporal = 1;
  fechaTemporal = "29/05/2021";
  empleadoTemporal = "Empleado1";
  clienteTemporal = "Mario";
  correoTemporal = "mario@gmail.com";
  telefonoTemporal = "8180930652";
  subtotalTemporal = 4512;
  ivaTemporal = 4512;
  totalTemporal = 4512;

  // this.productoService.obtenerProductosGet().subscribe(productos => {
  //   const producto = productos.find(prod => prod.id === productoSelect);
  //   const dialogRef = this.dialog.open(ConfirmarEliminarComponent, {
  //     data: '¿Realmente deseas eliminar este producto?',
  //     autoFocus: false
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result.res) {
  //       this.productoService.eliminarProductoDelete(producto).subscribe(res => {
  //         this.snackBarService.greenSnackBar('Producto eliminado con éxito');
  //         this.productoService.obtenerProductosGet().subscribe(prodt => {
  //           this.productosTotales = prodt;
  //           this.productos = this.productosTotales;
  //         });
  //       });
  //     } else {
  //       this.snackBarService.redSnackBar('Eliminación de producto cancelada');
  //       console.log(`Exit on click outside`);
  //     }
  //   });
  // });

  constructor() { }

  ngOnInit(): void {
  }

}
