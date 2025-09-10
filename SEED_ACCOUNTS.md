# Seed Accounts for Bharat Livestock AI

This document contains the pre-configured user accounts for testing the application.

## Admin Accounts

| Name | Email | Password | ID |
|------|-------|----------|-----|
| Dr. Rajesh Kumar | admin@bharat-livestock.gov.in | admin123 | ADMIN001 |
| Dr. Priya Sharma | priya.sharma@bharat-livestock.gov.in | admin456 | ADMIN002 |
| Dr. Amit Patel | amit.patel@bharat-livestock.gov.in | admin789 | ADMIN003 |

## Field Level Worker (FLW) Accounts

| Name | Aadhaar | Mobile | Password | ID | Area |
|------|---------|--------|----------|-----|------|
| Raj Kumar Singh | 123456789012 | 9876543210 | flw123 | FLW001 | Ahmedabad District, Gujarat |
| Priya Patel | 246813579024 | 8765432109 | flw456 | FLW002 | Surat District, Gujarat |
| Amit Sharma | 357924681035 | 7654321098 | flw789 | FLW003 | Vadodara District, Gujarat |
| Sunita Devi | 468135792046 | 6543210987 | flw101 | FLW004 | Panipat District, Haryana |
| Vijay Kumar | 579246813057 | 5432109876 | flw202 | FLW005 | Bangalore Rural, Karnataka |
| Meera Singh | 680357924068 | 4321098765 | flw303 | FLW006 | Pune District, Maharashtra |
| Ravi Kumar | 791468035079 | 3210987654 | flw404 | FLW007 | Coimbatore District, Tamil Nadu |

## Login Instructions

### For Admin Users:
1. Go to the login page
2. Select the "Admin" tab
3. Enter your email and password from the table above
4. Click "Sign In as Admin"

### For FLW Users:
1. Go to the login page
2. Select the "FLW" tab
3. Enter either your Aadhaar number OR mobile number
4. Enter your password from the table above
5. Click "Sign In as FLW"

## Account Status

- **Active**: Most accounts are active and can be used for login
- **Pending**: FLW006 (Meera Singh) - account is pending approval
- **Inactive**: FLW007 (Ravi Kumar) - account is inactive

## Notes

- All passwords are simple for testing purposes
- In a production environment, these would be more secure
- The system validates credentials against the seed data
- User sessions are maintained in localStorage
- Last login times are tracked and updated on successful authentication
