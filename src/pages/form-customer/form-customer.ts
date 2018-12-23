import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormCustomerService } from './form-customer.service';
import { Types } from '../../models/types';

@Component({
	selector: 'page-form-customer',
	templateUrl: 'form-customer.html',
})
export class FormCustomerPage {

	customer;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public _formCustomer: FormCustomerService
	) {
		this.customer = {
			nombre: null,
			telefono: null,
			direccion: null,
			pendiente: null,
			Type: Types.TYPE_CLIENTE
		};
	}

	ionViewWillEnter() {
		this.obtenerCliente();
	}

	async obtenerCliente() {
		if (!!this.navParams.get('customerId')) {
			this.customer = await this._formCustomer.obtenerCliente(this.navParams.get('customerId'));
		}
	}

	get pendiente() {
		return +this.customer.pendiente;
	}
	set pendiente(value) {
		this.customer.pendiente = +value;
	}

	async save() {
		await this._formCustomer.guardarCliente(this.customer);
		this.navCtrl.pop();
	}

}
