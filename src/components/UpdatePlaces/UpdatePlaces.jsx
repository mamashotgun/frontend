import React, { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import UpdatePlacesModal from './UpdatePlacesModal'

export default function UpdatePlaces(props) {
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(async () => {
        try {

        }
        catch (error) {
        }

    }, [])

    const ToggleModal = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <div>

            <Fab onClick={() => ToggleModal()} style={{ position: "fixed", right: 0, bottom: 0, margin: "2rem" }} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
            {
                modalVisible ? <UpdatePlacesModal stepperParams={props.stepperParams} visible={true} /> : null
            }
        </div >
    );
}
