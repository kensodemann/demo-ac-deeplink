import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  loggedIn: boolean;
  accessToken: string;

  constructor(private auth: AuthService) {}

  ionViewDidEnter() {
    this.getData();
  }

  async login() {
    await this.auth.login();
    this.getData();
  }

  async logout() {
    await this.auth.logout();
    this.getData();
  }

  async refresh() {
    await this.auth.refreshSession();
    this.getData();
  }

  private async getData() {
    this.loggedIn = await this.auth.isAuthenticated();
    this.accessToken = this.loggedIn ? JSON.stringify(await this.auth.getIdToken()) : '';
  }
}
