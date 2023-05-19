import { Component, OnInit } from '@angular/core';
import { FornecedorService } from '../fornecedor.service';
import { Suppliers } from '../fornecedores';
import { Clients } from '../clientes';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  suppliers: Suppliers[] = [];
  clients: Clients[] = [];

  constructor(private suppliersService: FornecedorService, private clientsService: ClienteService) { }
  ngOnInit(): void {
    this.loadClients();
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.suppliersService.getSuppliers().subscribe({
      next: data => this.suppliers = data
    });
  }

  loadClients() {
    this.clientsService.getClients().subscribe({
      next: data => this.clients = data
    });
  }

  select: string = '';
  escolha: string = '';

  selectDados() {
    switch (this.select) {
      case 'cli':
        this.escolha = 'cli';
        break;
      case 'sup':
        this.escolha = 'sup';
        break;
    }
  }
}
