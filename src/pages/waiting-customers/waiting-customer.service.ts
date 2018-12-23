import { Injectable } from "@angular/core";
import { PouchdbProvider } from "../../providers/pouchdb/pouchdb";
import { Types } from "../../models/types";

@Injectable()
export class WaitingCustomerService extends PouchdbProvider {


	constructor() {
		super();
	}

	async obtenerPendientes() {
		let result = await this.db.find({
			selector: {
				Type: {
					$eq: Types.TYPE_CLIENTE
				},
				pendiente: {
					$exists: true,
					$type: 'number',
					$gt: 0
				},
				archivado: {
					$ne: true
				}
			}
		});
		const res = this._.orderBy(result.docs, ['nombre'], ['asc']);
		return res;
	}


}