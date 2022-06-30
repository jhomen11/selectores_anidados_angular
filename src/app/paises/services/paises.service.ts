import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaisSmall, Pais } from '../interfaces/paises.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private baseUrl: string = 'https://restcountries.com/v3.1'
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  get regiones():string[] {
    return [...this._regiones]
  }

  constructor( private http: HttpClient) { }

  getPaisesPorRegion( region: string){

    const url: string = `${this.baseUrl}/region/${region}?fields=name,cca3`
    return this.http.get<PaisSmall[]>(url)
  }

  getPaisPorCodigo( codigo: string ): Observable<Pais | null> {

    if(!codigo){
      return of(null)
    }

    const url: string = `https://restcountries.com/v2/alpha/${codigo}`

    console.log(url)
    return this.http.get<Pais>(url)
  }
}
