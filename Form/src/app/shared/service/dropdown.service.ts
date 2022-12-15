import { map } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { get } from 'http';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
    constructor(private http:HttpClient) { }

    getEstadoBr(){
      return this.http.get('assets/dados/estadosbr.json');
    }

  getCargos(){
    return [
      { nome: 'Dev' , nivel: 'Junior' , desc: 'Dev Jr' },
      { nome: 'Dev' , nivel: 'Pleno' , desc: 'Dev Pl' },
      { nome: 'Dev' , nivel: 'Senior' , desc: 'Dev Sr' }
    ];
  }
}

