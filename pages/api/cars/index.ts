import axios from "axios";
import { host } from "components/common";
import { colorsData } from "data/constants";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    let query = '';
    const { take, skip } = req.query;
    if (req.method === 'GET') {
        if (take !== undefined && skip !== undefined) {
            query = `take=${take}&skip=${skip}`
        }
        const { data } = await axios.get(`${host}/car${query ? `?${query}` : ''}`);
        let hasMore = false;
        if (Number(skip) === 0) {
            hasMore = Number(data.count) < Number(data.total);
        } else {
            hasMore = Number(data.total) > (Number(data.count) + Number(skip));
        }
        const cars = data.result?.map((car: any, i: number) => {
            return {
                ...colorsData[i],
                car
            }
        });
        res.status(200).json({
            success: true, 
            result: {
                cars,
                hasMore
            }
        });
    } else if (req.method === 'POST') {
        const { authorization } = req.headers;
        try {
            if (typeof authorization === 'string') {
                const result = await axios.post(`${host}/car`, req.body, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authorization
                    }
                });
                if (result?.status === 201) {
                    res.status(201).send({ success: true });
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