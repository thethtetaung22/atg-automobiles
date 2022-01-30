import React from 'react'; 
import { CarDetails , DetailsNotFound } from "../../components/CarDetails";
import useWindowSize from '../../hooks/useWindowSize';
import { getCarByID } from "../../services/data.service";

const CarPage = ({ carDetails }: any) => {
    
    return (
        <div style={{overflow: 'auto'}}>
            {carDetails ? <CarDetails carDetails={carDetails} /> : <DetailsNotFound />}
        </div>
    );
}

export default CarPage;

export const getServerSideProps = async (ctx: any) => {
    const { params } = ctx
    let carDetails: any = null;
    if (params.carId) {
        const result: any = await getCarByID(params.carId);
        if (result?.status === 200 && result?.data) {
            carDetails = result?.data
        }
    }
    return {
        props: {
            carDetails: carDetails || null
        }
    }
}
