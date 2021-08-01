import Document, {Html, Head, Main, NextSxript, NextScript} from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Lexend:wght@500;600&family=Qahiri&display=swap" rel="stylesheet"></link>
                
                </Head> 
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;