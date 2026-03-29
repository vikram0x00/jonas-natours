# Natours

### To Do
- **Send Email on Password Changed (Forgot)**
- **Send Email on Password Changed (Update)**
- **Send Email on Details Changed**
- **Send Email on Account Deactivated**
- **Verify Sign Up via Email / One Time Password / One Time Cookie**
- **Implement 2 Factor Authorization**

### Security Practices
- **Encrypting Passwords with bcrypt 12 rounds**
- **Hash Password Reset tokens with SHA**
- **Use bcrypt to make logins slow**
- **Use Rate-limiting on the entire app or the API**
- **Count invalid login attempts and put them on a timeout**
- **Use Helmet Package**
- **Sanitize every piece of input data**
- **Limit req.body payloads**
- **Use Mongoose for SchemaTypes**
- **Always use HTTPS over HTTP**
- **Install csurf to prevent CSRF Attacks**
- **Prevent Parameter pollution**
- **Prevent Prototype pollution with hasOwnProperty()**