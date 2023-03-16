import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </body>
    </Html>
  )
}
