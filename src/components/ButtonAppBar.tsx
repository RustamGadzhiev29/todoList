import * as React from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import {useAppSelector, useTypedDispatch} from "../app/store";
import {logoutTC} from "../features/Login/auth-reducer";

export default function ButtonAppBar() {
    const dispatch = useTypedDispatch()
    const isLoggedIn =  useAppSelector(state=>state.auth.isLoggedIn)
    const logOutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu />
                    </IconButton>
                    <Typography >
                        TODOLIST
                    </Typography>
                    {isLoggedIn && <Button onClick={logOutHandler} color="inherit">Logout</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}