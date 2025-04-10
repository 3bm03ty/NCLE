import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscribeButtonComponent } from './subscribe-button.component';
import { CommonModule } from '@angular/common';

describe('SubscribeButtonComponent', () => {
  let component: SubscribeButtonComponent;
  let fixture: ComponentFixture<SubscribeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, SubscribeButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SubscribeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default button text', () => {
    expect(component.buttonText).toBe('Subscribe Now');
  });

  it('should update button text when input changes', () => {
    component.buttonText = 'Custom Text';
    fixture.detectChanges();
    
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent.trim()).toContain('Custom Text');
  });

  it('should emit click event when button is clicked', () => {
    spyOn(component.onClick, 'emit');
    
    const buttonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();
    
    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should show loading state when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();
    
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.classList.contains('cursor-not-allowed')).toBeTrue();
    
    const loadingSpinner = fixture.nativeElement.querySelector('svg');
    expect(loadingSpinner).toBeTruthy();
    
    const buttonText = buttonElement.textContent.trim();
    expect(buttonText).toContain('Processing...');
  });

  it('should not show loading state when isLoading is false', () => {
    component.isLoading = false;
    fixture.detectChanges();
    
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.classList.contains('cursor-not-allowed')).toBeFalse();
    
    const loadingSpinner = fixture.nativeElement.querySelector('svg');
    expect(loadingSpinner).toBeFalsy();
    
    const buttonText = buttonElement.textContent.trim();
    expect(buttonText).toContain('Subscribe Now');
  });
});
