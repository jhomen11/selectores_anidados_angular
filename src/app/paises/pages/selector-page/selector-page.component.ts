import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from "rxjs/operators";

import { PaisesService } from '../../services/paises.service';
import { PaisSmall, Pais } from '../../interfaces/paises.interfaces';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required]

  })

  //Llenar selectores
  regiones: string[] = []
  paises: PaisSmall[] = []
  fronteras: string[] = []

  //UI
  cargando = false

  constructor( private fb: FormBuilder,
                private paisesService: PaisesService ) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones

    //cuando cambia la region
    // this.miFormulario.get('region')?.valueChanges
    //   .subscribe( region =>{
    //     console.log(region)

    //     this.paisesService.getPaisesPorRegion( region)
    //         .subscribe( paises =>{
    //           this.paises = paises
    //         })
    //   })

    //cuando cambia la region
    this.miFormulario.get('region')?.valueChanges
        .pipe(
          tap( ( _ ) => {
            this.miFormulario.get('pais')?.reset('')  //Reiniciar el select de paises cuando cambie la region
            this.cargando = true
          }),
          switchMap( region => this.paisesService.getPaisesPorRegion( region))
        ).subscribe( valor =>{
          this.paises = valor
          this.cargando = false
        })

    //Cuando cambia la región
    this.miFormulario.get('pais')?.valueChanges
        .pipe(
          tap( ( _ ) => {
            this.miFormulario.get('frontera')?.reset('')  //Reiniciar el select de paises cuando cambie la region
            this.cargando = true

          }),
          switchMap( codigo => this.paisesService.getPaisPorCodigo(codigo))
          )
        .subscribe( valor => {
          this.cargando = false
          this.fronteras = valor?.borders || []
          // console.log(this.fronteras)
        })


  }

  guardar(){
    console.log(this.miFormulario.value)
  }

}
