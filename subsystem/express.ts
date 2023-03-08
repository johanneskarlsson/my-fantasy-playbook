import express from "express";
import YahooFantasy from "yahoo-fantasy";
import { stringify } from "querystring";

const app = express();

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
  null,
  process.env.YAHOO_CALLBACK_URL
);

app.get("/auth/yahoo", async (req, res) => {
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

app.get("/auth/yahoo/callback", async (req, res) => {
  const tokenData = {
    client_id: process.env.YAHOO_CLIENT_ID,
    client_secret: process.env.YAHOO_CLIENT_SECRET,
    redirect_uri: process.env.YAHOO_CALLBACK_URL,
    code: req.query.code,
    grant_type: "authorization_code",
  };

  try {
    const response = await fetch(
      `https://api.login.yahoo.com/oauth2/get_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.YAHOO_CLIENT_ID}:${process.env.YAHOO_CLIENT_SECRET}`
          ).toString("base64")}`,
        },
        body: stringify(tokenData),
      }
    );

    if (200 === response.status) {
      const { access_token, refresh_token, expires_in, token_type } =
        await response.json();
      app.yf.setUserToken(access_token);
      res.json({ access_token, refresh_token, expires_in, token_type }); // we send the access/refresh tokens to nuxt
    }
  } catch (e: any) {
    throw new Error(e);
  }
});

app.get("/auth/yahoo/refresh_token", async (req, res) => {
  const refreshData = stringify({
    grant_type: "refresh_token",
    redirect_uri: process.env.YAHOO_CALLBACK_URL,
    refresh_token: req.headers.authorization, // we get the refresh token from nuxt localstorage that we pass on the header
  });

  try {
    const response = await fetch(
      `https://api.login.yahoo.com/oauth2/get_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.YAHOO_CLIENT_ID}:${process.env.YAHOO_CLIENT_SECRET}`
          ).toString("base64")}`,
        },
        body: refreshData,
      }
    );

    if (200 === response.status) {
      const { access_token, refresh_token, expires_in, token_type } =
        await response.json();
      app.yf.setUserToken(access_token);
      res.json({ access_token, refresh_token, expires_in, token_type }); // we send the access/refresh tokens to nuxt
    }
  } catch (e: any) {
    throw new Error(e);
  }
});

// ------ GAMES ------- //
let leagues = [];

app.get("/yahoo/user/leagues", (req, res) => {
  app.yf.user
    .game_leagues("nhl")
    .then((data) => {
      // do your thing
      leagues = data.games[0].leagues.map((league) => league["league_key"]);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      // handle error
      res.status(400).send(err);
    });
});

// ------ LEAGUES ------ //
app.get("/yahoo/league/meta", (req, res) => {
  const league_key = req.headers.league_key;
  app.yf.league
    .meta(league_key)
    .then((data) => {
      // do your thing
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      // handle error
      res.status(400).send(err);
    });
});
app.get("/yahoo/league/standings", (req, res) => {
  const league_key = req.headers.league_key;
  app.yf.league
    .standings(league_key)
    .then((data) => {
      // do your thing
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      // handle error
      res.status(400).send(err);
    });
});

app.get("/yahoo/league/settings", (req, res) => {
  const league_key = req.headers.league_key;
  app.yf.league
    .settings(league_key)
    .then((data) => {
      // do your thing
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      // handle error
      res.status(400).send(err);
    });
});

app.get("/yahoo/leagues", (req, res) => {
  app.yf.leagues
    .fetch(leagues, ["standings"])
    .then((data) => {
      // do your thing
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      // handle error
      res.status(400).send(err);
    });
});

// ------ TEAMS ------ //

app.get("/yahoo/team/meta", (req, res) => {
  const team_key = req.headers.team_key;
  app.yf.team
    .meta(team_key)
    .then((data) => {
      // do your thing
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      // handle error
      res.status(400).send(err);
    });
});

app.get("/yahoo/team/roster", (req, res) => {
  const team_key = req.headers.team_key;
  app.yf.team
    .roster(team_key)
    .then((data) => {
      // do your thing
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      // handle error
      res.status(400).send(err);
    });
});

// ------ PLAYERS ------ //

app.get("/yahoo/players/leagues", (req, res) => {
  app.yf.players
    .leagues(leagues, { sort: "AR" }, ["stats", "ownership"])
    .then((data) => {
      // do your thing
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      // handle error
      res.status(400).send(err);
    });
});

export default fromNodeMiddleware(app);
