import { ArrowBackIos } from '@mui/icons-material'
import Link from 'next/link'
import React from 'react'

const DetailsNotFound = () => {
    return (
        <div style={{display: 'flex', flex: 1, width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <span style={{}}>Car Not Found !</span>
            <Link href='/' passHref>
                <div style={{display: 'flex', alignItems: 'center', color: 'blue', paddingTop: '10px', cursor: 'pointer'}}>
                    <ArrowBackIos /><a>Go Back</a>
                </div>
            </Link>
        </div>
    )
}

export default DetailsNotFound;
