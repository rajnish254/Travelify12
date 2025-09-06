import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "../../api/auth";
import { getTravelByUser } from "../../api/travel";
import Navbar from '../Navbar/Navbar';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EditIcon from "@mui/icons-material/Edit";
import TravelCard from "../Card/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from '@mui/material/IconButton';
import EditProfile from "../EditProfileModel/EditProfile";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user')).user._id;
    const theme = useTheme();
    const params = useParams();
    const [username, setUserName] = useState(params.username);
    const [userData, setUserData] = useState(null);
    const [travelData, setTravelData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        getUserByUsername(username)
            .then((res) => {
                setUserData(res.data);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [])

    useEffect(() => {
        if (userData) {
            getTravelByUser(userData._id)
                .then((res) => {
                    setTravelData(res.data);
                })
                .catch((e) => console.log(e));
        }
    }, [userData])

    return (
        <Box sx={{ display: 'flex' }}>
            <EditProfile id={user} isOpen={isOpen} setIsOpen={setIsOpen} />
            <Navbar data={travelData} setData={setTravelData} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader theme={theme} />
                {userData === null ? (
                    <CircularProgress />
                ) : (
                    <Grid container >
                        <Card sx={{ width: '100%', height: "260px", padding: "40px", display: "flex" }}>
                            <CardMedia
                                component="img"
                                height="150"
                                image={userData.image}
                                alt="Paella dish"
                                sx={{ borderRadius: '100px', width: "150px" }}
                            />
                            <CardContent sx={{ marginLeft: "40px", marginTop: "-10px" }}>
                                <Typography component="div" variant="h5">
                                    {userData.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: "10px" }} >
                                    {userData.bio}
                                </Typography>
                                <div>
                                    <Typography sx={{ display: "inline", marginRight: "20px" }} variant="subtitle1" color="text.secondary" component="div">
                                        <EmailIcon fontSize="small" style={{ marginRight: "2px" }} />
                                        {userData.email}
                                    </Typography>
                                    <Typography sx={{ display: "inline", marginRight: "20px" }} variant="subtitle1" color="text.secondary" component="div">
                                        <LocalPhoneIcon fontSize="small" style={{ marginRight: "2px" }} />
                                        {userData.contact}
                                    </Typography>
                                    <Typography sx={{ display: "inline" }} variant="subtitle1" color="text.secondary" component="div">
                                        {userData.address && <LocationOnIcon fontSize="small" style={{ marginRight: "2px" }} />}
                                        {userData.address}
                                    </Typography>
                                </div>
                                <div style={{ marginTop: "10px" }} >
                                    <Typography sx={{ display: "inline", marginRight: "20px" }} variant="subtitle1" color="text.secondary" component="div">
                                        {userData.insta && <InstagramIcon fontSize="small" style={{ marginRight: "2px" }} />}
                                        {userData.insta}
                                    </Typography>
                                    <Typography sx={{ display: "inline", marginRight: "20px" }} variant="subtitle1" color="text.secondary" component="div">
                                        {userData.facebook && <FacebookIcon fontSize="small" style={{ marginRight: "2px" }} />}
                                        {userData.facebook}
                                    </Typography>
                                    <Typography sx={{ display: "inline" }} variant="subtitle1" color="text.secondary" component="div">
                                        {userData.twitter && <TwitterIcon fontSize="small" style={{ marginRight: "2px" }} />}
                                        {userData.twitter}
                                    </Typography>
                                </div>
                            </CardContent>
                            {user === userData._id && (
                                <div style={{ marginLeft: 'auto', marginTop: '-30px', marginRight: '-26px' }}>
                                    <IconButton onClick={() => setIsOpen(true)} aria-label="settings">
                                        <EditIcon />
                                    </IconButton>
                                </div>
                            )}
                        </Card>
                        <Grid container spacing={2} >
                            {travelData != null && travelData.map((travel) => {
                                return (
                                    <Grid style={{ marginTop: '20px' }} key={travel._id} item md={4} sm={6} xs={12}>
                                        <TravelCard travel={travel} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Box >
    )
}

export default Profile;