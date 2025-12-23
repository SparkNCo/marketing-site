import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware((ctx, next) => {
  const email = ctx.cookies.get("user-email")?.value;

  if (email) {
    ctx.locals.user = { email };
  }

  return next();
});
