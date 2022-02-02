import axios from "axios";
import { host } from "components/common";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { carId } = req.query;
    if (req.method === 'GET') {
        if (carId) {
            try {
                const result = await axios.get(`${host}/car/${carId}`, {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });
                res.status(200).json({
                    status: result.status,
                    data: result.data
                });
            } catch (error) {
                console.log(error);
            }
        }
    } else if (req.method === 'POST') {
        res.status(201).json('success');
    } else if (req.method === 'PUT') {
        const { authorization } = req.headers;
        try {
            if (typeof authorization === 'string') {
                const result = await axios.put(`${host}/car/${carId}`, req.body, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authorization
                    }
                });
                if (result?.status === 200) {
                    res.status(200).send({ success: true });
                } else {
                    res.status(400).send({ success: false });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(400).send({ success: false });
        }
    } else if (req.method === 'DELETE') {
        const { authorization } = req.headers;
        try {
            if (typeof authorization === 'string') {
                const result = await axios.delete(`${host}/car/${carId}`, {
                    headers: {
                        'Authorization': authorization
                    }
                });

                if (result?.status === 200) {
                    res.status(204).json('success');
                } else {
                    res.status(400).send({ success: false });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(400).send({ success: false });
        }
    }
}
export default handler;