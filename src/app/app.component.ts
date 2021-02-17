import { Component } from '@angular/core';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(private deeplinks: Deeplinks, private navController: NavController, private platform: Platform) {
    this.initialize();
  }

  private initialize() {
    this.platform.ready().then(() => {
      this.setupDeepLinks();
    });
  }

  private setupDeepLinks() {
    this.deeplinks
      .route({
        'black': '/black',
        'dark': '/dark',
        'green': '/green',
        'herbal': '/herbal',
        'oolong': '/oolong',
        'puer': '/puer',
        'white': '/white',
        'yellow': '/yellow'
      })
      .subscribe(
        match => {
          console.log('match', match);
          // this was all stolen from another demo, just go to tab2 for any matched link...
          // since nothing _actually_ matches.
          this.navController.navigateRoot(`/tabs/tab2`);
        },
        nomatch => {
          // nomatch.$link - the full link data
          console.error('Got a deeplink that did not match', nomatch);
        }
      );
  }
}
