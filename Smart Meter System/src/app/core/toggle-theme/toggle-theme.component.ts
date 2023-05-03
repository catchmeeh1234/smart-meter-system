import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-toggle-theme',
  templateUrl: './toggle-theme.component.html',
  styleUrls: ['./toggle-theme.component.scss']
})
export class ToggleThemeComponent implements OnInit {
  public isDarkMode:boolean = false;

  constructor(private overlayContainer: OverlayContainer) { }

  ngOnInit(): void {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-theme1');
      this.isDarkMode = true;
    }
  }

  toggleDarkMode() {
    if (document.body.classList.contains('dark-theme1')) {
      document.body.classList.remove('dark-theme1');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark-theme1');
      localStorage.setItem('theme', 'dark');
    }
  }
}
