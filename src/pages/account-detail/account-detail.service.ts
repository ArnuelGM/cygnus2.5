import { Injectable } from "@angular/core";
import { PouchdbProvider } from "../../providers/pouchdb/pouchdb";
import { Types } from "../../models/types";
import { AlertController } from "ionic-angular";

@Injectable()
export class AccountDetailProvider extends PouchdbProvider {


	constructor() {
		super();
	}

	async obtenerCliente(clienteId) {
		let result = await this.db.get(clienteId);
		return result;
	}

	async obtenerCuenta(cuentaId) {
		let result = await this.db.get(cuentaId);
		return result;
	}

	async obtenerPagos(cuentaId, clienteId) {
		let result = await this.db.find({
			selector: {
				Type: Types.TYPE_PAYMENT,
				AccountID: cuentaId,
				CustomerID: clienteId
			}
		});
		const res = this._.orderBy(result.docs, ['fecha'], ['desc']);
		return res;
	}

	promptArchivarCuenta(alertController: AlertController) {
		return new Promise((result, reject) => {
			alertController.create({
				title: 'Confirmar',
				message: `
				La cuenta no podrá ser modifcada una vez archivada.\n\n
				Desea realmente realizar este cambio?
				`,
					buttons: [
						{ text: 'Cancelar', role: 'cancel' },
						{
							text: 'Archivar', handler: () => {
								result(true);
							}
						}
					]
				}).present();
		});
	}

	archivarCuenta(cuenta) {
		cuenta.archivada = true;
		return this.save(cuenta);
	}

	desarchivarCuenta(cuenta) {
		cuenta.archivada = false;
		return this.save(cuenta);
	}

	promptEliminarCuenta(alert: AlertController) {
		return new Promise((result, reject) => {
			alert.create({
				title: 'Confirmar',
				message: `
				Si elimina la cuenta se perderán todos los datos asociados a ella.\n\n
				Desea realmente realizar este cambio?
				`,
				buttons: [
					{ text: 'Cancelar', role: 'cancel' },
					{ text: 'Archivar', handler: () => result(true) }
				]
			}).present();
		});
	}

	eliminarCuenta(cuenta) {
		cuenta._deleted = true;
		return this.save(cuenta);
	}

	async eliminarDatosCuenta(cuentaId, clienteId) {
		let result = await this.db.find({
			selector: {
				Type: Types.TYPE_PAYMENT,
				CustomerID: clienteId,
				AccountID: cuentaId
			}
		});
		let docs:Array<any> = result.docs;
		if (docs.length > 0) {
			docs.forEach(doc => doc._deleted = true);
			await this.db.bulkDocs(docs);
		}
		return docs;
	}

}