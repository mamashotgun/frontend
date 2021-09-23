import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
const style = {
    position: 'absolute',
    margin: '2rem',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ stepperParams, visible }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [open, setOpen] = React.useState(visible);
    const history = useHistory()

    useEffect(() => {
        setOpen(visible)
    }, [visible])

    const AddPlace = async () => {
        try {
            const headers = {
                headers: { "Content-Type": "application/json" },
            };

            const response = await axios.post(
                `${process.env.REACT_APP_API_ADDRESS}/Places`,
                {
                    name: name,
                    location_id: stepperParams.location_id,
                    category_id: stepperParams.category_id,
                    description: description

                },
                headers
            );
            history.push({ pathname: "/login" });

        } catch (error) {
            console.error(error);
        }
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="modal">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} id="modal">
                    <center>
                        <h3>צור מקום חדש</h3>
                        <TextField
                            className="textbox"
                            label="name"
                            variant="outlined"
                            onChange={(event) => setName(event.target.value)}
                            value={name}
                        />
                        <br />
                        <br />
                        <TextField
                            className="textbox"
                            label="description"
                            variant="outlined"
                            onChange={(event) => setDescription(event.target.value)}
                            value={description}
                        />
                        <br />
                        <br />
                        <Button className="loginButton" variant="contained" onClick={AddPlace}>
                            Login
                        </Button>
                    </center>
                </Box>
            </Modal>
        </div>
    );
}

