# Natours - Complete Node Bootcamp

[Course on Udemy](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/)
<br>
[Main Repository](https://github.com/jonasschmedtmann/complete-node-bootcamp/)

### NOTE
This is a code-along repository of [Jonas Schmedtmann](https://jonas.io/) - Complete Node Bootcamp and I have done certain things my way
I have not written all the features as stated in the 217. Final Considerations but, I am planning to build the frontend 
in React + TailwindCSS. Doing it all in Pug is a waste of time, Pug is not used anymore and it is not the standard for building websites in 2026

Update: I have built a Frontend in React + ShadCN UI and it is in the `frontend/natours_frontend` folder

✅ COMPLETED: 02/05/2026 23:52 IST

### Might implement these features in the future
- Send Email on Password Changed
- Send Email on Password Changed
- Send Email on Details Changed
- Send Email on Account Deactivated
- Verify Sign Up via Email / One Time Password / One Time Cookie
- Implement 2 Factor Authorization

- Other Features from Video 217 Final Considerations

### Security Practices
- Encrypting Passwords with bcrypt 12 rounds
- Hash Password Reset tokens with SHA
- Use bcrypt to make logins slower
- Use Rate-limiting on the entire app or the API
- Count invalid login attempts and put them on a timeout
- Use Helmet Package
- Sanitize every piece of input data
- Limit req.body payloads
- Use Mongoose for SchemaTypes
- Always use HTTPS over HTTP
- Install csurf to prevent CSRF Attacks
- Prevent Parameter pollution
- Prevent Prototype pollution with hasOwnProperty()
