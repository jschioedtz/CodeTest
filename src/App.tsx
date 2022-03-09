import React, { useEffect, useReducer, useState } from "react";

import {
    Avatar,
    Box,
    Card,
    CardHeader,
    Container,
    Grid,
    IconButton,
    Stack,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/RestoreFromTrash';
import { blue, green, red } from '@mui/material/colors';

// Task 1
import users from "./data";
import { User, ReducedUser } from "./types/user";
import PrimarySearchAppBar from "./layout";

/** Instructions
   0. Fork this codesandbox and sync it with your github 
   1. import users data from data.ts
   2. On load:
   2.1. Filter the users data array to only include users where age >= 18
   2.2. Map the users data array to only include username, address, age and companyName
   2.3. Add a new ID to each user object, which should consist of a randomized sequence (6 characters) of the following: {ABCDEF123456}
   2.4. Sort the array (asc) by age, then by companyName
   2.5. Dispatch the data to the local users state
   3. Display the users' properties using a loop in the JSX, preferably in a "Card" form
   3.1. Add some styling to the cards
   3.2. Add a "remove" button to each card - this should remove the user from the state
   3.3. Store the removed users in a new state instance
   3.4. Using the second input, add a method to search for a user's username with the onChange event
   3.5. The removed users should also be found if the input is being used to search for a username
   3.6. In the case where a removed user is shown during a search, there should be a "restore" button, which would insert the removed user back into the users array
   4. Extend the reducer:
   4.1. Count must always be >= 0, in all cases
   4.2. Add a case to increment count with a random number, between 1 and 10
   4.3. Add a case to increment to the nearest odd number, if already odd - increment to next odd
   4.4. Add a case to decrease the count by the input of the first textfield
   4.5. Add a case to reset the count
   4.6. Add buttons to said cases
   4.7. Add some styling to the buttons, e.g. by using icons
   5. Provide the link to your forked repo with your answers
   */

export default function App() {

    const [usersState, setUsersState] = useState<ReducedUser[]>([]);
    const [removedUsersState, setRemovedUsersState] = useState<ReducedUser[]>([]);
    const [searchUsersState, setSearchUsersState] = useState<ReducedUser[]>([]);
    const [searchUsername, setSearchUsername] = useState<string>("");

    // Task 3.3
    const removeUser = (user: ReducedUser) => {
        setUsersState(usersState.filter(u => u.id !== user.id));
        setRemovedUsersState([...removedUsersState, { ...user, restore: true }]);
    }

    // Task 3.6
    const restoreUser = (user: ReducedUser) => {
        setRemovedUsersState(removedUsersState.filter(u => u.id !== user.id));
        setUsersState([...usersState, { ...user, restore: false }]);
    }

    // Task 3
    const renderUser = (user: ReducedUser, color: string ) => {
        return (
            <Card
                key={user.id}
            >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: color }} aria-label="initials">
                            {user.username.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton
                            onClick={user.restore ? () => restoreUser(user) : () => removeUser(user)}
                            aria-label={user.restore ? "Restore" : "Remove"}>
                            {user.restore ? (<RestoreIcon />) : (<DeleteIcon />)}
                        </IconButton>
                    }
                    title={user.username}
                    subheader={user.companyname}
                />
            </Card>
        );
    }

    // Task 3.4
    const searchUsers = (username: string) => {
        setSearchUsername(username);
        if (username.length >= 1) {
            setSearchUsersState([
                ...usersState.filter(user => user.username.toLowerCase().indexOf(username.toLowerCase()) >= 0),
                ...removedUsersState.filter(user => user.username.toLowerCase().indexOf(username.toLowerCase()) >= 0).map(user => ({ restore: true, ...user }))
            ]);
        }
        else
            setSearchUsersState([]);
    }

    // Task 2.3
    const idChars = "ABCDEF123456";
    const randomId = () => {
        let id = "";
        for (var i = 1; i <= 6; i++) {
            id += idChars.charAt(Math.floor(Math.random() * idChars.length))
        }
        return id;
    };

    // Task 3.6
    useEffect(() => {
        searchUsers(searchUsername);
    }, [removedUsersState, usersState])

    // Task 2
    useEffect(() => {
        // Task 2.1
        const filterUsers: User[] = users.filter(user => user.age >= 18);

        // Task 2.2 and 2.3
        const reduceUsers: ReducedUser[] = filterUsers.map((user: User) => ({
            id: randomId(),
            username: user.username,
            address: user.address,
            age: user.age,
            companyname: user.company.name
        }));

        // Task 2.4
        const sortedUsers = reduceUsers
            .sort((a, b) => (a.age - b.age || a.companyname.localeCompare(b.companyname)));
          
        // Task 2.5
        setUsersState(sortedUsers);
    }, [])

    return (
        <>
            <PrimarySearchAppBar
                onChange={(username: string) => searchUsers(username)}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container>
                    <Box>
                        <Grid
                            container
                            justifyContent="space-between"
                            spacing={3}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Typography
                                        variant="h5"
                                        component="div"
                                    >
                                        Imported users
                                    </Typography>
                                    <Stack spacing={2}>
                                        {usersState.map((user: ReducedUser) => renderUser(user, green[500]))}
                                    </Stack>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography
                                        variant="h5"
                                        component="div"
                                    >
                                        Removed users
                                    </Typography>
                                    <Stack spacing={2}>
                                        {removedUsersState.map((user: ReducedUser) => renderUser(user, red[500]))}
                                    </Stack>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography
                                        variant="h5"
                                        component="div"
                                    >
                                        Search result
                                    </Typography>
                                    <Stack spacing={2}>
                                        {searchUsersState.map((user: ReducedUser) => renderUser(user, blue[500]))}
                                    </Stack>
                                </Grid>
                            </Grid>
                                
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
  );
}