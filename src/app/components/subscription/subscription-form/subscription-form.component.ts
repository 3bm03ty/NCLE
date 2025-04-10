import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubscribeButtonComponent } from '../subscribe-button/subscribe-button.component';

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
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      }),
      childInfo: this.fb.group({
        fullName: ['', Validators.required],
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
      this.availableDays = Array.from({length: daysInMonth}, (_, i) => i + 1);

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
    if (this.subscriptionForm.valid) {
      console.log(this.subscriptionForm.value);
      // Handle form submission
    }
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
}
