import { useState } from 'react';

// MUI
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

// had to move this Dialog function and newNotes useState into its own component to prevent laggy typing

export default function EditDialog({ editNote, handleClose, open, selectedTrack }) {
    // local state
    const [newNotes, setNewNotes] = useState('');

    return (
        // onClose fires handleClose function and resets local state
        <Dialog open={open} onClose={() => { handleClose(); setNewNotes('') }}>
            <DialogTitle>Edit Notes for {selectedTrack}</DialogTitle>
            <DialogContent>
                {/* TextField to edit newNotes */}
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
                    {/* Save button w/ tooltip */}
                    <Tooltip 
                    placement='top'
                    arrow
                    title="Save and Close">
                        <IconButton
                            variant="contained"
                            color="warning"
                            // saving the new notes fires editNote function with newNotes local state, and then resets local state
                            onClick={() => {editNote(newNotes); setNewNotes('')}}
                        ><SaveIcon />
                        </IconButton>
                    </Tooltip>
                    {/* Close button w/ tooltip */}
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