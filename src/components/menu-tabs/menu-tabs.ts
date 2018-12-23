import { Component } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { GroupsPage } from '../../pages/groups/groups';
import { WaitingCustomersPage } from '../../pages/waiting-customers/waiting-customers';

@Component({
	selector: 'menu-tabs',
	templateUrl: 'menu-tabs.html'
})
export class MenuTabsComponent {

	pages;

	constructor() {
		this.pages = [
			{ name: 'Clientes', page: HomePage, icon: 'person', description: '' },
			{ name: 'Grupos', page: GroupsPage, icon: 'people', description: '' },
			{ name: 'Pendientes', page: WaitingCustomersPage, icon: 'contact', description: '' },
			{ name: 'Información', icon: 'stats', description: '' },
		];
	}

}
