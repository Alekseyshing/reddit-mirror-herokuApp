import express from 'express';
import ReactDOM from 'react-dom/server';
import { indexTemplate } from "./indexTemplate";
import { App } from '../App';
import axios from 'axios';
import compression from 'compression';
import helmet from 'helmet';

const PORT = process.env.PORT || 3000;

const IS_DEV = process.env.NODE_ENV !== 'production';

const app = express();

if (!IS_DEV) {
  app.use(compression());
  app.use(helmet({
    contentSecurityPolicy: false,
  }));
}

app.use('/static', express.static('./dist/client'));

app.get('/auth', (req, res) => {
  try {
    const url = 'https://www.reddit.com/api/v1/access_token';

    axios.post(
      url,
      `grant_type=authorization_code&code=${req.query.code}&redirect_uri=${process?.env?.REDIRECT_URI}`,
      {
        auth: { username: process?.env?.CLIENT_ID, password: process?.env?.CLIENT_PASSWORD },
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      },

    )
      .then(({ data }) => {
        res.send(
          indexTemplate(ReactDOM.renderToString(App()), data['access_token'])
        );
      })
      .catch(console.log)
  } catch (error) {
    console.error(error)
  }
})

app.get('*', (req, res) => {
  res.send(
    indexTemplate(ReactDOM.renderToString(App())),
  );
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})
