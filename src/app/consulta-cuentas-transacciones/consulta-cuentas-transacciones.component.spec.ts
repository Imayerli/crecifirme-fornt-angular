import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCuentasTransaccionesComponent } from './consulta-cuentas-transacciones.component';

describe('ConsultaCuentasTransaccionesComponent', () => {
  let component: ConsultaCuentasTransaccionesComponent;
  let fixture: ComponentFixture<ConsultaCuentasTransaccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultaCuentasTransaccionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaCuentasTransaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
