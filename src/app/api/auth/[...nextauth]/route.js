import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth ({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Correo electronico", type: "email", placeholder: "Email" },
                password: { label: "Contraseña", type: "password", placeholder: "*******" }
            },
            async authorize(credentials,req) {
                const users = await fetch('http://localhost:5000/usuarios').then(res => res.json())

                let user;

                users.forEach((item)=> {
                    if(item.email == credentials.email && item.password == credentials.password) {
                        user = item
                    }
                })

                if(!user) throw new Error("Credenciales invalidas")
                
                return user
            }
        })
    ],
    callbacks: {
        jwt({account,token,user,profile,session}) {
            if(user) token.user = user
            return token
        },
        session({session,token}) {
            session.user = token.user
            return session
        }
    }
})

export { handler as GET, handler as POST }