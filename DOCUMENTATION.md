# NCLE Application Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Architecture](#architecture)
3. [Components](#components)
4. [Pages](#pages)
5. [Services](#services)
6. [Forms and Validation](#forms-and-validation)
7. [Styling and UI](#styling-and-ui)
8. [Testing](#testing)
9. [Cross-Browser Compatibility](#cross-browser-compatibility)
10. [Build and Deployment](#build-and-deployment)
11. [Troubleshooting](#troubleshooting)

## Introduction

NCLE is an educational subscription box application built with Ionic Angular. It allows parents to subscribe to monthly educational boxes tailored to their children's interests and learning needs.

### Key Features

- Home page with hero section and discover section
- Subscription form for parent and child information
- Responsive design for mobile, tablet, and desktop
- Cross-browser compatibility
- Form validation with user-friendly error messages

## Architecture

### Technology Stack

- **Framework**: Ionic Angular (v8.0.0)
- **Angular Version**: 19.0.0
- **Styling**: Tailwind CSS (v3.4.17)
- **Form Handling**: Angular Reactive Forms
- **Routing**: Angular Router
- **Testing**: Jasmine and Karma

### Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── footer/
│   │   ├── home/
│   │   │   ├── discover/
│   │   │   └── hero/
│   │   ├── navbar/
│   │   └── subscription/
│   │       ├── subscribe-button/
│   │       └── subscription-form/
│   ├── pages/
│   │   ├── home/
│   │   └── subscription/
│   ├── theme/
│   │   └── variables.css
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.spec.ts
│   ├── app.module.ts
│   └── app-routing.module.ts
├── assets/
│   ├── imgs/
│   └── svgs/
├── environments/
├── global.scss
├── index.html
├── main.ts
└── polyfills.ts
```

## Components

### Navbar Component

**Purpose**: Provides navigation for the application.

**Location**: `src/app/components/navbar/navbar.component.ts`

**Features**:
- Responsive navigation menu
- Logo display
- Navigation links to Home, Discover, and Subscribe pages

**Usage**:
```html
<app-navbar></app-navbar>
```

### Footer Component

**Purpose**: Displays footer information and links.

**Location**: `src/app/components/footer/footer.component.ts`

**Features**:
- Privacy Policy link
- Terms of Service link
- Cookies Settings link
- Copyright information

**Usage**:
```html
<app-footer></app-footer>
```

### Hero Component

**Purpose**: Displays the main hero section on the home page.

**Location**: `src/app/components/home/hero/hero.component.ts`

**Features**:
- Main heading
- Subheading text
- Subscribe button
- Hero image

**Usage**:
```html
<app-hero></app-hero>
```

### Discover Component

**Purpose**: Displays the "How It Works" section on the home page.

**Location**: `src/app/components/home/discover/discover.component.ts`

**Features**:
- Section title
- Main heading
- Description text
- Three-step process explanation
- Subscribe button

**Usage**:
```html
<app-discover></app-discover>
```

### Subscribe Button Component

**Purpose**: Reusable button for subscription actions.

**Location**: `src/app/components/subscription/subscribe-button/subscribe-button.component.ts`

**Features**:
- Customizable text
- Click event emitter
- Loading state

**Usage**:
```html
<app-subscribe-button (onClick)="navigateToSubscription()"></app-subscribe-button>
```

### Subscription Form Component

**Purpose**: Handles the subscription form for parent and child information.

**Location**: `src/app/components/subscription/subscription-form/subscription-form.component.ts`

**Features**:
- Parent contact information
- Child information
- Date of birth selection
- Topic selection
- Form validation
- Error messages
- Loading state

**Usage**:
```html
<app-subscription-form></app-subscription-form>
```

## Pages

### Home Page

**Purpose**: Landing page for the application.

**Location**: `src/app/pages/home/home.page.ts`

**Features**:
- Navbar
- Hero section
- Discover section
- Footer

**Route**: `/`

### Subscription Page

**Purpose**: Page for the subscription form.

**Location**: `src/app/pages/subscription/subscription.page.ts`

**Features**:
- Navbar
- Subscription form
- Footer

**Route**: `/subscription`

## Forms and Validation

### Subscription Form

The subscription form uses Angular's Reactive Forms for validation and data handling.

#### Form Structure

```typescript
this.subscriptionForm = this.formBuilder.group({
  contactInfo: this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    email: ['', [Validators.required, Validators.email]]
  }),
  childInfo: this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]*$/)]],
    dateOfBirth: this.formBuilder.group({
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required]
    }),
    grade: ['', Validators.required],
    gender: ['', Validators.required]
  }),
  selectedTopics: [[], [Validators.required, Validators.minLength(3)]]
});
```

#### Validation Messages

```typescript
validationMessages = {
  name: {
    required: 'Name is required',
    minlength: 'Name must be at least 2 characters long',
    pattern: 'Please enter a valid name'
  },
  email: {
    required: 'Email is required',
    email: 'Please enter a valid email address'
  },
  // ... other validation messages
};
```

#### Error Handling

```typescript
getErrorMessage(control: AbstractControl | null, fieldName: string): string {
  if (!control || !control.errors) return '';
  
  const firstError = Object.keys(control.errors)[0];
  return this.validationMessages[fieldName][firstError] || '';
}

isFieldInvalid(fieldPath: string): boolean {
  const control = this.subscriptionForm.get(fieldPath);
  return (control?.invalid && (control?.dirty || control?.touched || this.submitted)) || false;
}
```

## Styling and UI

### Tailwind CSS

The application uses Tailwind CSS for styling. Key styling features include:

- Responsive design with breakpoints
- Custom colors and spacing
- Flexbox and Grid layouts
- Transitions and animations

### Cross-Browser Compatibility

The application includes CSS fallbacks in `src/theme/variables.css` for cross-browser compatibility:

```css
/* Custom text size fallback */
.text-\[56px\] {
  font-size: 56px;
  /* Fallback for older browsers */
  font-size: calc(2.5rem + 1.5vw);
}

/* Custom background color fallback */
.bg-\[\#FFF9E6\] {
  background-color: #FFF9E6;
  /* Fallback for older browsers */
  background-color: rgb(255, 249, 230);
}

/* Size utility fallback */
.size-24 {
  width: 6rem;
  height: 6rem;
  /* Fallback for older browsers */
  width: 96px;
  height: 96px;
}

/* Flexbox fallbacks */
.flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

/* Grid fallbacks */
.grid {
  display: -ms-grid;
  display: grid;
}
```

## Testing

### Test Structure

Each component and page has a corresponding spec file with tests for:

- Component creation
- Rendering of elements
- Functionality
- Layout structure
- Styling

### Example Test

```typescript
it('should render hero section', () => {
  const section = fixture.nativeElement.querySelector('section');
  expect(section).toBeTruthy();
  expect(section.classList.contains('bg-background')).toBeTrue();
  expect(section.classList.contains('p-8')).toBeTrue();
  expect(section.classList.contains('md:p-16')).toBeTrue();
});
```

### Running Tests

```bash
npm test
```

## Cross-Browser Compatibility

### Supported Browsers

- Chrome >=79
- ChromeAndroid >=79
- Firefox >=70
- Edge >=79
- Safari >=14
- iOS >=14

### Browser Configuration

The browser support is configured in `.browserslistrc`:

```
Chrome >=79
ChromeAndroid >=79
Firefox >=70
Edge >=79
Safari >=14
iOS >=14
```

## Build and Deployment

### Development Build

```bash
npm start
```

### Production Build

```bash
npm run build
```

### Deployment

The built application is located in the `www` directory and can be deployed to any static hosting service.

## Troubleshooting

### Common Issues

1. **Footer not visible**
   - Ensure the footer is placed after the router outlet in the app component
   - Check for any CSS that might be hiding the footer

2. **Navbar overlapping content**
   - Ensure the navbar has the correct positioning (sticky)
   - Add appropriate padding to the content below the navbar

3. **Form validation errors not showing**
   - Ensure the form is marked as touched when submitted
   - Check that the error messages are correctly defined

4. **Cross-browser styling issues**
   - Check the CSS fallbacks in `src/theme/variables.css`
   - Ensure vendor prefixes are used for flexbox and grid

### Getting Help

If you encounter issues not covered in this documentation, please:

1. Check the console for errors
2. Review the component and page code
3. Consult the Angular and Ionic documentation
4. Contact the development team 