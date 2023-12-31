import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

//MUI
import {
    TextField,
    IconButton,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Paper,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Typography,
    Button
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function PanelUsers() {

    // Redux
    const dispatch = useDispatch();
    const panelUsers = useSelector(store => store.toplist.panelUserReducer);
    const currentList = useSelector(store => store.currentList)

    // local state
    const [username, setUsername] = useState('');
    const [userDisplay, setUserDisplay] = useState('')
    const [userID, setUserID] = useState('')
    const [open, setOpen] = useState(false);

    // dispatch to add new user to selected panel
    const addUser = () => {
        //validate username input field and currentList
        if (!username || !currentList) {
            alert("Please enter a valid username and select a panel")
            return;
        }
        // validate to prevent trying to add duplicate user
        for(let user of panelUsers){
            if(username === user.username){
                alert("Cannot add duplicate user")
                return;
            }
        }

        dispatch({ type: "ADD_USER", payload: { playlist_id: currentList, username } })
        //reset local state
        setUsername('')
    }

    // dispatch to remove a user from a panel
    const removeUser = (user_id) => {
        // validation!
        if (!currentList) {
            return;
        }
        dispatch({ type: "REMOVE_USER", payload: { user_id, playlist_id: currentList } });

        // close dialog box
        handleClose();
    }

    // handler function to open Remove User dialog
    const handleClickOpen = (user_id, user_name) => {
        setUserDisplay(user_name)
        setUserID(user_id)
        setOpen(true)
    }

    // handler function to close Remove User dialog
    const handleClose = () => {
        setOpen(false)
        setUserDisplay('')
        setUserID('')
    }

    // custom MUI table styles
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
            fontSize: 13,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 13,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        // only render this component if our panelUsers store is populated
        panelUsers.length > 0 &&
        <Container maxWidth="xs">
            <Paper sx={{ p: 3, my: 5 }}>
                {/* input to add new user to panel */}
                <TextField
                    sx={{ mb: 3 }}
                    type="text"
                    value={username}
                    size="small"
                    label="Username"
                    onChange={e => setUsername(e.target.value)} />
                <IconButton
                    sx={{ ml: 1 }}
                    variant="contained"
                    color="warning"
                    onClick={addUser}
                ><AddCircleIcon />
                </IconButton>

                {/* Dialog popup to confirm that the user wants to delete selected user from panel */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Remove {userDisplay} from current panel?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography variant="caption" >You will be able to re-add them later, if you wish.</Typography>
                        </DialogContentText>
                        <DialogActions>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => removeUser(userID)}
                            >Remove</Button>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={handleClose}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
                
                {/* table to display currently selected panel */}
                <TableContainer >
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Current Panel</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {panelUsers.length > 0 &&
                                panelUsers.map(user => {
                                    return (
                                        <StyledTableRow key={user.id}>
                                            <StyledTableCell>{user.username}</StyledTableCell>
                                            <StyledTableCell>
                                            {!user.is_admin && 
                                                <IconButton
                                                    variant="text"
                                                    color="error"
                                                    onClick={() => handleClickOpen(user.id, user.username)}
                                                >
                                                <RemoveCircleIcon /></IconButton>}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    )
}