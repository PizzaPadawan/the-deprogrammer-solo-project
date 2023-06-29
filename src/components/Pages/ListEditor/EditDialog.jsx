import {
    IconButton,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Tooltip,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';

import { useState } from 'react';

export default function EditDialog({ editNote, handleClose, open, selectedTrack }) {
    const [newNotes, setNewNotes] = useState('');

    return (
        <Dialog open={open} onClose={() => { handleClose(); setNewNotes('') }}>
            <DialogTitle>Edit Notes for {selectedTrack}</DialogTitle>
            <DialogContent>
                <TextField
                    sx={{ width: 400 }}
                    rows={5}
                    multiline
                    value={newNotes}
                    onChange={e => setNewNotes(e.target.value)}
                    placeholder={`How do you feel about this song?`}
                    maxLength="1000"
                />
                <DialogActions>
                    <Tooltip 
                    placement='top'
                    arrow
                    title="Save and Close">
                        <IconButton
                            variant="contained"
                            color="warning"
                            onClick={() => {editNote(newNotes); setNewNotes('')}}
                        ><SaveIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                    placement='top'
                    arrow 
                    title="Close without Saving">
                        <IconButton
                            variant="contained"
                            color="warning"
                            onClick={() => { handleClose(); setNewNotes('') }}
                        ><ClearIcon />
                        </IconButton>
                    </Tooltip>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
}