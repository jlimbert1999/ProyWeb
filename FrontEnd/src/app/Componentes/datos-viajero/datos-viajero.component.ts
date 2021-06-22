import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServAdminService } from '../../Services/serv-admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-datos-viajero',
  templateUrl: './datos-viajero.component.html',
  styleUrls: ['./datos-viajero.component.css']
})
export class DatosViajeroComponent implements OnInit {
  datos={
    nombre:'',
    apellido:'',
    telefono:'',
    cantidad:'',
    correo:'',
    ci:'',
    fecha:''
  }
  constructor(private ServAdminService:ServAdminService, private Router:Router) { }

  ngOnInit(): void {
  }
  enviarCorreo(){

    let valorOrigen=(<HTMLInputElement>document.getElementById('fechaN')).value; 
    let year=valorOrigen.split("-",1)
    var d = new Date();
    var n = d.getFullYear();
    let yearActual=parseInt(n.toString())
    let yearNaci=parseInt(year.toString())
    let edad=yearActual-yearNaci
    if(edad<18){
      Swal.fire({
        icon: 'error',
        title: 'Es menor de edad. No puede realizar la compra.',
        showConfirmButton: false,
        timer: 2000
      })  

    }
    else{
      this.ServAdminService.enviarCorreo(this.datos).subscribe()
      Swal.fire({
        icon: 'success',
        title: 'Gracias por comprar',
        showConfirmButton: false,
        timer: 2000
      })  
      localStorage.setItem('viaje', JSON.stringify(this.datos))
    }
    
  }
  cancelar(){
    this.Router.navigate(['/Seleccionar_viaje'])
  }

}
