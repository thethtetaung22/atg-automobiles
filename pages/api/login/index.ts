import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const result = await fetch('http://3.1.141.66:8500/users/login', {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(err => {
        console.log(err);
    });
    res.status(201).json(result);
}
export default handler;
