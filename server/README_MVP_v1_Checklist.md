# CropsMarket MVP v1 Checklist

## Goal
Validate that farmers can list produce and buyers can discover and contact them.

## Phase 1: Authentication
- [x] Phone number registration
- [ ] SMS OTP verification
- [x] Login
- [x] JWT authentication
- [ ] Forgot Password
- [ ] Reset Password
- [x] Role selection (Farmer / Buyer)
- [x] Logout

## Phase 2: User Profiles
### Farmer
- [x] Create profile
- [x] Edit profile
- [x] Farm name (optional)
- [x] State & LGA
- [x] Profile photo (optional)

### Buyer
- [x] Create profile
- [x] Edit profile
- [x] Company/business name (optional)
- [x] Profile photo (optional)

## Phase 3: Product Catalog (Admin Managed)
- [ ] Create product
- [ ] Update product
- [ ] Delete product
- [ ] View products
- [ ] Enable/disable product

## Phase 4: Listings
- [ ] Create listing
- [ ] Upload images
- [ ] Edit listing
- [ ] Delete listing
- [ ] View own listings
- [ ] Mark listing as sold
- [ ] Pause/activate listing

Listing fields:
- Product
- Quantity
- Unit
- Price
- Description
- Location
- Availability

## Phase 5: Marketplace
- [ ] Browse listings
- [ ] View listing details
- [ ] Search by product
- [ ] Filter by state
- [ ] Filter by LGA
- [ ] Filter by price
- [ ] Filter by availability

## Phase 6: Buyer Inquiry
- [ ] Contact farmer via WhatsApp
- [ ] Record inquiry
- [ ] View inquiry history

## Phase 7: Dashboards
### Farmer Dashboard
- [ ] Overview
- [ ] Active listings
- [ ] Sold listings
- [ ] Buyer inquiries

### Buyer Dashboard
- [ ] Overview
- [ ] Previous inquiries

### Admin Dashboard
- [ ] User management
- [ ] Farmer verification
- [ ] Product management
- [ ] Listing moderation
- [ ] Platform statistics

## Phase 8: Security
- [ ] Role-based access control
- [x] Request validation
- [x] Error handling
- [x] File upload validation

## Phase 9: Deployment
- [ ] Environment configuration
- [ ] Database migration
- [ ] Backend deployment
- [ ] Frontend deployment
- [ ] Production testing

# Out of Scope (MVP v1)
- [ ] Climate intelligence
- [ ] Online payments
- [ ] Escrow
- [ ] Logistics
- [ ] Real-time chat
- [ ] Ratings & reviews
- [ ] AI crop recommendations
- [ ] Push notifications
- [ ] Mobile applications
- [ ] Loans & credit
