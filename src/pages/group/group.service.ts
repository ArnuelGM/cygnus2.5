import { PouchdbProvider } from "../../providers/pouchdb/pouchdb";
import { Injectable } from "@angular/core";
import { Types } from "../../models/types";

@Injectable()
export class GroupInfoService extends PouchdbProvider {


	constructor() {
		super();
	}

	getGroupInfo(groupId) {
		return this.db.get(groupId);
	}

	async getCustomersGroup(customersId) {
		let result = await this.db.find({
			selector: {
				Type: Types.TYPE_CLIENTE,
				archivado: {
					$ne: true
				},
				_id: {
					$in: customersId
				}
			}
		});
		const res = this._.orderBy(result.docs, ['nombre'], ['asc']);
		return res;
	}
}