import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionPage } from './subscription.page';
import { IonContent } from '@ionic/angular/standalone';
import { SubscriptionFormComponent } from '../../components/subscription/subscription-form/subscription-form.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

describe('SubscriptionPage', () => {
  let component: SubscriptionPage;
  let fixture: ComponentFixture<SubscriptionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SubscriptionPage,
        IonContent,
        SubscriptionFormComponent,
        NavbarComponent,
        FooterComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render ion-content with fullscreen', () => {
    const ionContent = fixture.nativeElement.querySelector('ion-content');
    expect(ionContent).toBeTruthy();
    expect(ionContent.getAttribute('fullscreen')).toBe('true');
    expect(ionContent.classList.contains('bg-white')).toBeTrue();
  });

  it('should render navbar component', () => {
    const navbar = fixture.nativeElement.querySelector('app-navbar');
    expect(navbar).toBeTruthy();
  });

  it('should render subscription form component', () => {
    const form = fixture.nativeElement.querySelector('app-subscription-form');
    expect(form).toBeTruthy();
  });

  it('should render footer component', () => {
    const footer = fixture.nativeElement.querySelector('app-footer');
    expect(footer).toBeTruthy();
  });

  it('should have correct layout structure', () => {
    const mainDiv = fixture.nativeElement.querySelector('div');
    expect(mainDiv).toBeTruthy();
    
    const children = mainDiv.children;
    expect(children[0].tagName.toLowerCase()).toBe('app-navbar');
    expect(children[1].tagName.toLowerCase()).toBe('app-subscription-form');
    expect(children[2].tagName.toLowerCase()).toBe('app-footer');
  });

  it('should maintain component order', () => {
    const components = fixture.nativeElement.querySelectorAll('app-navbar, app-subscription-form, app-footer');
    expect(components[0].tagName.toLowerCase()).toBe('app-navbar');
    expect(components[1].tagName.toLowerCase()).toBe('app-subscription-form');
    expect(components[2].tagName.toLowerCase()).toBe('app-footer');
  });
});
