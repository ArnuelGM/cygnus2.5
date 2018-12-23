import { Injectable } from "@angular/core";
import { PouchdbProvider } from "../../providers/pouchdb/pouchdb";
import { Types } from "../../models/types";

@Injectable()
export class PaymentsProvider extends PouchdbProvider {

	constructor() {
		super();
	}

	async obtenerCliente(customerId: string) {
		let result = await this.db.get(customerId);
		return result;
	}

	async obtenerCuenta(cuentaId) {
		let result = await this.db.get(cuentaId);
		return result;
	}

	async obtenerPayments(cuentaId, clienteId) {
		let result = await this.db.find({
			selector: {
				Type: Types.TYPE_PAYMENT,
				CustomerID: clienteId,
				AccountID: cuentaId
			}
		});
		const res = this._.orderBy(result.docs, ['fecha', 'cantidad'], ['desc', 'desc']);
		return res;
	}

	async deletePayment(payment, alert) {
		return new Promise((resolve, reject) => {
			alert.create({
				title: 'Confirmar',
				message: `Desea realmente eliminar éste registro?`,
				buttons: [
					{ text: 'Cancelar', role: 'cancel' },
					{
						text: 'Eliminar',
						handler: () => {
							payment._deleted = true;
							this.save(payment);
							resolve(true);
						}
					}
				]
			}).present();
		});
	}

}