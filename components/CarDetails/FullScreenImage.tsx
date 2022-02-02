import React, { useRef, useState } from 'react';
import { 
    ArrowBackIos,
    ArrowForwardIos,
    Close 
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import styles from 'styles/FullScreenImage.module.scss';
import { useGesture } from 'react-use-gesture';
import { animated, to, useSpring } from 'react-spring';

const FullScreenImage = ({ images, toggle, index }: any) => {
    const [previewIndex, setPreviewIndex] = useState(index);
    const crop = useSpring({ x: 0, y: 0, scale: 1, zoom: 0 });
    const imageRef: any = useRef();

    const handleBack = (e: any) => {
        e.preventDefault();
        if (previewIndex > 0) {
            setPreviewIndex(previewIndex - 1);
        }
    }

    const handleNext = (e: any) => {
        e.preventDefault();
        if (previewIndex < images.length - 1) {
            setPreviewIndex(previewIndex + 1);
        }
    }

    const bindGesture = useGesture({
        onDrag: ({ active, offset: [dx, dy] }) => {
            crop.x.set(dx);
            crop.y.set(dy);
            crop.scale.set(active ? 1 : 1.1)
        },
        onPinch: ({ offset: [d, a] }) => {
            crop.zoom.set(d / 200);
        },
    }, {
        eventOptions: { passive: false }
    });

    return <div className={styles.container}>
        <div className={styles.closeButton}>
            <IconButton onClick={toggle}>
                <Close fontSize='large' style={{color: 'white'}}/>
            </IconButton>
        </div>
        <div className={styles.body}>
            <IconButton className={styles.iconBackBtn} onClick={handleBack}>
                <ArrowBackIos fontSize='large' style={{color: 'white'}}/>
            </IconButton>
                
            <animated.div {...bindGesture()} style={{
                y: crop.y,
                x: crop.x,
                scale: to([crop.scale, crop.zoom], (s, z) => s + z),
                transform: 'perspective(600px)'
            }}>
                <img
                    alt='preview'
                    // loading='lazy'
                    src={images[previewIndex]}
                    className={styles.image}
                    style={{
                        pointerEvents: 'none',
                        touchAction: 'none'
                    }}
                />
            </animated.div>
            <IconButton className={styles.iconNextBtn} onClick={handleNext}>
                <ArrowForwardIos fontSize='large' style={{color: 'white'}}/>
            </IconButton>
        </div>
    </div>
}

export default FullScreenImage;
