import { PouchdbProvider } from "../../providers/pouchdb/pouchdb";
import { Injectable } from "@angular/core";
import { Types } from "../../models/types";

@Injectable()
export class GroupCustomerAddService extends PouchdbProvider {


	constructor() {
		super();
	}

	async obtenerClientes() {
		let result = await this.db.find({
			selector: {
				Type: Types.TYPE_CLIENTE,
				archivado: {
					$ne: true
				}
			}
		});
		const res = this._.orderBy(result.docs, ['nombre'], ['asc']);
		return res;
	}

}