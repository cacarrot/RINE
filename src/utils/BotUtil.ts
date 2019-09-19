import axios from "axios";
import qs from "qs";
import { BotType } from "../types/BotType";

export default class BotUtil {
  static talk = async (query: string, botType?: BotType) => {
    switch (botType) {
      case "a3rt":
        return await BotUtil.talkA3rt(query);
      case "noby":
        return await BotUtil.talkNoby(query);
      default:
        return;
    }
  };
  /**
   * A3RT Talk API
   * https://a3rt.recruit-tech.co.jp/product/talkAPI/
   * curl -X POST https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk -F "apikey=$YOUR_A3RT_API_KEY" -F "query=Hello"
   */
  static talkA3rt = async (query: string) => {
    console.log("A3RT");
    let replyMessage = "";
    const API_URL = "https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk";
    const API_KEY = process.env.REACT_APP_A3RT_TALK_API_KEY;
    await axios({
      method: "post",
      url: API_URL,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        // https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables
        apikey: API_KEY,
        query: query,
      }),
    })
      .then(function(response) {
        const body = response.data;
        if (body.status === 0) {
          body.results.forEach((res: any) => {
            replyMessage = res.reply;
          });
        }
      })
      .catch(function(error) {
        console.error(error);
      });
    if (replyMessage === "") {
      replyMessage = "ごめん、ちょっと何言ってるかわかんない";
    }
    return replyMessage;
  };

  /**
   * Noby API
   * https://webapi.cotogoto.ai/
   * curl "https://app.cotogoto.ai/webapi/noby.json?appkey=$YOUR_NOBY_API_KEY&text=Hello&persona=1"
   */
  static talkNoby = async (query: string) => {
    console.log("Noby");
    const API_URL = "https://app.cotogoto.ai/webapi/noby.json";
    const API_KEY = process.env.REACT_APP_NOBY_API_KEY;
    try {
      const url = `${API_URL}?appkey=${API_KEY}&text=${query}&persona=0`;
      const response = await axios.get(url);
      if (response.status === 200) {
        return response.data.text;
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * A3RT Image Search API
   * https://a3rt.recruit-tech.co.jp/product/imageSearchAPI/
   * curl "https://api.a3rt.recruit-tech.co.jp/image_search/v1/random?apikey=$YOUR_A3RT_IMAGE_SEARCH_API_KEY"
   */
  static searchImage = async () => {
    const API_URL =
      "https://api.a3rt.recruit-tech.co.jp/image_search/v1/random";
    const API_KEY = process.env.REACT_APP_A3RT_IMAGE_SEARCH_API_KEY;
    try {
      const url = `${API_URL}?apikey=${API_KEY}`;
      const response = await axios.get(url);
      if (response.status === 200 && response.data.status === 0) {
        return response.data.result.img[0].url;
      } else {
        throw new Error(response.data.status);
      }
    } catch (error) {
      console.error(error);
    }
  };
}
