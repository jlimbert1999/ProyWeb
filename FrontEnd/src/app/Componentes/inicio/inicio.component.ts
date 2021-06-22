import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { BusService, Buses } from '../../SERVICIOS/bus.service';
import { Router } from '@angular/router';
import { RutasService,Ruta } from '../../SERVICIOS/rutas.service';
import {FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms' 
import { ClienteServicioService } from '../../Services/cliente-servicio.service';
import { CalenService } from '../../SERVICIOS/calen.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  datosviaje={
    origenbus:'',
    destinobus:'',
    fecha:''
  };
  buses: Buses={
    id_bus:'',
    origenbus:'',
    destinobus:'',
    fecha:'',
    hora:'',
    nombrebus:'',
    tipobus:'',
    precio:''
  };
  FilterdestinosPipe: any;
  createFormGroup(){

    return new FormGroup({

      origenbus: new FormControl('', [Validators.required]),

      destinobus:  new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
      cantidad:new FormControl('', [Validators.required]),
    
    })

  }
  registroForm: FormGroup;
  RutasListas: Ruta[]=[]; 
  RutasL: Ruta[]=[];
  BusesL: Buses[]=[];
  BusesDL: Buses[]=[];
  BusListas: Buses[]=[];
  filterPost ='';
  constructor(private BusService:BusService, private router:Router,private RutasService:RutasService,private _Calen:CalenService, private ClienteServicioService:ClienteServicioService) { 
    this.registroForm=this.createFormGroup()
    
  }

  ngOnInit(): void {
    //this.listarRutas();
    this.listarBus();
    this.calendari();
  }
  listaB(){

    this.BusService.getBuses().subscribe(

      res=>{

        /////////////////////////////

        let valores=JSON.stringify(res)

        let cadena=JSON.parse(valores)

        let dest:any=[] 

        for(let i=0;i<cadena.length;i++){

          const elemento = cadena[i].origenbus;

          if (!dest.includes(cadena[i].origenbus)) {

            dest.push(cadena[i].origenbus);

          }

        }

        this.BusesL=dest

      },

      err=>console.log(err)

    );

  }

  listaDB(){

    this.BusService.getBuses().subscribe(

      res=>{

        /////////////////////////////

        let valores=JSON.stringify(res)

        let cadena=JSON.parse(valores)

        let dest:any=[]
        for(let i=0;i<cadena.length;i++){

          const elemento = cadena[i].destinobus;

          if (!dest.includes(cadena[i].destinobus)) {

            dest.push(cadena[i].destinobus);

          }

        }

        this.BusesDL=dest
      
      },

      err=>console.log(err)

    );

  }
  mos(){
    this.BusService.getBuses().subscribe(

      res=>{

        /////////////////////////////

        let valores=JSON.stringify(res)

        let cadena=JSON.parse(valores)

        let dest:any=[]
        for(let i=0;i<cadena.length;i++){

          const elemento = cadena[i].destinobus;

          if (!dest.includes(cadena[i].destinobus)) {

            dest.push(cadena[i].destinobus);

          }

        }

        this.BusesDL=dest
      
      },

      err=>console.log(err)

    );
  }
  
  listarBus()
  {
    this.BusService.getBuses().subscribe(
      res=>{
        console.log(res)
        this.listaB();
        this.listaDB();
        this.BusListas=<any>res;        
      },
      err=>console.log(err)
    );
  }

  // listaR(){

  //   this.RutasService.getRutas().subscribe(

  //     res=>{

  //       /////////////////////////////

  //       let valores=JSON.stringify(res)

  //       let cadena=JSON.parse(valores)

  //       let dest:any=[] 

  //       for(let i=0;i<cadena.length;i++){

  //         const elemento = cadena[i].origen;

  //         if (!dest.includes(cadena[i].origen)) {

  //           dest.push(cadena[i].origen);

  //         }

  //       }

  //       this.RutasL=dest

  //     },

  //     err=>console.log(err)

  //   );

  // }
  
  
  
  // listarRutas()
  // {
   
  //   this.RutasService.getRutas().subscribe(
  //     res=>{
  //       console.log(res)
  //       this.listaR()
  //       this.RutasListas=<any>res;
  //     },
  //     err=>console.log(err)
  //   );
  // }
  enviardatos(){
    
      localStorage.setItem('viaje', JSON.stringify(this.datosviaje)) 
    
    
  }
  calendari()
  {
    let mes
    var fecha = new Date();
    var anio = fecha.getFullYear();
    var dia = fecha.getDate();
    var _mes = fecha.getMonth(); //viene con valores de 0 al 11
    _mes = _mes + 1; //ahora lo tienes de 1 al 12
    if (_mes < 10) //ahora le agregas un 0 para el formato date
    {
       mes = "0" + _mes;
    } else {
       mes = _mes.toString;
    }
    let fecha_minimo = anio + '-' + mes + '-' + dia; // Nueva variable

    document.getElementById("fechaReserva")!.setAttribute('min', fecha_minimo);
  }
  get origenbus(){return this.registroForm.get('origenbus');}

  get destinobus(){return this.registroForm.get('destinobus');}
  get fecha(){return this.registroForm.get('fecha');}
}

