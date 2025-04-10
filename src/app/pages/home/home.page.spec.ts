import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from '../../components/home/hero/hero.component';
import { DiscoverComponent } from '../../components/home/discover/discover.component';
import { FooterComponent } from '../../components/footer/footer.component';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomePage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        NavbarComponent,
        HeroComponent,
        RouterOutlet,
        DiscoverComponent,
        FooterComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render ion-content', () => {
    const ionContent = fixture.nativeElement.querySelector('ion-content');
    expect(ionContent).toBeTruthy();
    expect(ionContent.getAttribute('fullscreen')).toBe('true');
  });

  it('should render navbar component', () => {
    const navbar = fixture.nativeElement.querySelector('app-navbar');
    expect(navbar).toBeTruthy();
  });

  it('should render hero component', () => {
    const hero = fixture.nativeElement.querySelector('app-hero');
    expect(hero).toBeTruthy();
  });

  it('should render discover component', () => {
    const discover = fixture.nativeElement.querySelector('app-discover');
    expect(discover).toBeTruthy();
  });

  it('should render footer component', () => {
    const footer = fixture.nativeElement.querySelector('app-footer');
    expect(footer).toBeTruthy();
  });

  it('should have correct layout structure', () => {
    const main = fixture.nativeElement.querySelector('main');
    expect(main).toBeTruthy();
    
    const children = main.children;
    expect(children[0].tagName.toLowerCase()).toBe('app-navbar');
    expect(children[1].tagName.toLowerCase()).toBe('app-hero');
    expect(children[2].tagName.toLowerCase()).toBe('app-discover');
    expect(children[3].tagName.toLowerCase()).toBe('app-footer');
  });
});
