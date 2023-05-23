import { Component } from '@angular/core';
import { Suppliers } from '../fornecedores';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {
  suppliers: Suppliers[] = [];
  isEditing: boolean = false;
  formGroupSuppliers: FormGroup;

  constructor(private suppliersService: FornecedorService, private formBuilder: FormBuilder) {
    this.formGroupSuppliers = this.formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      cpf: [''],
      produtos: ['']
    });
  }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.suppliersService.getSuppliers().subscribe({
      next: data => this.suppliers = data
    });
  }

  save() {
    let checkbox = document.getElementById('checkbox') as HTMLInputElement;

    if (this.isEditing) {
      this.suppliersService.update(this.formGroupSuppliers.value).subscribe({
        next: () => {
          this.loadSuppliers()
          this.formGroupSuppliers.reset();
          this.isEditing = false;
        }
      })
    }

    else {
      if (checkbox.checked) {
        this.suppliersService.save(this.formGroupSuppliers.value).subscribe({
          next: data => {
            this.suppliers.push(data);
            this.formGroupSuppliers.reset();
          }
        })
      }

      else {
        alert ('Para prosseguir com o cadastro, aceite os termos de uso');
      }
    }
    checkbox.checked = false;
  }

  edit(suppliers: Suppliers) {
    this.formGroupSuppliers.setValue(suppliers);
    this.isEditing = true;
  }

  delete(suppliers: Suppliers) {
    this.suppliersService.delete(suppliers).subscribe({
      next: () => this.loadSuppliers()
    });
  }

  clean() {
    this.formGroupSuppliers.reset();
  }

}
