import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeProvider } from './home.service';
import { FormCustomerPage } from '../form-customer/form-customer';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	clientesSearch;
	clientes;

	busqueda = '';

	constructor(
		public navCtrl: NavController,
		public _home: HomeProvider
	) {
		this.clientes = [];
	}

	ionViewWillEnter() {
		this.busqueda = '';
		this.getClientes();
	}

	createCustomer() {
		this.navCtrl.push(FormCustomerPage);
	}

	async getClientes() {
		let clientesResult = await this._home.obtenerClientes();
		this.clientesSearch = clientesResult;
		this.clientes = clientesResult;
	}

	buscarCliente() {
		this.clientes = this.clientesSearch;
		if (this.busqueda && this.busqueda.trim() != '') {
			this.clientes = this.clientesSearch.filter((item) => {
				return (item.nombre.toLowerCase().indexOf(this.busqueda.toLowerCase()) > -1);
			});
		}
	}

}
