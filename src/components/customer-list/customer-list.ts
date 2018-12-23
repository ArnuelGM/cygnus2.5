import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AccountsPage } from '../../pages/accounts/accounts';
import { FormCustomerPage } from '../../pages/form-customer/form-customer';
import { CustomerListProvider } from './customer-list.service';

@Component({
	selector: 'customer-list',
	templateUrl: 'customer-list.html'
})
export class CustomerListComponent{

	@Input()
	customers = [];

	@Output()
	archivar = new EventEmitter<string>();

	constructor(
		public navCtrl: NavController,
		public _customerList: CustomerListProvider
	) {	}

	verCuentas(_id: string) {
		console.log('id_seleccionado: ', _id);
		this.navCtrl.push(AccountsPage, { customerId: _id });
	}

	editarCliente(customerId) {
		this.navCtrl.push(FormCustomerPage, {
			customerId: customerId
		});
	}

	async archivarCliente(customerId) {
		let customer = await this._customerList.db.get(customerId);
		customer.archivado = true;
		await this._customerList.save(customer);
		this.archivar.emit(customerId);
	}

}
