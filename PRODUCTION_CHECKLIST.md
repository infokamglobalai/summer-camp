# 🚀 Production Deployment Checklist

## ✅ Critical Configuration Items

### Backend Environment Variables (.env)
- [ ] `MONGODB_URI` - Using production MongoDB cluster
- [ ] `OTTU_API_KEY` - Production API key (secure this!)
- [ ] `OTTU_API_URL` - Production Ottu endpoint (already set)
- [ ] `WEBHOOK_URL` - Set to: `https://api.eduaitutors.com/api/payment/ottu/webhook`
- [ ] `REDIRECT_URL` - Set to: `https://www.eduaitutors.com/payment-success`
- [ ] `FRONTEND_URL` - Set to: `https://www.eduaitutors.com`
- [ ] `SMTP_HOST` - Set to: `smtp.office365.com`
- [ ] `SMTP_PORT` - Set to: `587`
- [ ] `SMTP_USER` - Production email address
- [ ] `SMTP_PASS` - App password (NOT personal password!)

### Frontend Environment Variables (.env)
- [ ] `VITE_API_BASE_URL` - Change to: `https://bootcamp.eduaitutors.com/api`

### Security
- [ ] Remove sensitive credentials from `.env` - use secrets manager
- [ ] Enable HTTPS on Ottu payment gateway
- [ ] Set secure CORS headers (already configured)
- [ ] Add rate limiting to prevent abuse
- [ ] Enable helmet security headers (already enabled)

### Testing Before Going Live
- [ ] Test enrollment form on production domain
- [ ] Test payment flow end-to-end
- [ ] Verify webhook endpoint receives payment callbacks
- [ ] Confirm confirmation emails are sent
- [ ] Test payment redirect to success page
- [ ] Verify database saves all registrations

### Deployment Steps
1. Update backend `.env` with production values
2. Update frontend `.env` with production API URL
3. Build frontend: `npm run build`
4. Deploy frontend to hosting (e.g., Vercel, Netlify)
5. Deploy backend to server (e.g., Railway, Heroku)
6. Set up SSL/HTTPS certificates
7. Update Ottu webhook URL to production endpoint
8. Test full payment flow in production

### Domain Configuration
- Frontend: `https://bootcamp.eduaitutors.com`
- Backend API: `https://bootcamp.eduaitutors.com/api` (via subdirectory routing)
- Webhook callback: `https://bootcamp.eduaitutors.com/api/payment/ottu/webhook`
- Payment success redirect: `https://bootcamp.eduaitutors.com/payment-success`

### Monitoring
- [ ] Set up error logging (e.g., Sentry)
- [ ] Monitor payment success/failure rates
- [ ] Monitor email delivery
- [ ] Monitor MongoDB connection status
- [ ] Set up alerts for critical errors

---

## ⚠️ Current Status

✅ **Code is production-ready**
- Enrollment API: Working
- Payment integration: Working
- Email notifications: Working
- Database: Connected
- CORS: Configured for production

❌ **Not yet live** - Configuration pending
- Production environment variables not set
- Frontend domain not configured
- Backend API not deployed
- SSL/HTTPS certificates not installed
