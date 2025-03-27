import { render, screen } from '@testing-library/react';
import ContactPage from './page';
import { Wrapper } from '@/tests/Wrapper';
import { vi } from 'vitest';

// Mock the ContactForm component
vi.mock('@/components/forms/ContactForm', () => ({
  ContactForm: () => <div data-testid="contact-form-mock">Contact Form Mock</div>
}));

describe('ContactPage', () => {
  it('should render the contact page title', () => {
    render(<ContactPage />, { wrapper: Wrapper });
    expect(screen.getByRole('heading', { name: /contact us/i })).toBeInTheDocument();
  });

  it('should render the contact form', () => {
    render(<ContactPage />, { wrapper: Wrapper });
    expect(screen.getByTestId('contact-form-mock')).toBeInTheDocument();
  });

  it('should display the introductory paragraph', () => {
    render(<ContactPage />, { wrapper: Wrapper });
    expect(screen.getByText(/have a question or feedback/i)).toBeInTheDocument();
  });
}); 