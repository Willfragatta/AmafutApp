import { ComponentFixture, TestBed } from '@angular/core/testing'; // aqui é pra testar o componente

import { Login } from './login'; // aqui é pra importar o componente

describe('Login', () => {
  let component: Login; // aqui é pra criar o componente
  let fixture: ComponentFixture<Login>; // aqui é pra criar o fixture

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login] // aqui é pra importar o componente para testar
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
