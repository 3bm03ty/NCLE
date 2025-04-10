import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DiscoverComponent } from './discover.component';
import { SubscribeButtonComponent } from '../../subscription/subscribe-button/subscribe-button.component';

describe('DiscoverComponent', () => {
  let component: DiscoverComponent;
  let fixture: ComponentFixture<DiscoverComponent>;
  let router: Router;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      imports: [
        DiscoverComponent,
        SubscribeButtonComponent
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render discover section', () => {
    const section = fixture.nativeElement.querySelector('div');
    expect(section).toBeTruthy();
    expect(section.classList.contains('bg-[#FFF9E6]')).toBeTrue();
    expect(section.classList.contains('min-h-screen')).toBeTrue();
  });

  it('should render section title', () => {
    const title = fixture.nativeElement.querySelector('h2');
    expect(title).toBeTruthy();
    expect(title.textContent?.trim()).toBe('Discover');
    expect(title.classList.contains('font-semibold')).toBeTrue();
  });

  it('should render main heading', () => {
    const heading = fixture.nativeElement.querySelector('h3');
    expect(heading).toBeTruthy();
    expect(heading.textContent?.trim()).toBe('How It Works: Subscribe and Receive Your Surprise Box');
    expect(heading.classList.contains('text-5xl')).toBeTrue();
    expect(heading.classList.contains('font-bold')).toBeTrue();
  });

  it('should render description paragraph', () => {
    const paragraph = fixture.nativeElement.querySelector('p');
    expect(paragraph).toBeTruthy();
    expect(paragraph.textContent?.trim()).toContain('Subscribe to our surprise subscription box');
    expect(paragraph.classList.contains('text-2xl')).toBeTrue();
  });

  it('should render all three steps', () => {
    const steps = fixture.nativeElement.querySelectorAll('h4');
    expect(steps.length).toBe(3);
    
    expect(steps[0].textContent?.trim()).toContain('Step 1:');
    expect(steps[1].textContent?.trim()).toContain('Step 2:');
    expect(steps[2].textContent?.trim()).toContain('Step 3:');
  });

  it('should render step icons', () => {
    const icons = fixture.nativeElement.querySelectorAll('img');
    expect(icons.length).toBe(3);
    
    expect(icons[0].getAttribute('src')).toBe('assets/svgs/subscribe.svg');
    expect(icons[1].getAttribute('src')).toBe('assets/svgs/customize.svg');
    expect(icons[2].getAttribute('src')).toBe('assets/svgs/surprise.svg');
  });

  it('should render subscribe button', () => {
    const button = fixture.nativeElement.querySelector('app-subscribe-button');
    expect(button).toBeTruthy();
  });

  it('should navigate to subscription page when subscribe button is clicked', () => {
    component.navigateToSubscription();
    expect(router.navigate).toHaveBeenCalledWith(['/subscription']);
  });

  it('should have correct layout structure', () => {
    const mainContainer = fixture.nativeElement.querySelector('div');
    const flexContainer = mainContainer.querySelector('.flex');
    const gridContainer = mainContainer.querySelector('.grid');
    
    expect(flexContainer).toBeTruthy();
    expect(gridContainer).toBeTruthy();
    expect(gridContainer.classList.contains('gap-12')).toBeTrue();
  });
});
