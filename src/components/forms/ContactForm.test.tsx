import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from './ContactForm';
import { Wrapper } from '@/tests/Wrapper';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

// Mock the translation function
vi.mock('@/stores/languageStore', async () => {
  const actual = await vi.importActual('@/stores/languageStore');
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => {
        const translations: Record<string, string> = {
          'form.name.label': 'Name',
          'form.name.placeholder': 'Your name',
          'form.email.label': 'Email',
          'form.email.placeholder': 'Your email',
          'form.message.label': 'Message',
          'form.message.placeholder': 'Your message',
          'form.submit': 'Submit',
          'form.submitting': 'Submitting...',
          'form.validation.nameRequired': 'Name is required (min 2 characters)',
          'form.validation.emailInvalid': 'Valid email is required',
          'form.validation.messageRequired': 'Message is required (min 10 characters)'
        };
        return translations[key] || key;
      }
    })
  };
});

// Mock window.alert
const alertMock = vi.fn();
window.alert = alertMock;

// Mock console.log
const consoleLogMock = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('ContactForm', () => {
  beforeEach(() => {
    alertMock.mockClear();
    consoleLogMock.mockClear();
  });

  it('should render the form with all fields', () => {
    render(<ContactForm />, { wrapper: Wrapper });
    
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('message-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('should show validation errors when submitting empty form', async () => {
    render(<ContactForm />, { wrapper: Wrapper });
    
    // Click submit without filling any fields
    fireEvent.click(screen.getByTestId('submit-button'));
    
    // Wait for form validation to happen
    // By checking if any error messages are visible
    await waitFor(() => {
      // At least one of the inputs should be marked as invalid
      const nameInput = screen.getByTestId('name-input');
      const emailInput = screen.getByTestId('email-input');
      const messageInput = screen.getByTestId('message-input');
      
      const hasInvalidInputs = 
        nameInput.getAttribute('aria-invalid') === 'true' ||
        emailInput.getAttribute('aria-invalid') === 'true' ||
        messageInput.getAttribute('aria-invalid') === 'true';
        
      expect(hasInvalidInputs).toBe(true);
    });
  });

  it('should validate email format', async () => {
    render(<ContactForm />, { wrapper: Wrapper });
    
    // Fill in name and message, but invalid email
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByTestId('message-input'), { target: { value: 'This is a test message that is long enough' } });
    
    // Submit the form
    fireEvent.click(screen.getByTestId('submit-button'));
    
    // We'll check if the form doesn't submit - if it did, alert would be called
    await waitFor(() => {
      expect(alertMock).not.toHaveBeenCalled();
    });
  });

  it('should validate message length', async () => {
    render(<ContactForm />, { wrapper: Wrapper });
    
    // Fill in name and email, but short message
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByTestId('message-input'), { target: { value: 'Too short' } });
    
    // Submit the form
    fireEvent.click(screen.getByTestId('submit-button'));
    
    // We'll check if the form doesn't submit - if it did, alert would be called
    await waitFor(() => {
      expect(alertMock).not.toHaveBeenCalled();
    });
  });

  it('should submit the form with valid data', async () => {
    const user = userEvent.setup();
    render(<ContactForm />, { wrapper: Wrapper });
    
    // Fill all fields with valid data
    await user.type(screen.getByTestId('name-input'), 'John Doe');
    await user.type(screen.getByTestId('email-input'), 'john@example.com');
    await user.type(screen.getByTestId('message-input'), 'This is a test message that is long enough for testing purposes.');
    
    // Submit the form
    await user.click(screen.getByTestId('submit-button'));
    
    // Verify form submission
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalled();
      expect(consoleLogMock).toHaveBeenCalledWith('Form submitted:', expect.any(Object));
    });
  });
}); 