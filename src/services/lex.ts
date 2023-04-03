import {
  DeleteSessionCommand,
  LexRuntimeV2Client,
  RecognizeTextCommand,
} from "@aws-sdk/client-lex-runtime-v2";

const client = new LexRuntimeV2Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
  region: process.env.AWS_REGION,
});

const DeleteSession = async (sessionId: string) => {
  const command = new DeleteSessionCommand({
    botId: process.env.LEX_BOT_ID,
    botAliasId: process.env.LEX_ALIAS_ID,
    localeId: "en_GB",
    sessionId,
  });
  return await client.send(command);
};

const RecognizeText = async (sessionId: string, text: string) => {
  const command = new RecognizeTextCommand({
    botId: process.env.LEX_BOT_ID,
    botAliasId: process.env.LEX_ALIAS_ID,
    localeId: "en_GB",
    sessionId,
    text,
  });
  return await client.send(command);
};

export { DeleteSession, RecognizeText };
