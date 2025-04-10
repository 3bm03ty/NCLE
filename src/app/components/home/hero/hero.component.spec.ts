import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeroComponent } from './hero.component';
import { SubscribeButtonComponent } from '../../subscription/subscribe-button/subscribe-button.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let router: Router;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      imports: [
        HeroComponent,
        SubscribeButtonComponent
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero section', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section).toBeTruthy();
    expect(section.classList.contains('bg-background')).toBeTrue();
    expect(section.classList.contains('p-8')).toBeTrue();
    expect(section.classList.contains('md:p-16')).toBeTrue();
  });

  it('should render main heading', () => {
    const heading = fixture.nativeElement.querySelector('h1');
    expect(heading).toBeTruthy();
    expect(heading.textContent?.trim()).toBe('Discover the magic of our surprise box');
    expect(heading.classList.contains('text-[56px]')).toBeTrue();
    expect(heading.classList.contains('font-black')).toBeTrue();
    expect(heading.classList.contains('text-shadow-primary')).toBeTrue();
  });

  it('should render subheading paragraph', () => {
    const paragraph = fixture.nativeElement.querySelector('p');
    expect(paragraph).toBeTruthy();
    expect(paragraph.textContent?.trim()).toContain('Unleash your child\'s curiosity');
    expect(paragraph.classList.contains('text-2xl')).toBeTrue();
    expect(paragraph.classList.contains('font-bold')).toBeTrue();
    expect(paragraph.classList.contains('leading-paragraph')).toBeTrue();
  });

  it('should render subscribe button', () => {
    const button = fixture.nativeElement.querySelector('app-subscribe-button');
    expect(button).toBeTruthy();
  });

  it('should render hero image', () => {
    const image = fixture.nativeElement.querySelector('img');
    expect(image).toBeTruthy();
    expect(image.getAttribute('src')).toBe('assets/imgs/Placeholder Image.png');
    expect(image.getAttribute('alt')).toBe('Stack of colorful gift boxes');
    expect(image.classList.contains('w-full')).toBeTrue();
    expect(image.classList.contains('h-auto')).toBeTrue();
    expect(image.classList.contains('object-contain')).toBeTrue();
  });

  it('should navigate to subscription page when subscribe button is clicked', () => {
    component.navigateToSubscription();
    expect(router.navigate).toHaveBeenCalledWith(['/subscription']);
  });

  it('should have correct layout structure', () => {
    const section = fixture.nativeElement.querySelector('section');
    const flexContainer = section.querySelector('.flex');
    const textContainer = flexContainer.querySelector('.text-center');
    
    expect(flexContainer).toBeTruthy();
    expect(textContainer).toBeTruthy();
    expect(textContainer.classList.contains('grid')).toBeTrue();
    expect(textContainer.classList.contains('gap-6')).toBeTrue();
    expect(textContainer.classList.contains('max-w-3xl')).toBeTrue();
  });

  it('should have correct responsive classes', () => {
    const section = fixture.nativeElement.querySelector('section');
    expect(section.classList.contains('md:p-16')).toBeTrue();
    expect(section.classList.contains('md:pt-0')).toBeTrue();
  });
});
