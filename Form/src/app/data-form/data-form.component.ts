import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
})
export class DataFormComponent implements OnInit {
  formulario!: FormGroup;
  resetar: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
     /* this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null),

      endereco: new FormGroup({
       cep: new FormControl (null)
      })
    }); */

    this.formulario = this.formBuilder.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
    });
  }

  onSubmit() {
    console.log(this.formulario.value);

    this.http
      .post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .pipe(map((dados: any) => dados))
      .subscribe(
        (dados) => {
          console.log(dados);
          //reseta o form
          /*  this.formulario.reset(); */
          this.resetar();
        },
        (error: any) => alert('error')
      );
  }

  /* resetar(){
    this.formulario.reset();
  }

  verificaValidTouched(campo: string | (string | number)[]) {

    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;

  } */

  verificaValidTouched(campo: string) {
    return (
      !this.formulario.controls[campo].valid &&
      this.formulario.controls[campo].touched
    );
  }

  aplicaCssError(campo: any) {
    return {
      'has-error': this.verificaValidTouched(campo),
    };
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
    };
  }

  consultaCEP() {

    let cep = this.formulario.get('endereco.cep')?.value;
    cep = cep.replace(/\D/g, '');
    if (cep != null && cep !== '') {
      let validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        this.resetarDadosForm();
        this.http.get(`//viacep.com.br/ws/${cep}/json/`)
          .pipe(map((dados: any) => dados))
          .subscribe(dados =>  this.populaDadosForm(dados));
      }
    }
  }

  populaDadosForm(dados:any){

    this.formulario.patchValue({
      endereco: {
         rua: dados.logradouro ,
         //cep: dados.cep ,
         complemento: dados.complemento ,
         bairro: dados.bairro ,
         cidade: dados.localidade ,
         estado: dados.uf
      }
    });

    this.formulario.get('nome')!.setValue('Daniel');
    
    /*  console.log(form); */
  }

  resetarDadosForm(){
    this.formulario.patchValue({
    endereco: {
      rua: null ,
      complemento: null ,
      bairro: null ,
      cidade: null ,
      estado: null
    }
  });
  }

}




