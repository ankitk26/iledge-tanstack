import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { auth } from "~/lib/auth";

export const loadExpenses = createServerFn({ method: "POST" }).handler(
  async () => {
    const request = getWebRequest();
    if (!request) {
      throw Error("Invalid request");
    }

    try {
      const session = await auth.api.getSession({ headers: request.headers });

      if (!session) {
        throw redirect({ to: "/login" });
      }

      const response = await fetch("http://localhost:8000/expenses/new", {
        method: "POST",
        headers: {
          Cookie: `session_token=${session.session.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Load unsuccessful");
      }

      const responseMessage = await response.json();

      if (responseMessage.status !== "success") {
        throw new Error("Load unsuccessful");
      }

      return responseMessage;
    } catch (e) {
      console.log(e);
    }
  }
);
