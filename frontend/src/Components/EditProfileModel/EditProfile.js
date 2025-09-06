import { Dialog, MenuItem, Grid, DialogTitle, DialogContent, FormControl, InputLabel, Select, DialogActions, Button } from '@mui/material';
import React, { useState } from 'react';
import useStyles from './styles';
import Input from '../Utiles/Input';
import { editProfile } from '../../api/auth';
import ImageUploader from 'react-images-upload';
import axios from 'axios';

const EditProfile = ({ id, isOpen, setIsOpen }) => {

    const classes = useStyles();
    const [data, setData] = useState(null);
    const [file, setFile] = useState(null);

    const handleSubmit = () => {
        setData(data);
        setIsOpen(false);
        if (file !== null) {
            const formdata = new FormData();
            formdata.append("file", file[0])
            formdata.append("upload_preset", "ml_default")
            formdata.append("cloud_name", "prateekvarshney")
            axios.post("https://api.cloudinary.com/v1_1/prateekvarshney/image/upload", formdata)
                .then(res => {
                    data.image = res.data.secure_url
                    editProfile(id, data)
                        .then((response) => {
                            console.log(response);
                            window.location.reload(false);
                        })
                        .catch((e) => console.log(e));
                })
        }
        else {
            editProfile(id, data)
                .then((res) => {
                    console.log(res);
                    window.location.reload(false);
                })
                .catch((e) => console.log(e));
        }
    }

    const onImageChange = (image) => {
        setFile(image)
    }

    return (
        <Dialog open={isOpen} onClose={!isOpen} >
            <DialogTitle className={classes.dialog} >Edit Profile</DialogTitle>
            <DialogContent >
                <Grid container>
                    <Input margin="normal" name="Name" label="Name" handleChange={(e) => setData({ ...data, name: e.target.value })} autoFocus half />
                    <Input margin="normal" name="Contact" label="Contact" handleChange={(e) => setData({ ...data, contact: e.target.value })} autoFocus half />
                    <Input margin="normal" name="Bio" label="Bio" handleChange={(e) => setData({ ...data, bio: e.target.value })} autoFocus half />
                    <Input margin="normal" name="Instagram" label="Instagram" handleChange={(e) => setData({ ...data, insta: e.target.value })} autoFocus half />
                    <Input margin="normal" name="Facebook" label="Facebook" handleChange={(e) => setData({ ...data, facebook: e.target.value })} autoFocus half />
                    <Input margin="normal" name="Twitter" label="Twitter" handleChange={(e) => setData({ ...data, twitter: e.target.value })} autoFocus half />
                    <Input margin="normal" name="Address" label="Address" handleChange={(e) => setData({ ...data, address: e.target.value })} autoFocus />
                    <ImageUploader
                        withIcon={false}
                        buttonText='Choose profile image'
                        onChange={onImageChange}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={1048576}
                        withPreview={true}
                        label='Max file size: 1mb, accepted: jpg|gif|png'
                        singleImage={true}
                    />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={handleSubmit} >Edit</Button>
                <Button variant="outlined" color="secondary" onClick={() => setIsOpen(false)}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditProfile;