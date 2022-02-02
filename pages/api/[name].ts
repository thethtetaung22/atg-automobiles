import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { host } from "components/common";

const getPresignedURL = async (token: string, query: any) => {
    try {
      const result = await axios.get(`${host}/cdn/get-presigned-url?name=${query.name}&mimeType=${query.mimeType}`, {
        headers: {
          'Authorization' : `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return {
        status: result.status,
        result: result.data
      };
    } catch (error) {
      console.log(error);
    }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name } = req.query;

    if (name === 'getPresignedURL') {
        const result = await getPresignedURL(req.body.token, { ...req.body });
        if (result?.status === 200 && result.result?.signedRequest) {
            res.status(200).json({ presignedUrl: result.result?.signedRequest, url: result.result?.url });
        } else {
            res.status(400);
        }
    }
}
export default handler;