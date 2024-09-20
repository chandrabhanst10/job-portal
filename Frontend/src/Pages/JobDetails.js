import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Box, Button, Chip, Typography } from '@mui/material'
import axiosInstance from '../Utils/AxiosConfig.js'
import { toast } from 'react-toastify'
import LoadingComponent from '../Components/LoadingComponent.js'

const JobDetails = () => {
    const params = useParams()
    const [jobDetails, setJobDetails] = useState()
    const [loading, setLoading] = useState(false)
    const GetJobDetails = (id) => {
        setLoading(true);
        axiosInstance.get(`api/jobs/job-details/${id}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            if (response.data.success) {
                setLoading(false);
                toast.success(response.data.message)
                setJobDetails(response.data.job);
            } else {
                toast.warning(response.data.message)
            }
        }).catch((error) => {
            setLoading(false);
            console.error("Error:", error.response || error.message);
        });
    }
    useEffect(() => {
        GetJobDetails(params.id)
    },[params.id])
    
    return (
        <JobDetailsContainer>
            <LoadingComponent loading={loading} />
            <Box>

                <Typography className='jobTitle' variant='h4'>{jobDetails?.title} - <Chip size='medium' label={jobDetails?.jobType} /></Typography>
                <Box className="jobDetalsBox">
                    <Typography variant='subtitle1' className='label'>Company Name : </Typography>
                    <Typography variant='subtitle1' className='jobValue'>{jobDetails?.companyName}</Typography>
                </Box>
                <Box className="jobDetalsBox">
                    <Typography variant='subtitle1' className='label'>Location : </Typography>
                    <Typography variant='subtitle1' className='jobValue'>{jobDetails?.location}</Typography>
                </Box>
                <Box className="jobDetalsBox">
                    <Typography variant='subtitle1' className='label'>Salary : </Typography>
                    <Typography variant='subtitle1' className='jobValue'>{jobDetails?.salary}</Typography>
                </Box>
                <Typography variant='h5' className='labelHead'>introduction</Typography>
                <Typography variant='subtitle2' color='gray' className='jobDetailText'>{jobDetails?.introduction}</Typography>
                <Typography variant='h5' className='labelHead'>Responsibilities </Typography>
                <Typography className='responsibiliteis' color='gray'>{jobDetails?.responsibilities}</Typography>
            </Box>
            <Box className="buttonContainer">
                <Button variant='outlined' fullWidth>Save Job</Button>
                <Button variant='contained' fullWidth>Apply</Button>
            </Box>

        </JobDetailsContainer>
    )
}

export default JobDetails

const JobDetailsContainer = styled(Box)({
    "& .jobTitle": {
        color: "gray"
    },
    "& .label": {
        color: "#a4a0a0"
    },
    "& .labelHead": {
        color: "#797575"
    },
    "& .jobDetalsBox": {
        display: "flex",
        gap: "10px"
    },
    "& .buttonContainer": {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        gap: "10%",
        marginTop: "50px"
    }
})