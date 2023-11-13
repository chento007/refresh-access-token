import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'


export const authOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            profile: async (profile) => {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                };
            },

        }),

    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            console.log("redirect", url, baseUrl)
            return "http://localhost:3000/"
        },
        async session({ session, user, token }) {
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token
        }

        // ...add other callbacks here
    },




    pages: {
        signIn: '/signin'
    },
    session: {
        strategy: 'jwt',
    }


}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }