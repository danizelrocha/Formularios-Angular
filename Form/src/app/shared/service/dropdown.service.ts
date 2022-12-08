import { map } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  constructor(private http:HttpClient) { }

getEstadoBr(){
  return newFunction()
  function newFunction(this: any) {
    return this.http.get('assets/dados/estadosbr.json')
    .map((res:Response): any => res.json());
  }
}

}
