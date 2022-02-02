import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { animated, config, Spring, useTransition } from 'react-spring';
import styles from 'styles/Banner.module.scss';

const Banner = () => {
    const ref = useRef<ReturnType<typeof setTimeout>[]>([])
    const [items, set] = useState<string[]>([])
    const transitions = useTransition(items, {
        from: {
          opacity: 0,
          height: 0,
          innerHeight: 0,
          transform: 'perspective(600px) rotateX(0deg)',
          color: '#FF6565',
        },
        enter: [
          { opacity: 1, height: 80, innerHeight: 80 },
          { transform: 'perspective(600px) rotateX(180deg)', color: '#E5FF65' },
          { transform: 'perspective(600px) rotateX(0deg)' },
        ],
        leave: [{ color: '#FFB265' }, { innerHeight: 0 }, { opacity: 0, height: 0 }],
        update: { color: 'white' },
    });

    const reset = useCallback(() => {
        ref.current.forEach(clearTimeout)
        ref.current = []
        set([])
        ref.current.push(setTimeout(() => set(['စိတ်ချ ယုံကြည် ATG']), 2000))
        ref.current.push(setTimeout(() => set(['စိတ်ချ ယုံကြည် ATG']), 5000))
        ref.current.push(setTimeout(() => set(['စိတ်ချ ယုံကြည် ATG']), 8000))
      }, [])
    
    useEffect(() => {
        reset()
        return () => ref.current.forEach(clearTimeout)
    }, [])
    
    return <div className={styles.container}>
            <div className={styles.leftContainer}>
                {
                    transitions(({ innerHeight, ...rest }, item) => (
                        <animated.div className={styles.text} style={rest} onClick={reset}>
                            <animated.div style={{ overflow: 'hidden', height: innerHeight }}>{item}</animated.div>
                        </animated.div>
                    ))
                }
                {/* <span className={styles.text}>{''}</span> */}
                {/* <Spring
                    loop
                    from={{ opacity: 0, color: 'red' }}
                    to={[
                        { opacity: 1, color: '#ffaaee' },
                        { opacity: 0, color: 'rgb(14,26,19)' },
                    ]}>
                    {style => (
                        <animated.div className={styles.subtext} style={style}>Most reliable car sales and services center.</animated.div>
                    )}
                </Spring> */}
                <span className={styles.subtext}>Most reliable car sales and services center.</span>
            </div>
            <div className={styles.rightContainer}>
                <div className={styles.imageContainer}>
                    <Image
                        src={'/car-red.png'}
                        layout='responsive'
                        width={700}
                        height={400}
                        priority
                        alt='car-red'/>
                </div>
            </div>
    </div>;
}

export default Banner;
