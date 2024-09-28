import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCuentasTransaccionesComponent } from './crear-cuentas-transacciones.component';

describe('CrearCuentasTransaccionesComponent', () => {
  let component: CrearCuentasTransaccionesComponent;
  let fixture: ComponentFixture<CrearCuentasTransaccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearCuentasTransaccionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCuentasTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
