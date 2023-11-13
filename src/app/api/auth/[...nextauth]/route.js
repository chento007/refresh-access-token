import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'


export const authOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            profile: async (profile) => {
                console.log("profile from route.js: ", profile)
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    hash: profile.at_hash
                };
            },

        }),

    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
        async session({ session, user, token }) {

            return session
        },
        async jwt({ token, account, profile }) {
            console.log("token : ", token)
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