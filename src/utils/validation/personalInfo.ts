import { PersonalInfoFormProps } from '../../types/forms';

export function validatePersonalInfo(formData: PersonalInfoFormProps['formData']): Record<string, string> {
  const errors: Record<string, string> = {};

  // Required field validation
  if (!formData.firstName.trim()) {
    errors.firstName = 'First Name is required';
  }
  
  if (!formData.lastName.trim()) {
    errors.lastName = 'Last Name is required';
  }
  
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
    errors.email = 'Invalid email address';
  }
  
  if (!formData.city.trim()) {
    errors.city = 'City is required';
  }
  
  if (!formData.country) {
    errors.country = 'Country is required';
  }
  
  if (!formData.zip.trim()) {
    errors.zip = 'ZIP/Postal Code is required';
  }
  
  if (formData.country === 'US' && !formData.state) {
    errors.state = 'State is required for US addresses';
  }

  // Company name validation for specific membership levels
  if (['exhibitor', 'vendor'].includes(formData.membershipLevel) && !formData.companyName?.trim()) {
    errors.companyName = 'Company Name is required for this membership type';
  }

  return errors;
}