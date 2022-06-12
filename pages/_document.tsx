import Document, { Html, Main, Head, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="true"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;900&display=swap"
                        rel="stylesheet"
                    />
                    <link rel="dns-prefetch" href="//res.cloudinary.com" />
                </Head>
                <body>
                    <Main />
                    <div id="destination"></div>

                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
