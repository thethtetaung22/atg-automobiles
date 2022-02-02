import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import { useRouter } from "next/router";
import styles from 'styles/CarList.module.scss';
import CarCard from "components/CarCard";
import { useState } from "react";
import { animated, config, useChain, useSpring, useSpringRef, useTransition } from "react-spring";
import useSWRInfinite from "swr/infinite";
import useSWR from "swr";


const CarList = ({ token }: any) => {
    const [page, setPage] = useState(0);
    const fetcher = (url: any) => fetch(url).then((res) => res.json());
    const { data , error } = useSWR(
            `/api/cars?take=8&skip=${page * 8}`, 
        fetcher
    );
    const [open, set] = useState(true);
    const springApi = useSpringRef()
    const { size, ...rest } = useSpring({
        ref: springApi,
        config: config.stiff,
        from: { size: '20%', background: 'hotpink' },
        to: {
        size: open ? '100%' : '20%',
        background: open ? 'white' : 'hotpink',
        },
    })

    const transApi = useSpringRef()
    const transition = useTransition(open ? data?.result?.result : [], {
        ref: transApi,
        trail: 400 / data?.result.result?.length,
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 },
    })

    // This will orchestrate the two animations above, comment the last arg and it creates a sequence
    useChain(open ? [springApi, transApi] : [transApi, springApi], [
        0,
        open ? 0.1 : 0.6,
    ]);
    
    const handlePaginator = async (action: string) => {
        if (action === 'next') {
            setPage(page + 1);
        } else {
            setPage(page - 1);
        }
    };

    if (!data) {
        return <>Loading...</>
    }
    return (
        <div className={styles.container}>

            <span className={styles.title}> ATG Automobiles </span>

            <Divider variant='middle' className={styles.divider} />
            <div className={styles.carListContainer}>
                <animated.div
                    style={{ ...rest, width: size, height: size, background: 'transparent' }}
                    className={styles.cardContainer}>
                    {
                        transition((style, item) => (
                            <animated.div
                                className={styles.item}
                                style={{ ...style, background: item.css }}
                            >
                                {
                                    <CarCard car={item.car} token={token} bgTransparent={true}/>
                                }
                            </animated.div>
                        ))
                    }
                </animated.div>
            </div>

            <div className={styles.paginator}>
                <Button variant="contained" className={styles.button} startIcon={<ArrowBackIos />} onClick={() => handlePaginator('previous')} disabled={page === 0} style={{backgroundColor: page === 0 ? 'gray' : ''}}>
                    Previous
                </Button>
                <Button variant="contained" className={styles.button} endIcon={<ArrowForwardIos />} onClick={() => handlePaginator('next')} disabled={!data?.result?.hasMore} style={{backgroundColor: data?.result?.hasMore ? '' : 'gray'}}>
                    Next
                </Button>
            </div>
        </div>
    );
}

export default CarList;
