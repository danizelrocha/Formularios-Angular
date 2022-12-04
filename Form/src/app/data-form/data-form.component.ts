import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  formulario!:FormGroup;
  resetar: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
    ) {}

  ngOnInit(): void {

   /*  this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null)
    }); */

    this.formulario = this. formBuilder.group({
      nome:[null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email:[null, [Validators.required, Validators.email]],
      cep: [null, Validators.required],
      complemento: [null],
      rua: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required]
    });
  }

  onSubmit(){
    console.log(this.formulario.value);

     this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
    .pipe(map((dados: any) => dados))
    .subscribe(dados => {
      console.log(dados);
      //reseta o form
     /*  this.formulario.reset(); */
     this.resetar();
    },
    (error: any) => alert('error'));
  }

  /* resetar(){
    this.formulario.reset();
  }

  verificaValidTouched(campo: string | (string | number)[]) {

    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;

  } */

  verificaValidTouched(campo:string){
    return !this.formulario.controls[campo].valid && this.formulario.controls[campo].touched;
  }

  aplicaCssError(campo: any){
    return {
      'has-error': this.verificaValidTouched(campo),
    }
  }

  aplicaCssErro(campo:string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }
}
