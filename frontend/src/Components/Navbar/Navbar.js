import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import image from '../../images/post-icon.jpg'
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper'
import Card from '../Card/Card';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddTravelModel from '../AddTravelModel/AddTravelModel';
import FilterTravelModel from '../FilterTravelModel/FilterTravelModel';
import { useNavigate, Link } from 'react-router-dom';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';

const drawerWidth = 260;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer({ data, setData }) {
    const username = JSON.parse(localStorage.getItem('user')).user.username;
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openaddtravel, setaddtravel] = React.useState(false);
    const [OpenFilterTravel, setFilterTravel] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    //console.log(openaddtravel)
    const handleaddtravel = () => {
        console.log(openaddtravel)
        setaddtravel(true);
    }

    const handlefiltertravel = () => {
        setFilterTravel(true);
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handlelogout = () => {
        setAnchorEl(null)
        localStorage.removeItem('user')
        navigate('/')
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AddTravelModel isOpen={openaddtravel} setIsOpen={setaddtravel} />
            <FilterTravelModel isOpen={OpenFilterTravel} setIsOpen={setFilterTravel} data={data} setData={setData} />
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: 'white' }} >
                        <Typography variant="h5" noWrap component="div">
                            Travelify
                        </Typography>
                    </Link>
                    <div style={{ marginLeft: 'auto', marginRight: '2%' }} >
                        {/* <Button color="inherit" style={{ marginRight: '30px' }} onClick={handlelogout} >Logout</Button> */}
                        <IconButton
                            size="larger"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => window.location.href = `${window.location.origin}/profile/${username}`}>My Profile</MenuItem>
                            <MenuItem onClick={handlelogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItemButton
                        key={'Travellers Post'}
                        sx={{
                            minHeight: 50,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={() => navigate('/')}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <img height="25px" width="25px" src={image} />
                        </ListItemIcon>
                        <ListItemText primary={'Travellers Post'} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                    <ListItemButton
                        key={'Add Travel'}
                        sx={{
                            minHeight: 50,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={handleaddtravel}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <AddCircleOutline />
                        </ListItemIcon>
                        <ListItemText primary={'Add Travel'} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                    <ListItemButton
                        key={'Filter Travels'}
                        sx={{
                            minHeight: 50,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={handlefiltertravel}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <FilterAltIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Filter Travels'} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </List>
                <Divider />
            </Drawer>
        </Box >
    );
}
