import { Express, NextFunction, Request, Response } from "express";
import * as ExpressSession from "express-session";
import { AUTH_REDIRECT, BASE_URL, CLIENT_ID, ISSUER_BASE_URL, CLIENT_SECRET, DB_CONFIG, FRONTEND_URL } from "../config";

import { auth } from "express-openid-connect";
import { AuthUser } from "../models";
import { UserService } from "../services";

import axios, { AxiosRequestConfig } from "axios";
import jwt from "express-jwt";
import { expressJwtSecret } from "jwks-rsa";

const db = new UserService(DB_CONFIG);

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: BASE_URL,
  clientID: CLIENT_ID,
  issuerBaseURL: ISSUER_BASE_URL,
  secret: CLIENT_SECRET,
  session: { cookie: { secure: false } },
  routes: {
    login: "/auth/login",
    logout: "/auth/logout",
    postLogoutRedirect: FRONTEND_URL,
  },
  authorizationParams: {
    response_type: "code",
    audience: "",
    scope: "openid profile email",
  },
};

export function configureAuthentication(app: Express) {
  app.use(
    ExpressSession.default({
      secret: "supersecret",
      resave: true,
      saveUninitialized: true,
    })
  );

  const checkJwt = jwt({
    // Dynamically provide a signing key based on the [Key ID](https://tools.ietf.org/html/rfc7515#section-4.1.4) header parameter ("kid") and the signing keys provided by the JWKS endpoint.
    secret: expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),

    // Validate the audience and the issuer.
    audience: process.env.AUTH0_AUDIENCE,
    issuer: [`https://${process.env.AUTH0_DOMAIN}/`],
    algorithms: ["RS256"],
    credentialsRequired: false,
  });

  // JWT middleware
  app.use("/api/v1", checkJwt);

  // Session auth middleware
  app.use(auth(config));

  app.use("/", async (req, res, next) => {
    if (req.oidc && req.oidc.isAuthenticated()) {
      let user = AuthUser.fromOpenId(req.oidc.user);
      let dbUser = await db.getBySub(user.sub);
      if (dbUser) {
        req.user = { ...dbUser, ...user };
        return next();
      }

      let emailUser = await db.getByEmail(user.email);

      if (emailUser) {
        await db.update(emailUser.id, { sub: user.sub });

        req.user = { ...emailUser, ...user };
        return next();
      }
    } else if (req.headers.authorization) {
      try {
        const user = await getAuth0User(req.headers.authorization);        
        req.user = user.data;
        const dbUser = await db.getBySub(req.user.sub);
        if (dbUser) {
          req.user = { ...dbUser, ...user };
          return next();
        }
      } catch (e) {
        console.log("ERROR", e);
      }
    }

    next();
  });

  app.get("/", async (req, res) => {
    if (req.oidc.isAuthenticated()) {
      res.redirect(AUTH_REDIRECT);
    } else {
      // this is hard-coded to accomodate strage behaving in sendFile not allowing `../` in the path.
      // this won't hit in development because web access is served by the Vue CLI - only an issue in Docker
      res.sendFile("/home/node/app/dist/web/index.html");
    }
  });

  app.get("/api/auth/isAuthenticated", (req, res, next) => {
    if (req.user) {
      return res.send({ data: req.user });
    }

    res.status(401).send("Not Authenticated");
  });

  app.get("/api/auth/logout", async (req, res) => {
    req.session.destroy(() => {});
    res.status(401);
    await res.oidc.logout();
  });
}

async function getAuth0User(token: string) {
  let options: AxiosRequestConfig = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
    url: `${ISSUER_BASE_URL}/userinfo`,
  };

  return await axios(options);
}

export function RequireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.email) return next();

  res.status(401).send();
}

export function RequireJWTAuth(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.email && req.headers.authorization) return next();

  res.status(401).send();
}

export function RequireServerAuth(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.email && req.oidc.isAuthenticated()) return next();

  res.status(401).send();
}

export function RequireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.roles && req.user.roles.indexOf("Admin") >= 0) return next();

  res.status(401).send("You are not an administrator");
}

export function RequireActive(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.is_active) return next();

  res.status(401).send("Your account is not active");
}
