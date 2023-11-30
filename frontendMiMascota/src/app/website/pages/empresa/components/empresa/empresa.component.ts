import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { EmpresaModel } from 'src/app/core/models/empresa.model';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss'],
})
export class EmpresaComponent {
  empresa: EmpresaModel[] = [];
  formEmpresa: FormGroup;

  formEmpresaId = '';
  nit: string = '';

  constructor(
    private empresaService: EmpresaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formEmpresa = new FormGroup({});
    this.buildForm();
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.empresaService.getAll().subscribe((data) => {
      this.empresa = data;
      data.forEach((empresa) => {
        this.get(empresa.id.toString());
      });
    });
  }

  private get(id: string) {
    this.empresaService.get(id).subscribe({
      next: (data) => {
        this.empresa = data;
        this.nit = id;
        this.formEmpresa.patchValue(data);
        console.log(this.empresa);
      },
      error: (errorMsg) => {
        window.alert(errorMsg);
      },
    });
  }

  save(event: MouseEvent) {
    if (this.formEmpresa.valid) {
      if (this.formEmpresaId) {
        console.log('update', this.formEmpresaId);

        this.update();
      } else {
        console.log('create', this.formEmpresaId);
        this.create();
      }
    }
  }

  private create() {
    const data = this.formEmpresa.value;
    this.empresaService.create(data).subscribe((rta) => {
      this.router.navigate(['/empresa']);
    });
  }

  private update() {
    console.log('nit', this.formEmpresaId);

    const data = this.formEmpresa.value;

    console.log('data empresa', data);

    this.empresaService.update(this.formEmpresaId, data).subscribe((rta) => {
      this.router.navigate(['/empresa']);
    });
  }

  private buildForm() {
    this.formEmpresa = this.formBuilder.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.pattern(/^\d{10}$/)],
      celular: ['', Validators.pattern(/^\d{10}$/)],
      logo: [''],
      email: ['', [Validators.required, Validators.email]],
      usuarioModif: ['', Validators.required],
    });
  }

  get id() {
    return this.formEmpresa.get('id');
  }

  get nombre() {
    return this.formEmpresa.get('nombre');
  }

  get direccion() {
    return this.formEmpresa.get('direccion');
  }

  get telefono() {
    return this.formEmpresa.get('telefono');
  }

  get celular() {
    return this.formEmpresa.get('celular');
  }

  get logo() {
    return this.formEmpresa.get('logo');
  }

  get email() {
    return this.formEmpresa.get('email');
  }

  get usuarioModif() {
    return this.formEmpresa.get('usuarioModif');
  }
}
