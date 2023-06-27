import React from 'react';

import { Container, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import CodeIcon from '@mui/icons-material/Code';

function AboutPage() {
  return (
    <Container maxWidth="md">
      <Container sx={{ pt: 3 }}>
        <Typography variant="h4">What is the Deprogrammer?</Typography>
        <Typography variant="body1" sx={{ pt: 2 }} >
          For a few years now, I've been listening to a podcast called Deprogrammed, and have even
          had the pleasure of being a guest a few times. It's a music curation podcast with the purpose of
          narrowing down an artist's discography to a top 10 starter kit of their best songs, so that anyone who's
          never listened to to them before can have a good place to start. The host and 2 - 3 guests each take
          the time to come up with a top 20 list of songs for that artist, and when the podcast goes live, they
          “play the game”, each taking turns naming a song that's on their list. Every song gets a tally of how many players had
          the same song on their lists, and the songs with the most votes make it to the final discussion, where
          guests get to passionately argue about why their song choice deserves to make the top 10.
        </Typography>
        <Typography variant="body1" sx={{ pt: 2 }}>
          It's always been such a fun experience and it has provided me with a really great music community to
          be a part of. However, gameplay has always been a bit of a challenge. Coordinating while the podcast is live
          has always been a less-than-convenient process, as there isn't a centralized place for all of us to compare our lists
          in real-time with the host's masterlist as we're playing. There's no specific way that every guest is instructed to
          manage and keep their lists, so I could be following along with a separate Google Sheets file while someone else
          is using a pen and paper, while another panel member is using the notes app in their phone. This means that the
          guests on the podcast have to divide their focus between the discussion on the podcast and making sure they're following
          along and keeping an accurate record of which songs they've played, and which of their songs have been played by other
          panel members.
        </Typography>

        <Typography variant="body1" sx={{ pt: 3 }}>The solution is <strong>The Deprogrammer</strong> - a web app that allows users to:</Typography>
        <List>
          <ListItem>
            <ListItemIcon><SkipNextIcon /></ListItemIcon>
            <ListItemText>Create an account</ListItemText>
          </ListItem>
          <ListItem>

            <ListItemIcon><SkipNextIcon /></ListItemIcon>
            <ListItemText>View upcoming panels they're assigned to</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><SkipNextIcon /></ListItemIcon>
            <ListItemText>View and edit their top lists for upcoming panels</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><SkipNextIcon /></ListItemIcon>
            <ListItemText>Add notes for songs on their top list</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><SkipNextIcon /></ListItemIcon>
            <ListItemText>Enter Gameplay Mode, where they can play songs from their top list and see the live tally of other users who had matches in their top list</ListItemText>
          </ListItem>
        </List>

        <Typography variant="body1" sx={{ pt: 1 }}>This app also allows <em>admin</em> users to:</Typography>
        <List>
          <ListItem>
            <ListItemIcon><SkipNextIcon /></ListItemIcon>
            <ListItemText>Upload a new artist's discography playlist by simply pasting a Spotify URL</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><SkipNextIcon /></ListItemIcon>
            <ListItemText>Add users to / remove users from upcoming podcast panels</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><SkipNextIcon /></ListItemIcon>
            <ListItemText>Update recording dates for upcoming panels</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><SkipNextIcon /></ListItemIcon>
            <ListItemText>Set a panel and masterlist into Gameplay Mode</ListItemText>
          </ListItem>
        </List>

      </Container>

      <Container>
        <Typography variant="h4">How was this made?</Typography>
        <Typography variant="body2" sx={{ pt: 2 }}>The Deprogrammer was my solo project for Tier 3 during my time studying Full-stack Javascript at Emerging Digital Academy.
          The process of creating this project involved a week of planning, which involved creating wireframes on moqups.com to display
          my ideas for each page, creating an Entity Relationship Diagram on dbdesigner.net to plan my database tables and their relationships,
          as well as importing screenshots of these into a scope document outlining the details and timeline of the project.
        </Typography>
        <Typography variant="body1" sx={{ pt: 3 }}>This application was built using the following frameworks and tools:</Typography>

        <Typography variant="body1" sx={{ pt: 3 }} >Full Stack:</Typography>

        <List>
          <ListItem>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText>VSCode</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText>git / GitHub</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText>Node.js</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText>npm</ListItemText>
          </ListItem>
        </List>

        <Typography variant="body1" sx={{ pt: 2 }}>Backend:</Typography>
        <List>
          <ListItem>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText>PostgreSQL</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText>Postico</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText>Postman</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText>Express.js</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText>Axios</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText>Passport.js</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText>Cookie-Session</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText>BCrypt</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText>Spotify API</ListItemText>
          </ListItem>
        </List>

        <Typography variant="body1" sx={{ pt: 2 }}>Front End:</Typography>
        <List>
          <ListItem>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText>React</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText>React Redux</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText>Redux Saga</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText>React Router</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText>moment.js</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText>Axios</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText>Material UI</ListItemText>
          </ListItem>
        </List>
      </Container>
    </Container>
  );
}

export default AboutPage;
