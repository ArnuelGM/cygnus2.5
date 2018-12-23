import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AccountDetailProvider } from './account-detail.service';
import { FormAccountsPage } from '../form-accounts/form-accounts';

@Component({
	selector: 'page-account-detail',
	templateUrl: 'account-detail.html',
})
export class AccountDetailPage {

	clienteId: string;
	accountId: string;

	cliente: any;
	cuenta: any;
	pagos: any[];

	// calculados
	totalPagado = 0;
	// debe = 0;
	totalPagosRealizados = 0;
	ultimoPago: any = null;
	interesMensual = 0;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public _accounDetail: AccountDetailProvider,
		public alert: AlertController
	) {	}

	ionViewWillEnter() {
		this.clienteId = this.navParams.get('customerId');
		this.accountId = this.navParams.get('accountId');

		Promise.all([
			this.obtenerCliente(),
			this.obtenerCuenta(),
			this.obtenerPagos()
		]).then( () => this.obtenerCalculados() );
	}

	async obtenerCliente() {
		this.cliente = await this._accounDetail.obtenerCliente(this.clienteId);
		return;
	}

	async obtenerCuenta() {
		this.cuenta = await this._accounDetail.obtenerCuenta(this.accountId);
		return;
	}

	async obtenerPagos() {
		this.pagos = await this._accounDetail.obtenerPagos(this.accountId, this.clienteId);
		console.log('pagos obtenidos: ', this.pagos);
		
		return;
	}

	obtenerCalculados() {
		// total pagado
		this.totalPagado = 0;
		this.pagos.map((pago) => this.totalPagado += pago.cantidad );
		
		// debe
		// this.debe = this.cuenta.capital - this.totalPagado;

		// total pagos realizados
		this.totalPagosRealizados = this.pagos.length;

		// ultimo pago realizado
		this.ultimoPago = this.pagos[0];

		// interes mensual
		if (this.cuenta.interes) {
			this.interesMensual = ((this.cuenta.interes * this.cuenta.capital) / 100);
		}
	}

	editarCuenta() {		
		this.navCtrl.push(FormAccountsPage, {
			accountId: this.cuenta._id,
			customerId: this.clienteId
		});
	}

	async archivarCuenta() {
		let res = await this._accounDetail.promptArchivarCuenta(this.alert);
		if (res) {
			await this._accounDetail.archivarCuenta(this.cuenta);
			this.obtenerCuenta();
		}
	}

	async desarchivarCuenta() {
		await this._accounDetail.desarchivarCuenta(this.cuenta);
		this.obtenerCuenta();
	}

	async eliminarCuenta() {
		let res = await this._accounDetail.promptEliminarCuenta(this.alert)
		if (res) {
			await this._accounDetail.eliminarCuenta(this.cuenta);
			await this._accounDetail.eliminarDatosCuenta( this.cuenta._id, this.clienteId );
			this.goAccounts();
		}
	}

	async goAccounts() {
		this.navCtrl.pop();
	}

}
