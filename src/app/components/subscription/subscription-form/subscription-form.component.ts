import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubscribeButtonComponent } from '../subscribe-button/subscribe-button.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SubscribeButtonComponent]
})
export class SubscriptionFormComponent implements OnInit {
  subscriptionForm: FormGroup = new FormGroup({});
  topics = ['Arabic', 'Islamic', 'English', 'History', 'Sports'];
  availableDays: number[] = [];
  availableYears: number[] = [];
  submitted = false;
  isLoading = false;
  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];

  validationMessages: { [key: string]: { [key: string]: string } } = {
    name: {
      required: 'Name is required',
      minlength: 'Name must be at least 2 characters long',
      pattern: 'Please enter a valid name'
    },
    email: {
      required: 'Email is required',
      email: 'Please enter a valid email address'
    },
    fullName: {
      required: 'Child\'s full name is required',
      minlength: 'Name must be at least 2 characters long',
      pattern: 'Please enter a valid name'
    },
    day: {
      required: 'Day is required'
    },
    month: {
      required: 'Month is required'
    },
    year: {
      required: 'Year is required'
    },
    grade: {
      required: 'Grade is required'
    },
    gender: {
      required: 'Gender is required'
    },
    selectedTopics: {
      required: 'Please select topics',
      minlength: 'Please select exactly 3 topics',
      maxlength: 'Please select exactly 3 topics'
    }
  };

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.generateYearRange();
  }

  generateYearRange() {
    const currentYear = new Date().getFullYear();
    const startYear = 1990;
    const years: number[] = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push(year);
    }
    this.availableYears = years;
  }

  ngOnInit() {
    // Watch for month and year changes to update available days
    this.subscriptionForm.get('childInfo.dateOfBirth.month')?.valueChanges.subscribe(() => {
      this.updateAvailableDays();
    });
    this.subscriptionForm.get('childInfo.dateOfBirth.year')?.valueChanges.subscribe(() => {
      this.updateAvailableDays();
    });
  }

  createForm() {
    this.subscriptionForm = this.fb.group({
      contactInfo: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]*$/)]],
        email: ['', [Validators.required, Validators.email]]
      }),
      childInfo: this.fb.group({
        fullName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]*$/)]],
        dateOfBirth: this.fb.group({
          day: ['', Validators.required],
          month: ['', Validators.required],
          year: ['', Validators.required]
        }),
        grade: ['', Validators.required],
        gender: ['', Validators.required]
      }),
      selectedTopics: [[], [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  updateAvailableDays() {
    const month = this.subscriptionForm.get('childInfo.dateOfBirth.month')?.value;
    const year = this.subscriptionForm.get('childInfo.dateOfBirth.year')?.value;
    const currentDay = this.subscriptionForm.get('childInfo.dateOfBirth.day')?.value;

    if (month && year) {
      const daysInMonth = new Date(year, month, 0).getDate();
      this.availableDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

      // If the currently selected day is greater than the days in the new month, reset it
      if (currentDay > daysInMonth) {
        this.subscriptionForm.patchValue({
          childInfo: {
            dateOfBirth: {
              day: ''
            }
          }
        });
      }
    } else {
      this.availableDays = [];
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.subscriptionForm.valid) {
      this.isLoading = true;

      // Simulate API call (replace with actual API call)
      setTimeout(() => {
        this.isLoading = false;
        Swal.fire({
          title: 'Success!',
          text: 'Your subscription has been processed successfully',
          icon: 'success',
          confirmButtonText: 'Continue to Payment',
          confirmButtonColor: '#896af9',
          showCancelButton: true,
          cancelButtonText: 'Close',
          cancelButtonColor: '#6B7280',
          position: 'top',
          toast: true,
          timer: 5000,
          timerProgressBar: true,
          backdrop: false
        }).then((result) => {
          if (result.isConfirmed) {
            // Handle payment navigation
            console.log('Proceeding to payment...');
          }
        });
      }, 1500);
    } else {
      this.markFormGroupTouched(this.subscriptionForm);
    }
  }



  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getErrorMessage(control: AbstractControl | null, fieldName: string): string {
    if (!control || !control.errors || !control.touched) return '';

    const errors = Object.keys(control.errors);
    const messages = this.validationMessages[fieldName as keyof typeof this.validationMessages];

    return messages[errors[0] as keyof typeof messages] || 'Invalid field';
  }

  onTopicSelect(topic: string) {
    const currentTopics = this.subscriptionForm.get('selectedTopics')?.value || [];
    if (currentTopics.includes(topic)) {
      this.subscriptionForm.patchValue({
        selectedTopics: currentTopics.filter((t: string) => t !== topic)
      });
    } else if (currentTopics.length < 3) {
      this.subscriptionForm.patchValue({
        selectedTopics: [...currentTopics, topic]
      });
    }
  }

  isTopicSelected(topic: string): boolean {
    return this.subscriptionForm.get('selectedTopics')?.value?.includes(topic) || false;
  }

  isFieldInvalid(path: string): boolean {
    const control = this.subscriptionForm.get(path);
    return !!control && control.invalid && (control.touched || this.submitted);
  }



}
