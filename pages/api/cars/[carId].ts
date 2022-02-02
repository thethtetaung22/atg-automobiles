import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.headers);
    if (req.method === 'GET') {
        const { carId } = req.query;
        console.log(req.query);
        let result: any;
        // if (carId) {
        //     // res.status()
        // } else if (){
        //     try {
        //         const result = await axios.get(`${host}/car${query ? `?${query}` : ''}`, {
        //           headers: {
        //             'Content-Type': 'application/json'
        //           }
        //         });
        //         return {
        //           status: result.status,
        //           data: result.data
        //         };
        //       } catch (error) {
        //         console.log(error);
        //         return error;
        //       }
        // }
        res.status(200).json('success');
    } else if (req.method === 'POST') {
        res.status(201).json('success');
    } else if (req.method === 'PUT') {
        res.status(201).json('success');
    } else if (req.method === 'DELETE') {
        res.status(204).json('success');
    }
}
export default handler;