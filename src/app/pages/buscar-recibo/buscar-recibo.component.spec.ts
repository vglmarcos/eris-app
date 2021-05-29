import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarReciboComponent } from './buscar-recibo.component';

describe('BuscarReciboComponent', () => {
  let component: BuscarReciboComponent;
  let fixture: ComponentFixture<BuscarReciboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarReciboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarReciboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
