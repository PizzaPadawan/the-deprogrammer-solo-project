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
    Container
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

    // dispatch to add new user to selected panel
    const addUser = () => {
        //validation
        if (!username || !currentList) {
            alert("Please enter a valid username and select a panel")
            return;
        }
        // console.log({ currentList, username })
        dispatch({ type: "ADD_USER", payload: { playlist_id: currentList, username } })
        setUsername('')
    }

    // dispatch to remove a user from a panel
    const removeUser = (user_id) => {
        // validation!
        if (!currentList) {
            return;
        }
        // console.log({ user_id, playlist_id: currentList });
        dispatch({ type: "REMOVE_USER", payload: { user_id, playlist_id: currentList } });
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
        panelUsers.length > 0 &&
        <Container maxWidth="xs">
            <Paper sx={{p:3, my:5}}>
                {/* input to add new user to panel */}
                <TextField
                sx={{mb:3}}
                    type="text"
                    value={username}
                    size="small"
                    label="Username"
                    onChange={e => setUsername(e.target.value)} />
                <IconButton
                    sx={{ml:1}}
                    variant="contained"
                    color="warning"
                    onClick={addUser}
                ><AddCircleIcon/></IconButton>
                <br />
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
                                                <IconButton
                                                variant="text"
                                                color="error"
                                                    onClick={() => removeUser(user.id)}
                                                ><RemoveCircleIcon/></IconButton>
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