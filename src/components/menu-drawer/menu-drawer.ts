import { Component, ViewChild } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { Nav } from 'ionic-angular';

@Component({
	selector: 'menu-drawer',
	templateUrl: 'menu-drawer.html'
})
export class MenuDrawerComponent {

	@ViewChild('content') navCtrl: Nav;

	pages;
	rootPage;

	constructor() {
		this.pages = [
			{ name: 'Clientes', page: HomePage, icon: 'person', description: '' },
			{ name: 'Grupos', icon: 'people', description: '' },
			{ name: 'Pendientes', icon: 'contact', description: '' },
			{ name: 'Información', icon: 'stats', description: '' },
		];

		this.rootPage = HomePage;
	}

	setRoot(page) {
		this.navCtrl.setRoot(page);
	}

}
