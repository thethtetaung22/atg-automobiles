import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.body);
    const result = await fetch('http://3.1.141.66:8500/users/login', {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then(data => {
        console.log(data);
        return data;
    })
    .catch(err => {
        console.log(err);
    });
    console.log(result);
    res.status(201).json(result);
}
export default handler;