import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormCustomerPage } from '../form-customer/form-customer';
import { WaitingCustomerService } from './waiting-customer.service';
import { FormAccountsPage } from '../form-accounts/form-accounts';

@Component({
	selector: 'page-waiting-customers',
	templateUrl: 'waiting-customers.html',
})
export class WaitingCustomersPage {

	pendientesSearch;
	pendientes;

	busqueda = '';

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public _waiting: WaitingCustomerService
	) {

	}

	ionViewWillEnter() {
		this.busqueda = '';
		this.getPendientes();
	}

	createWaitingCustomer() {
		this.navCtrl.push(FormCustomerPage);
	}

	async getPendientes() {
		let pendientesResult = await this._waiting.obtenerPendientes();
		this.pendientesSearch = pendientesResult;
		this.pendientes = pendientesResult;
	}

	buscarCliente() {
		this.pendientes = this.pendientesSearch;
		if (this.busqueda && this.busqueda.trim() != '') {
			this.pendientes = this.pendientesSearch.filter((item) => {
				return (item.nombre.toLowerCase().indexOf(this.busqueda.toLowerCase()) > -1);
			});
		}
	}

	crearCuenta(customer) {
		this.navCtrl.push(FormAccountsPage, {
			customerId: customer._id,
			pendiente: customer.pendiente
		});
	}

}
