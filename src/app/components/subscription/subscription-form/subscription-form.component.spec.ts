import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SubscriptionFormComponent } from './subscription-form.component';
import { SubscribeButtonComponent } from '../subscribe-button/subscribe-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SubscriptionFormComponent', () => {
  let component: SubscriptionFormComponent;
  let fixture: ComponentFixture<SubscriptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SubscriptionFormComponent,
        SubscribeButtonComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.subscriptionForm).toBeDefined();
    expect(component.subscriptionForm.invalid).toBeTruthy();
  });

  it('should have correct initial values for date ranges', () => {
    expect(component.availableDays.length).toBe(31);
    expect(component.availableDays[0]).toBe(1);
    expect(component.availableDays[30]).toBe(31);
    
    const currentYear = new Date().getFullYear();
    expect(component.availableYears.length).toBe(18);
    expect(component.availableYears[0]).toBe(currentYear - 18);
    expect(component.availableYears[17]).toBe(currentYear - 1);
  });

  it('should have correct months data', () => {
    expect(component.months.length).toBe(12);
    expect(component.months[0].name).toBe('January');
    expect(component.months[0].value).toBe(1);
    expect(component.months[11].name).toBe('December');
    expect(component.months[11].value).toBe(12);
  });

  it('should have correct topics', () => {
    expect(component.topics).toContain('Arabic');
    expect(component.topics).toContain('Islamic');
    expect(component.topics).toContain('English');
    expect(component.topics).toContain('History');
    expect(component.topics).toContain('Sports');
  });

  it('should validate parent name field', () => {
    const nameControl = component.subscriptionForm.get('contactInfo.name');
    expect(nameControl?.errors?.['required']).toBeTruthy();
    
    nameControl?.setValue('a');
    expect(nameControl?.errors?.['minlength']).toBeTruthy();
    
    nameControl?.setValue('John123');
    expect(nameControl?.errors?.['pattern']).toBeTruthy();
    
    nameControl?.setValue('John Doe');
    expect(nameControl?.errors).toBeNull();
  });

  it('should validate email field', () => {
    const emailControl = component.subscriptionForm.get('contactInfo.email');
    expect(emailControl?.errors?.['required']).toBeTruthy();
    
    emailControl?.setValue('invalid-email');
    expect(emailControl?.errors?.['email']).toBeTruthy();
    
    emailControl?.setValue('valid@email.com');
    expect(emailControl?.errors).toBeNull();
  });

  it('should validate child name field', () => {
    const nameControl = component.subscriptionForm.get('childInfo.fullName');
    expect(nameControl?.errors?.['required']).toBeTruthy();
    
    nameControl?.setValue('a');
    expect(nameControl?.errors?.['minlength']).toBeTruthy();
    
    nameControl?.setValue('Sarah123');
    expect(nameControl?.errors?.['pattern']).toBeTruthy();
    
    nameControl?.setValue('Sarah Mohammed');
    expect(nameControl?.errors).toBeNull();
  });

  it('should validate date of birth fields', () => {
    const dayControl = component.subscriptionForm.get('childInfo.dateOfBirth.day');
    const monthControl = component.subscriptionForm.get('childInfo.dateOfBirth.month');
    const yearControl = component.subscriptionForm.get('childInfo.dateOfBirth.year');
    
    expect(dayControl?.errors?.['required']).toBeTruthy();
    expect(monthControl?.errors?.['required']).toBeTruthy();
    expect(yearControl?.errors?.['required']).toBeTruthy();
    
    dayControl?.setValue(15);
    monthControl?.setValue(6);
    yearControl?.setValue(2020);
    
    expect(dayControl?.errors).toBeNull();
    expect(monthControl?.errors).toBeNull();
    expect(yearControl?.errors).toBeNull();
  });

  it('should validate grade field', () => {
    const gradeControl = component.subscriptionForm.get('childInfo.grade');
    expect(gradeControl?.errors?.['required']).toBeTruthy();
    
    gradeControl?.setValue('Grade 5');
    expect(gradeControl?.errors).toBeNull();
  });

  it('should validate gender field', () => {
    const genderControl = component.subscriptionForm.get('childInfo.gender');
    expect(genderControl?.errors?.['required']).toBeTruthy();
    
    genderControl?.setValue('Boy');
    expect(genderControl?.errors).toBeNull();
    
    genderControl?.setValue('Girl');
    expect(genderControl?.errors).toBeNull();
  });

  it('should validate topics selection', () => {
    const topicsControl = component.subscriptionForm.get('selectedTopics');
    expect(topicsControl?.errors?.['required']).toBeTruthy();
    
    topicsControl?.setValue(['Arabic']);
    expect(topicsControl?.errors?.['minlength']).toBeTruthy();
    
    topicsControl?.setValue(['Arabic', 'Islamic', 'English']);
    expect(topicsControl?.errors).toBeNull();
  });

  it('should handle topic selection correctly', () => {
    expect(component.isTopicSelected('Arabic')).toBeFalse();
    
    component.onTopicSelect('Arabic');
    expect(component.isTopicSelected('Arabic')).toBeTrue();
    expect(component.subscriptionForm.get('selectedTopics')?.value).toContain('Arabic');
    
    component.onTopicSelect('Arabic');
    expect(component.isTopicSelected('Arabic')).toBeFalse();
    expect(component.subscriptionForm.get('selectedTopics')?.value).not.toContain('Arabic');
  });

  it('should limit topic selection to 3 topics', () => {
    component.onTopicSelect('Arabic');
    component.onTopicSelect('Islamic');
    component.onTopicSelect('English');
    component.onTopicSelect('History'); // This should not be added
    
    expect(component.subscriptionForm.get('selectedTopics')?.value.length).toBe(3);
    expect(component.subscriptionForm.get('selectedTopics')?.value).toContain('Arabic');
    expect(component.subscriptionForm.get('selectedTopics')?.value).toContain('Islamic');
    expect(component.subscriptionForm.get('selectedTopics')?.value).toContain('English');
    expect(component.subscriptionForm.get('selectedTopics')?.value).not.toContain('History');
  });

  it('should show validation errors when submitting invalid form', () => {
    component.onSubmit();
    expect(component.submitted).toBeTrue();
  });

  it('should handle form submission for valid form', fakeAsync(() => {
    // Fill in valid form data
    component.subscriptionForm.patchValue({
      contactInfo: {
        name: 'John Doe',
        email: 'john@example.com'
      },
      childInfo: {
        fullName: 'Sarah Mohammed',
        dateOfBirth: {
          day: 15,
          month: 6,
          year: 2020
        },
        grade: 'Grade 5',
        gender: 'Girl'
      },
      selectedTopics: ['Arabic', 'Islamic', 'English']
    });
    
    component.onSubmit();
    expect(component.isLoading).toBeTrue();
    
    tick(1500);
    expect(component.isLoading).toBeFalse();
  }));

  it('should mark form as touched when submitted', () => {
    const nameControl = component.subscriptionForm.get('contactInfo.name');
    expect(nameControl?.touched).toBeFalse();
    
    component.onSubmit();
    expect(nameControl?.touched).toBeTrue();
  });

  it('should get correct error messages', () => {
    const nameControl = component.subscriptionForm.get('contactInfo.name');
    expect(component.getErrorMessage(nameControl, 'name')).toBe('Name is required');
    
    nameControl?.setValue('a');
    expect(component.getErrorMessage(nameControl, 'name')).toBe('Name must be at least 2 characters long');
    
    nameControl?.setValue('John123');
    expect(component.getErrorMessage(nameControl, 'name')).toBe('Please enter a valid name');
  });

  it('should correctly identify invalid fields', () => {
    expect(component.isFieldInvalid('contactInfo.name')).toBeFalse();
    
    component.submitted = true;
    expect(component.isFieldInvalid('contactInfo.name')).toBeTrue();
    
    component.subscriptionForm.get('contactInfo.name')?.setValue('John Doe');
    expect(component.isFieldInvalid('contactInfo.name')).toBeFalse();
  });
});
