import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        NavbarComponent,
        FooterComponent
      ],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navbar', () => {
    const navbarElement = fixture.nativeElement.querySelector('app-navbar');
    expect(navbarElement).toBeTruthy();
  });

  it('should render router outlet', () => {
    const routerOutlet = fixture.nativeElement.querySelector('ion-router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it('should render footer', () => {
    const footerElement = fixture.nativeElement.querySelector('app-footer');
    expect(footerElement).toBeTruthy();
  });

  it('should have correct layout structure', () => {
    const mainElement = fixture.nativeElement.querySelector('main');
    expect(mainElement).toBeTruthy();
    expect(mainElement.classList.contains('flex')).toBeTrue();
    expect(mainElement.classList.contains('flex-col')).toBeTrue();
    expect(mainElement.classList.contains('min-h-screen')).toBeTrue();
  });
});
