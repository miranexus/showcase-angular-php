import { Component, ViewEncapsulation } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';

@Component({
  standalone: true,
  selector: 'mnx-toolbar-header',
  templateUrl: './toolbar-header.component.html',
  styleUrls: ['./toolbar-header.component.scss'],
  imports: [Toolbar, Button, InputText],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarHeaderComponent {}

