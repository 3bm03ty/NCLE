import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render footer element', () => {
    const footerElement = fixture.nativeElement.querySelector('footer');
    expect(footerElement).toBeTruthy();
    expect(footerElement.classList.contains('bg-white')).toBeTrue();
  });

  it('should render privacy policy link', () => {
    const privacyLink = fixture.nativeElement.querySelector('a[href="#"]');
    expect(privacyLink).toBeTruthy();
    expect(privacyLink.textContent?.trim()).toBe('Privacy Policy');
  });

  it('should render terms of service link', () => {
    const termsLink = fixture.nativeElement.querySelectorAll('a[href="#"]')[1];
    expect(termsLink).toBeTruthy();
    expect(termsLink.textContent?.trim()).toBe('Terms of Service');
  });

  it('should render cookies settings link', () => {
    const cookiesLink = fixture.nativeElement.querySelectorAll('a[href="#"]')[2];
    expect(cookiesLink).toBeTruthy();
    expect(cookiesLink.textContent?.trim()).toBe('Cookies Settings');
  });

  it('should render copyright text', () => {
    const copyrightText = fixture.nativeElement.querySelector('p');
    expect(copyrightText).toBeTruthy();
    expect(copyrightText.textContent?.trim()).toContain('© 2023 Relume');
  });

  it('should have correct styling classes', () => {
    const footerElement = fixture.nativeElement.querySelector('footer');
    expect(footerElement.classList.contains('p-8')).toBeTrue();
    expect(footerElement.classList.contains('md:p-16')).toBeTrue();
    expect(footerElement.classList.contains('py-20')).toBeTrue();
  });

  it('should have correct link styling', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    links.forEach((link: Element) => {
      expect(link.classList.contains('hover:text-primary')).toBeTrue();
      expect(link.classList.contains('text-sm')).toBeTrue();
      expect(link.classList.contains('transition-colors')).toBeTrue();
      expect(link.classList.contains('text-black')).toBeTrue();
      expect(link.classList.contains('underline')).toBeTrue();
    });
  });
});
