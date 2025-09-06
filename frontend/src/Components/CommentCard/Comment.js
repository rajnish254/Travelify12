import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import image1 from '../../images/rightarrow.jpg';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getuser } from '../../api/auth';
import { deletecomment } from '../../api/travel';

const Comment = ({ blogid, comment, setComments }) => {

    const [CreatorData, setCreatorData] = useState(null);
    const user = JSON.parse(localStorage.getItem('user')).user._id;

    useEffect(() => {
        getuser(comment.userid)
            .then((res) => {
                setCreatorData(res.data)
            })
            .catch((e) => console.log(e))
    }, [])

    if (CreatorData === null) {
        return (
            <div>

            </div>
        )
    }

    const handledelete = () => {
        deletecomment(blogid, comment._id)
            .then((res) => {
                setComments(res.data.comments);
            })
            .catch((e) => console.log(e))
    }

    return (
        <Card sx={{ maxWidth: '99%' }} style={{ marginButtom: '20px' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" style={{ cursor: 'pointer' }} onClick={() => window.location.href = `${window.location.origin}/profile/${CreatorData.username}`} >
                        {CreatorData.name[0].toUpperCase()}
                    </Avatar>
                }
                action={
                    comment.userid === user ? (
                        <div>
                            <IconButton onClick={handledelete} >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    ) : (
                        <div></div>
                    )
                }
                title={CreatorData.name}
                subheader={comment.createdAt !== undefined ? comment.createdAt.slice(0, 10) : comment.date.slice(0, 10)}
            />
            <CardContent style={{ paddingTop: '0px' }} >
                <Typography variant="body2" color="text.secondary">
                    {comment.description}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Comment;