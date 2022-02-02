import CreateCarComp from 'components/CreateCar';
import { getCarByID } from 'services/data.service';

const EditCar = ({ token, carDetails }: any) => {

    return (
        <CreateCarComp carDetails={carDetails} token={token}/>
    )
}

export default EditCar;

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