# The Deprogrammer

## Description

_Duration: 2 week sprint_

The Deprogrammer was my solo project for Tier 3 during my time studying Full-stack Javascript at Emerging Digital Academy.
The process of creating this project started with a week of planning, which involved creating wireframes on moqups.com to display
my ideas for each page, creating an Entity Relationship Diagram on dbdesigner.net to plan my database tables and their relationships,
as well as importing screenshots of these into a scope document outlining the details and timeline of the project.

### Why did I make this?

For a few years now, I've been listening to a podcast called Deprogrammed, and have even
had the pleasure of being a guest a few times. It's a music curation podcast with the purpose of
narrowing down an artist's discography to a top 10 starter kit of their best songs, so that anyone who's never listened to to them before can have a good place to start. The host and 2 - 3 guests each take the time to come up with a top 20 list of songs for that artist, and when the podcast goes live, they “play the game”, each taking turns naming a song that's on their list. Every song gets a tally of how many players had the same song on their lists, and the songs with the most votes make it to the final discussion, where guests get to passionately argue about why their song choice deserves to make the top 10.

It's always been such a fun experience and it has provided me with a really great music community to be a part of. However, gameplay has always been a bit of a challenge. Coordinating while the podcast is live has always been a less-than-convenient process, as there isn't a centralized place for all of us to compare our lists in real-time with the host's masterlist as we're playing. There's no specific way that every guest is instructed to manage and keep their lists, so I could be following along with a separate Google Sheets file while someone else is using a pen and paper, while another panel member is using the notes app in their phone. This means that the guests on the podcast have to divide their focus between the discussion on the podcast and making sure they're following along and keeping an accurate record of which songs they've played, and which of their songs have been played by other panel members.

I decided to make The Deprogrammer as a solution to that, so that the host and podcast guests could have a cohesive place to build their top 20 lists and view which upcoming panels they're a part of. Most importantly I wanted to create a place where podcast participants could play the game without having to be distracted by keeping track of everything going on during gameplay, so this app handle s gameplay in real time. If you put a song into play, it automatically shows up on the game list with a total vote tally as well as tallies for each user, taking that song out of play for everyone to avoid redundance and confusion.

## Screenshots

The home page for a logged in user. Here, the user has selected an upcoming panel to see the preview of their current top list.
![User Home Page](/public/screenshots/Homepage.png)

The EDIT page for a user (List Editor in the Edit dropdown for an admin user).
This is where users will add and remove songs from their top list and add any notes to tracks.
![List Editor](/public/screenshots/ListEditor.png)

The Panel Editor for the Admin. The first screenshot is the Add New List option, where the admin can paste in a Spotify URL and add a recording date to create a new list.

The second screenshot is the Panel Editor with a list selected, where the admin can add and remove users from the panel.
![Panel Editor - Add New List](/public/screenshots/Panel_Add.png)
![Panel Editor - Edit List](/public/screenshots/Panel_Edit.png)

This is the Play page, where all users on a panel can put songs into play while the admin has set the list to Game Mode. 
![Play Page](/public/screenshots/PlayPage.png)

## Prerequisites
- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

## Installation
- Create a PostgreSQL database called `depgrogrammer`
- Copy the CREATE TABLE statements listed in the provided `database.sql` file
- Open up the project in your code editor of choice and run `npm install`
- Run `npm run server`
- Open another terminal and run `npm run client`

## Usage
The Deprogrammer is a web app that allows users to:

- Create an account
- View upcoming panels they're assigned to
- View and edit their top lists for upcoming panels
- Add notes for songs on their top list
- Enter Gameplay Mode, where they can play songs from their top list and see the live tally of other users who had matches in their top list

This app also allows _admin_ users to:

- Upload a new artist's discography playlist by simply pasting a Spotify URL
- Add users to / remove users from upcoming podcast panels
- Update recording dates for upcoming panels
- Set a panel and masterlist into Gameplay Mode

## Built With
- [PostgreSQL](https://www.postgresql.org/)
- [Express.js](https://expressjs.com/)
- [Passport.js](https://www.passportjs.org/)
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [React](https://react.dev/)
- [React Redux](https://react-redux.js.org/)
- [Redux Saga](https://redux-saga.js.org/)
- [Axios](https://axios-http.com/docs/intro)
- [React Router](https://reactrouter.com/en/main)
- [moment.js](https://momentjs.com/)
- [Material UI](https://mui.com/material-ui/getting-started/overview/)

## Support
For any questions, suggestions, or issues, please send me an e-mail at [kord.r.maurer@gmail.com](mailto:kord.r.maurer@gmail.com) or message me on [LinkedIn](https://linkedin.com/in/kord-maurer)