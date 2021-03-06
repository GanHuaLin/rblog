import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'

class BlogApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render () {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>rbackrock`s blog</title>
          <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no" />
        </Head>
        <Component {...pageProps} />

        <style jsx global>{`
          /**
           * Eric Meyer's Reset CSS v2.0 (http://meyerweb.com/eric/tools/css/reset/)
           * http://cssreset.com
          */
          html, body, div, span, applet, object, iframe,
          h1, h2, h3, h4, h5, h6, p, blockquote, pre,
          a, abbr, acronym, address, big, cite, code,
          del, dfn, em, img, ins, kbd, q, s, samp,
          small, strike, strong, sub, sup, tt, var,
          b, u, i, center,
          dl, dt, dd, ol, ul, li,
          fieldset, form, label, legend,
          table, caption, tbody, tfoot, thead, tr, th, td,
          article, aside, canvas, details, embed,
          figure, figcaption, footer, header,
          menu, nav, output, ruby, section, summary,
          time, mark, audio, video, input {
             margin: 0;
             padding: 0;
             border: 0;
             font-size: 100%;
             font-weight: normal;
             vertical-align: baseline;
          }

          /* HTML5 display-role reset for older browsers */
          article, aside, details, figcaption, figure,
          footer, header, menu, nav, section {
             display: block;
          }

          body {
             line-height: 1;
          }

          blockquote, q {
             quotes: none;
          }

          blockquote:before, blockquote:after,
          q:before, q:after {
             content: none;
          }

          table {
             border-collapse: collapse;
             border-spacing: 0;
          }

          /* custom */
          a {
             color: #7e8c8d;
             text-decoration: none;
             -webkit-backface-visibility: hidden;
          }

          li {
             list-style: none;
          }

          ::-webkit-scrollbar {
             width: 5px;
             height: 5px;
          }

          ::-webkit-scrollbar-track-piece {
             background-color: rgba(0, 0, 0, 0.2);
             -webkit-border-radius: 6px;
          }

          ::-webkit-scrollbar-thumb:vertical {
             height: 5px;
             background-color: rgba(125, 125, 125, 0.7);
             -webkit-border-radius: 6px;
          }

          ::-webkit-scrollbar-thumb:horizontal {
             width: 5px;
             background-color: rgba(125, 125, 125, 0.7);
             -webkit-border-radius: 6px;
          }

          html, body {
             width: 100%;
          }

          body {
             -webkit-text-size-adjust: none;
             -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          }

          /** --- **/
          body, html {
            color: rgb(102, 102, 102);
            font-family: Helvetica,"Microsoft Yahei",ST-Heiti,"Apple Color Emoji";
            font-size: 5vw;
          }

          a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
          }

          body {
            line-height: 1;
            background: #F0DAB3 url(/static/img/note_bg.jpg);
            background-repeat: repeat;
            color: #645647;
            font-size: 3.6vw;
            font-weight: 400;
            letter-spacing: 0.1vw;
          }

          ul, ol {
            list-style-type: none;
          }
        `}</style>
      </Container>
    )
  }
}

export default BlogApp;
