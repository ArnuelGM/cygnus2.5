import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { PaymentsProvider } from './payments.service';
import { FormPaymentPage } from '../form-payment/form-payment';

@Component({
	selector: 'page-payments',
	templateUrl: 'payments.html',
})
export class PaymentsPage {

	cuentaId;
	clienteId;

	cuenta;
	cliente;

	paymentsDetail;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public _payments: PaymentsProvider,
		public alert: AlertController
	) {
		this.paymentsDetail = [];
	}

	ionViewWillEnter() {
		this.clienteId = this.navParams.get('customerId');
		this.cuentaId = this.navParams.get('accountId');

		this.obtenerCuenta()
		this.obtenerCliente();
		this.obtenerDetalle();
	}

	async obtenerCuenta() {
		this.cuenta = await this._payments.obtenerCuenta(this.cuentaId);
	}

	async obtenerCliente() {
		this.cliente = await this._payments.obtenerCliente(this.clienteId);
	}

	async obtenerDetalle() {
		this.paymentsDetail = await this._payments.obtenerPayments(this.cuentaId, this.clienteId);
		console.log('payments detail: ', this.paymentsDetail);
	}

	async eliminarPago(payment) {
		let res = await this._payments.deletePayment(payment, this.alert);
		if (res) {
			this.obtenerDetalle();
		}
	}

	goPaymentForm() {
		this.navCtrl.push( FormPaymentPage , {
			customerId: this.clienteId,
			accountId: this.cuentaId
		});
	}

}
