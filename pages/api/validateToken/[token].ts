
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = req.query;
    const result = await fetch('http://3.1.141.66:8500/users/validate-token', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json())
    .then(data => {
      // console.log('data:', data);
      return data;
    })
    .catch(err => {
      console.log(err);
    });
    res.status(200).json(result);
}
export default handler;