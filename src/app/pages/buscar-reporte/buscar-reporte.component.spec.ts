import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarReporteComponent } from './buscar-reporte.component';

describe('BuscarReporteComponent', () => {
  let component: BuscarReporteComponent;
  let fixture: ComponentFixture<BuscarReporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarReporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
