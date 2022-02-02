import { useState } from 'react';
import styles from 'styles/SearchArea.module.scss';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useRouter } from 'next/router';


const SearchArea = ({ dropDownData }: any) => {
    const router = useRouter();
    const [brand, setBrand] = useState<string>();
    const [color, setColor] = useState<string>();
    const [type, setType] = useState<string>();
    const [model, setModel] = useState<string>();

    const handleOnClick = async () => {
        const arr = [];
        if (brand) {
            arr.push(`brand=${brand}`);
        }

        if (color) {
            arr.push(`color=${color}`);
        }

        if (type) {
            arr.push(`type=${type}`)
        }

        if (model) {
            arr.push(`model=${model}`);
        }

        if (arr.length > 0) {
            router.push(`/search?${arr.join('&')}`)
        } else {
            alert('Please select at least one option!');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.body}>
            <div className={styles.bodyBg}></div>
                {/* <span className={styles.title}> Search Here</span> */}
                <div className={styles.inputArea}>
                    <div className={styles.inputContainer}>
                        <div className={styles.input}>
                            <FormControl fullWidth variant='standard' >
                                <InputLabel htmlFor="type-brand-label">Brand</InputLabel>
                                <Select
                                    id='type-brand-label'
                                    label="Brand"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}>
                                    {
                                        dropDownData?.carBrands?.length === 0 ? 
                                            <MenuItem value={'no-data'} disabled>No Data</MenuItem> :
                                            dropDownData?.carBrands?.map((type: string, i: number) => {
                                                return <MenuItem value={type} key={i}>{type}</MenuItem>
                                            })
                                    }
                                </Select>
                            </FormControl>
                        </div>

                        <div className={styles.input}>
                            <FormControl fullWidth variant='standard'>
                                <InputLabel id="type-color-label">Color</InputLabel>
                                <Select
                                    labelId='type-color-label'
                                    label="Color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}>
                                    {
                                        dropDownData?.carColors?.length === 0 ? 
                                            <MenuItem value={'no-data'} disabled>No Data</MenuItem> :
                                            dropDownData?.carColors?.map((type: string, i: number) => {
                                                return <MenuItem value={type} key={i}>{type}</MenuItem>
                                            })
                                    }
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    
                    <div className={styles.inputContainer}>
                        <div className={styles.input}>
                            <FormControl fullWidth variant='standard'>
                                <InputLabel id="type-label">Type</InputLabel>
                                <Select
                                    labelId='type-label'
                                    label="Type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}>
                                    {
                                        dropDownData?.carTypes?.length === 0 ? 
                                            <MenuItem value={'no-data'} disabled>No Data</MenuItem> :
                                            dropDownData?.carTypes?.map((type: string, i: number) => {
                                                return <MenuItem value={type} key={i}>{type}</MenuItem>
                                            })
                                    }
                                </Select>
                            </FormControl>
                        </div>

                        <div className={styles.input}>
                            <FormControl fullWidth variant='standard'>
                                <InputLabel id="model-label">Model</InputLabel>
                                <Select
                                    labelId='model-label'
                                    value={model}
                                    label='Model'
                                    onChange={(e) => setModel(e.target.value)}>
                                    {
                                        dropDownData?.carModels?.length === 0 ? 
                                            <MenuItem value={'no-data'} disabled>No Data</MenuItem> :
                                            dropDownData?.carModels?.map((type: string, i: number) => {
                                                return <MenuItem value={type} key={i}>{type}</MenuItem>
                                            })
                                    }
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <Button variant='contained' className={styles.searchButton} onClick={handleOnClick}>Search</Button>
            </div>
            
        </div>
    )
}

export default SearchArea;
