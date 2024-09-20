import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import JobCardImg from "../Assets/jobCardImg.jpg"
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
const JobCard = ({ jobId, title, jobType, location, companyName, showJob }) => {
    return (
        <JobCardContainer>
            <Card>
                <Box className={"cardImgContainer"}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={JobCardImg}
                    />
                    <Box className='saveIconContainer'>
                        <IconButton>
                            <BookmarkBorderOutlinedIcon className='saveIcon'/>
                        </IconButton>
                    </Box>
                </Box>
                <CardContent>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                    <Typography variant="body2">
                        {companyName}
                    </Typography>
                    <Typography variant="subtitle2">
                        {location}
                    </Typography>
                    <Typography variant="subtitle2">
                        {jobType}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant='outlined' size="small" onClick={() => showJob(jobId)}>Show</Button>
                </CardActions>
            </Card>
        </JobCardContainer>
    )
}

export default JobCard
const JobCardContainer = styled(Box)({
    "& .cardImgContainer": {
        position: "relative",
    },
    "& .saveIconContainer": {
        position: "absolute",
        right: "8px",
        top: "8px"
    },
    "& .saveIcon": {
        color:"#fff"
    }
})