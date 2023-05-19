import { Component, OnInit } from '@angular/core';
import { Clients } from '../clientes';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: Clients[] = [];
  isEditing: boolean = false;
  formGroupClient: FormGroup;

  constructor(private clientsService: ClienteService, private formBuilder: FormBuilder) {
    this.formGroupClient = this.formBuilder.group({
      id: [''],
      name: [''],
      phone: [''],
      cpf: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientsService.getClients().subscribe({
      next: data => this.clients = data
    });
  }

  save() {
    let checkbox = document.getElementById('checkbox') as HTMLInputElement;

    if (this.isEditing) {
      this.clientsService.update(this.formGroupClient.value).subscribe({
        next: () => {
          this.loadClients()
          this.formGroupClient.reset();
          this.isEditing = false;
        }
      })
    }

    else {
      if (checkbox.checked) {
        this.clientsService.save(this.formGroupClient.value).subscribe({
          next: data => {
            this.clients.push(data);
            this.formGroupClient.reset();
          }
        })
      }

      else {
        alert ('Para prosseguir com o cadastro, aceite os termos de uso');
      }
    }
  }

  edit(clients: Clients) {
    this.formGroupClient.setValue(clients);
    this.isEditing = true;
  }

  delete(clients: Clients) {
    this.clientsService.delete(clients).subscribe({
      next: () => this.loadClients()
    });
  }


}
