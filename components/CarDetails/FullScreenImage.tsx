import React, { useRef, useState } from 'react';
import { 
    ArrowBackIos,
    ArrowForwardIos,
    Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Image from 'next/image';
import styles from '../../styles/FullScreenImage.module.scss';
import { shimmer, toBase64 } from '../common';
import { useDrag, useGesture } from 'react-use-gesture';
import { animated, useSpring } from 'react-spring';

const FullScreenImage = ({ images, toggle, index }: any) => {
    const [previewIndex, setPreviewIndex] = useState(index);
    const crop = useSpring({ x: 0, y: 0, scale: 1 });
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
        console.log(previewIndex)
    }

    const bindGesture = useGesture({
        onDrag: ({ offset: [dx, dy] }) => {
            crop.x.set(dx);
            crop.y.set(dy);
        },
        onPinch: ({ offset: [d] }) => {
            crop.scale.set(d / 200);
        },
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
                scale: crop.scale
            }}>
                <img
                    alt='preview'
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
