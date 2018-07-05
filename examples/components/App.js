import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import blue from '@material-ui/core/colors/blue';
import Icon from "@material-ui/core/es/Icon/Icon";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Typography from "@material-ui/core/es/Typography/Typography";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import {createMuiTheme} from '@material-ui/core/styles';

import ImageUploadDemo from './ImageUploadDemo';

const theme = createMuiTheme({
    palette: {
        primary: {
            ...blue
        },
    },

    typography: {
        fontFamily: 'Open Sans',
        // fontSize: '5rem',
    },
});

const styles = {
    pageStyle: {
        margin: 25,
        padding: 25,
    },
    typography: {
        marginBottom: 20,
    }

};

const App = () => (
    <MuiThemeProvider theme={theme}>
        <AppBar position="static">
            <Toolbar>
                <Icon className="fab fa-react"/>
                <Typography
                    variant="title"
                    color="inherit"
                    style={{marginLeft: 20}}
                >
                    ReactJS File Uploader
                </Typography>

                <div style={{marginLeft: 'auto'}}>
                    <IconButton
                        color="inherit"
                    >
                        <Icon className="fab fa-npm"/>
                    </IconButton>

                    <IconButton
                        color="inherit"
                    >
                        <Icon className="fab fa-github"/>
                    </IconButton>
                </div>

            </Toolbar>
        </AppBar>
        <div style={styles.pageStyle}>

            <Typography
                variant="display1"
                align='center'
                style={styles.typography}
            >
                ReactJS File Uploader Demo
            </Typography>

            <Typography
                align='center'
                style={styles.typography}
            >
                Select files to upload to see it in action.
            </Typography>
            <Typography
                align='center'
                style={styles.typography}
            >
                Toggle the switches.
            </Typography>

            <Typography
                align='center'
                style={styles.typography}
            >
                View the events.
            </Typography>

            <ImageUploadDemo/>

        </div>
    </MuiThemeProvider>
);

export default App;
