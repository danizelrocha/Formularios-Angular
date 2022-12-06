import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
import { pipe } from 'rxjs';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
})
export class DataFormComponent implements OnInit {
  formulario!: FormGroup;
  // resetar; Voltar AQUIIII

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
        estado: [null, Validators.required],
      }),
    });
  }

  onSubmit() {
    console.log(this.formulario);

     if(this.formulario.valid){
       this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
       //.map(res => res)
       .subscribe(
        (dados: any) => {
        console.log(dados);
       })
      } else {
        console.log('formulario invalido');
        this.verificaValidacoesForm(this.formulario);
      }
  }

  verificaValidacoesForm(_formGroup: FormGroup): void{
    Object.keys(_formGroup.controls).forEach(campo => {
      console.log(campo);
      const controle = _formGroup.get(campo);
      controle?.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });

  }

  resetar(): void{
    this.formulario.reset();
  }

  verificaValidTouched(campo: string) {
    return (
      !this.formulario.get(campo)!.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    );
  }
  verificaEmailInvalido(){
    const campoEmail = this.formulario.get('email');
    if (campoEmail?.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;

    }
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
        this.http
          .get(`//viacep.com.br/ws/${cep}/json/`)
          .pipe(map((dados: any) => dados))
          .subscribe((dados) => this.populaDadosForm(dados));
      }
    }
  }

  populaDadosForm(dados: any) {
    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        //cep: dados.cep ,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });

    this.formulario.get('nome')!.setValue('Daniel');

    /*  console.log(form); */
  }

  resetarDadosForm() {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null,
      },
    });
  }
}
