import express from "express";
import YahooFantasy from "yahoo-fantasy";

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

app.get("/auth/yahoo", (req, res) => {
  app.yf.auth(res);
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
