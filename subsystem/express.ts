import express from "express";
import YahooFantasy from "yahoo-fantasy";
import { stringify } from "querystring";

const app = express();

app.tokenCallback = function ({ access_token, refresh_token }) {
  return new Promise((resolve, reject) => {
    // client is redis client
    // client.set("accessToken", access_token, (err, res) => {
    //   // could probably handle this with a multi...
    //   // and you know... handle the errors...
    //   // good thing this is only an example!
    //   client.set("accessToken", access_token, (err, res) => {
    //     return resolve();
    //   })
    // })
    console.log(
      `access_token: ${access_token}; refresh_token: ${refresh_token}`
    );
    return resolve(null);
  });
};

app.get("/", (req, res) => {
  res.json({
    text: "hello from express",
  });
});

app.get("/:name", (req, res) => {
  res.send(`hello from express, ${req.params.name}`);
});

app.yf = new YahooFantasy(
  process.env.YAHOO_CLIENT_ID, // Yahoo! Application Key
  process.env.YAHOO_CLIENT_SECRET, // Yahoo! Application Secret
  app.tokenCallback,
  process.env.YAHOO_CALLBACK_URL
);

app.get("/auth/yahoo", async (req, res) => {
  //app.yf.auth(res);
  const params = {
    client_id: process.env.YAHOO_CLIENT_ID,
    redirect_uri: process.env.YAHOO_CALLBACK_URL,
    response_type: "code",
  };
  try {
    const response = await fetch(
      `https://api.login.yahoo.com/oauth2/request_auth?${stringify(params)}`
    );
    if (200 === response.status) {
      res.send(response.url); // we send the login page to nuxt, we are going to redirect from there
    }
  } catch (e: any) {
    throw new Error(e);
  }
});

app.get("/auth/yahoo/callback", (req, res) => {
  app.yf.authCallback(req, (err) => {
    if (err) {
      return res.redirect("/error");
    }
    return res.redirect("/");
  });
});

app.get("/yahoo/league/standings", (req, res) => {
  app.yf.league
    .standings("nhl.l.17177")
    .then((data) => {
      // do your thing
      res.status(200).send(data);
    })
    .catch((err) => {
      // handle error
      res.status(400).send(err);
    });
});

export default fromNodeMiddleware(app);
