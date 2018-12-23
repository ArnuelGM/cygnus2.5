import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PaymentsProvider } from '../payments/payments.service';
import { Types } from '../../models/types';

@Component({
	selector: 'page-form-payment',
	templateUrl: 'form-payment.html',
})
export class FormPaymentPage {

	payment;
	cuentaId;
	clienteId;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public _payments: PaymentsProvider
	) {

		this.payment = {
			fecha: this._payments.getDate(),
			cantidad: 0,
			Type: Types.TYPE_PAYMENT
		};
	}

	get cantidad() {
		return +this.payment.cantidad;
	}
	set cantidad(value) {
		this.payment.cantidad = +value;
	}
	
	ionViewDidLoad() {
		this.clienteId = this.navParams.get('customerId');
		this.cuentaId = this.navParams.get('accountId');

		this.payment.AccountID = this.cuentaId;
		this.payment.CustomerID = this.clienteId;

		this.obtenerCuenta();
	}

	async obtenerCuenta() {
		const cuenta = await this._payments.obtenerCuenta(this.cuentaId);
		this.payment.cantidad = cuenta.cuotaDiaria;
	}

	async save() {
		this.payment.cantidad = +this.payment.cantidad;
		await this._payments.save(this.payment);
		this.navCtrl.pop();
	}

}
