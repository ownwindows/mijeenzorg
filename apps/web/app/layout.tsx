import '../styles/globals.css'

export default function RootLayout ({children}: { children: React.ReactNode }) {
    return (
        <html lang='nl' data-theme='light'>
        <body>
        {children}
        </body>
        </html>
    )
}