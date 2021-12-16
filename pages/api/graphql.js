import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../typeDefs/index";
import { resolvers } from "../../resolvers/index";
import { connectDB } from "../../config/db";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { getSession } from "next-auth/client";

(async () => {
  await connectDB();
})();

const apolloServer = new ApolloServer({
  context: async ({ req }) => {
    const session = await getSession({ req });
    return { session: session || null };
  },
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  plugins:
  [
          {
            async serverWillStart() {
              return {
                async renderLandingPage() {
                  const html = `
              <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link
      rel="icon"
      href="https://apollo-server-landing-page.cdn.apollographql.com/_latest/assets/favicon.png"
    />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap"
      rel="stylesheet"
    />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Apollo server landing page" />
    <link
      rel="apple-touch-icon"
      href="https://apollo-server-landing-page.cdn.apollographql.com/_latest/assets/favicon.png"
    />
    <link
      rel="manifest"
      href="https://apollo-server-landing-page.cdn.apollographql.com/_latest/manifest.json"
    />
    <title>Graphql Server</title>
  </head>
  <body style="margin: 0; overflow-x: hidden; overflow-y: hidden">
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="react-root">
      <style>
        .fallback {
          opacity: 0;
          animation: fadeIn 1s 1s;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
          padding: 1em;
        }
        @keyframes fadeIn {
          0% {opacity:0;}
          100% {opacity:1; }
        }
      </style>
      <div class="fallback">
        <h1>Welcome to Apollo Server</h1>
        <p>It appears that you might be offline. POST to this endpoint to query your graph:</p>
        <code style="white-space: pre;">
curl --request POST \
  --header 'content-type: application/json' \
  --url '<script>document.write(window.location.href)</script>' \
  --data '{"query":"query { __typename }"}'</code>
      </div>
    </div>
    <script>window.landingPage = "%7B%22isProd%22%3Afalse%2C%22footer%22%3Afalse%7D";</script>
    <script src="https://apollo-server-landing-page.cdn.apollographql.com/_latest/static/js/main.js"></script>
  </body>
</html>`;
                  return { html };
                },
              };
            },
          },
        ]
    // process.env.NODE_ENV !== "production"
    //   ? 
    //   : [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
