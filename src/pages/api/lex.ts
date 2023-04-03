// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { DeleteSession, RecognizeText } from "@/services/lex";
import { RecognizeTextCommandOutput } from "@aws-sdk/client-lex-runtime-v2";

export default async function asynchandler(
  req: NextApiRequest,
  res: NextApiResponse<RecognizeTextCommandOutput>
) {
  const { session, text } = req.query;
  if (session) {
    if (text) {
      res
        .status(200)
        .json(
          await RecognizeText(
            Array.isArray(session) ? session[0] : session,
            Array.isArray(text) ? text[0] : text
          )
        );
    } else {
      res
        .status(200)
        .json(
          await DeleteSession(Array.isArray(session) ? session[0] : session)
        );
    }
  } else {
    res.status(422);
  }
}
