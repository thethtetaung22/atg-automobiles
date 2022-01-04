import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
      CredentialsProvider({
        name: 'Login',
        credentials: {
          email: { label: "Email", type: 'email', placeholder: "jsmith@gmail.com" },
          password: {  label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const res = await fetch('http://localhost:8500/users/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "app lication/json" }
          })
          const user = await res.json();
          console.log('UserRes:', user);
          // If no error and we have user data, return it
          if (res.ok && user) {
            return user;
          }
          // Return null if user data could not be retrieved
          return null;
        }
      })
    ]
  })