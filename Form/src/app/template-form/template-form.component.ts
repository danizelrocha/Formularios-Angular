import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
})
export class TemplateFormComponent implements OnInit {
  usuario: any = {
    nome: null,
    email: null,
  };

  onSubmit(formulario: any) {
    console.log(formulario);
    console.log(this.usuario);

  
    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
    .pipe(map(dados => dados))
    .subscribe(dados => { console.log(dados);
    });
  }
/*novo codgo*/
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  verificaValidTouched(campo: { valid: any; touched: any }) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: { valid: any; touched: any }) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
    };
  }

  consultaCEP(cep: any, form:any) {
    cep = cep.replace(/\D/g, '');
    if (cep != null && cep !== '') {
      let validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        this.resetarDadosForm(form);
        this.http.get(`//viacep.com.br/ws/${cep}/json/`)
          .pipe(map((dados: any) => dados))
          .subscribe(dados =>  this.populaDadosForm(dados,  form));
      }
    }
  }

  populaDadosForm(dados:any, formulario:any){
   /*  formulario.setVallue({
      nome:formulario.value.nome,
      email:formulario.value.email,
      endereco: {
        rua: dados.logradouro ,
        cep: dados.cep ,
        numero: '' ,
        complemento: dados.complemento ,
        bairro: dados.bairro ,
        cidade: dados.localidade ,
        estado: dados.uf
      }
    });*/

    formulario.form.patchValue({

      endereco: {
        rua: dados.logradouro ,
        cep: dados.cep ,
        complemento: dados.complemento ,
        bairro: dados.bairro ,
        cidade: dados.localidade ,
        estado: dados.uf
      }
    });
   /*  console.log(form); */
  }

  resetarDadosForm(formulario:any){
    formulario.form.patchValue({
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






