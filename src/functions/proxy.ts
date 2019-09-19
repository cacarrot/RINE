import axios from "axios";
import { Handler, APIGatewayProxyEvent } from "aws-lambda";
import pkg from "../../package.json";

export const getProxyUrl = (url: string) => {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:${pkg.config.port.lambda}/.netlify/functions/proxy?url=${url}`;
  }
  return `/.netlify/functions/proxy?url=${url}`;
};

/**
 * https://github.com/netlify/netlify-lambda
 * http://localhost:9000/.netlify/functions/proxy?url=https://developers-jp.googleblog.com/atom.xml
 */
export const handler: Handler<APIGatewayProxyEvent> = async event => {
  const method = event.httpMethod;
  const query = event.queryStringParameters;

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": 'application/xml; charset="UTF-8"',
  };

  if (method !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  if (query === null || query["url"] === undefined) {
    return { statusCode: 400, body: "Bad Request" };
  }

  try {
    const response = await axios.get(query["url"]);
    const { status, data } = response;
    if (status !== 200) {
      throw new Error("status:" + status);
    }
    return { statusCode: 200, body: data, headers };
  } catch (error) {
    console.error(error);
    return { statusCode: 502, body: "Bad Gateway" };
  }
};
