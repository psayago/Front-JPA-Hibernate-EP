import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  fijar(opcion: number) {
    switch (opcion) {
      case Form.HOME:
        this.router.navigate(['/home']);
        break;
      case Form.REGISTRAR_CLIENTE:
        this.router.navigate(['/admin/register-cliente']);
        break;
      case Form.REGISTRAR_PRODUCTO:
        this.router.navigate(['/admin/register-producto']);
        break;
    }
  }
}

export enum Form {
  HOME,
  REGISTRAR_CLIENTE,
  REGISTRAR_PRODUCTO,
}
