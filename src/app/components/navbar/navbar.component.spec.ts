import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo', () => {
    const logoElement = fixture.nativeElement.querySelector('img[alt="NCLE Logo"]');
    expect(logoElement).toBeTruthy();
    expect(logoElement.src).toContain('assets/images/logo.svg');
  });

  it('should render navigation links', () => {
    const navLinks = fixture.nativeElement.querySelectorAll('a');
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it('should have correct navigation items', () => {
    const navItems = fixture.nativeElement.querySelectorAll('a');
    const expectedItems = ['Home', 'Discover', 'Subscribe'];
    
    navItems.forEach((item: Element, index: number) => {
      expect(item.textContent?.trim()).toBe(expectedItems[index]);
    });
  });

  it('should have correct styling classes', () => {
    const navElement = fixture.nativeElement.querySelector('nav');
    expect(navElement.classList.contains('sticky')).toBeTrue();
    expect(navElement.classList.contains('top-0')).toBeTrue();
    expect(navElement.classList.contains('z-50')).toBeTrue();
    expect(navElement.classList.contains('bg-background')).toBeTrue();
  });

  it('should have correct router links', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    const expectedPaths = ['/', '/discover', '/subscribe'];
    
    links.forEach((link: Element, index: number) => {
      expect(link.getAttribute('routerLink')).toBe(expectedPaths[index]);
    });
  });
});
