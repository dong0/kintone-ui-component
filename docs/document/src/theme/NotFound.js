import React from 'react';
import Translate from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function NotFound() {
  return (
    <BrowserOnly>
      {() => {
        const pathUrl = window.location.pathname;
        const domain = window.location.protocol + "//" + window.location.host;
        if (pathUrl.indexOf('/en/') > -1) {
          window.location.href = domain + pathUrl.replace("/en/", "/");
          return;
        }
        if (pathUrl.indexOf('/docs/ja/') > -1) {
          window.location.href = domain + pathUrl.replace("/docs/ja/", "/ja/docs/");
          return;
        }
        return <NotFoundPage />;
      }}
    </BrowserOnly>
  );
}

const NotFoundPage = () => {
  return (
    <Layout>
      <main className="container margin-vert--xl">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h1 className="hero__title">
              <Translate
                id="theme.NotFound.title"
                description="The title of the 404 page">
                Page Not Found
              </Translate>
            </h1>
            <p>
              <Translate
                id="theme.NotFound.p1"
                description="The first paragraph of the 404 page">
                We could not find what you were looking for.
              </Translate>
            </p>
            <p>
              <Translate
                id="theme.NotFound.p2"
                description="The 2nd paragraph of the 404 page">
                Please contact the owner of the site that linked you to the
                original URL and let them know their link is broken.
              </Translate>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
