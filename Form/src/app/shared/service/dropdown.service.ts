import { map } from 'rxjs';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http:HttpClientModule) { }

getEstadoBr(){
  return newFunction()
  function newFunction(this: any) {
    return this.http.get('assests/dados/estadosbr.json');
      map((res:Response): any => res.json());
  }
}

}
