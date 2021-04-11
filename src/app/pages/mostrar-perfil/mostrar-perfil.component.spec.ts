import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPerfilComponent } from './mostrar-perfil.component';

describe('MostrarPerfilComponent', () => {
  let component: MostrarPerfilComponent;
  let fixture: ComponentFixture<MostrarPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
