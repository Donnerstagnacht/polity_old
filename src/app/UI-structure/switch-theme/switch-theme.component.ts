import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-switch-theme',
  templateUrl: './switch-theme.component.html',
  styleUrls: ['./switch-theme.component.scss']
})
export class SwitchThemeComponent implements OnInit {
  lightTheme: string = 'material-light-standard-indigo';
  darkTheme: string = 'material-light-dark-indigo';


  constructor(private themeService: ThemeService) { }
  darkMode: boolean = false;

  ngOnInit(): void {
  }

  switchTheme(): void {
    this.darkMode = !this.darkMode;
    if(this.darkMode) {
      this.themeService.switchTheme(this.darkTheme);
    } else {
      this.themeService.switchTheme(this.lightTheme);

    }
  }

}
