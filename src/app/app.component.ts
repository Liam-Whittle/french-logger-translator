import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Nouns', url: '/menu', icon: 'text' },
    { title: 'Verbs', url: '/verbs', icon: 'school' },
    { title: 'Gender', url: '/gender', icon: 'woman' },
    { title: 'Settings', url: '/settings', icon: 'settings' },
    
    
  ];
  constructor() {}
}
