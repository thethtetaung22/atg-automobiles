import { useRouter } from "next/router";
import Car from "../../components/home/Car";

const CarPage = () => {
    const router = useRouter();
    const carId = router.query.carId;
    return (
        <Car carId={carId} />
    )
}

export default CarPage;
