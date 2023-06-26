import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h3>What is the Deprogrammer?</h3>
        <p>
          For a few years now, I've been listening to a podcast called Deprogrammed, and have even
          had the pleasure of being a guest a few times. It's a music curation podcast with the purpose of
          narrowing down an artist's discography to a top 10 list of their best songs, so that anyone who's
          never listened to to them before can have a good place to start. The host and 2 - 3 guests each take
          the time to come up with a top 20 list of songs for that artist, and when the podcast goes live, they
          “play the game”, each taking turns naming a song that's on their list. Every song gets a tally of how many players had
          the same song on their lists, and the songs with the most votes make it to the final discussion, where
          guests get to passionately argue about why their song choice deserves to make the top 10.
        </p>
        <p>
          It's always been such a fun experience and it has provided me with a really great music community to
          be a part of. However, gameplay has always been a bit of a challenge. Coordinating while the podcast is live
          has always been a less-than-convenient process, as there isn't a centralized place for all of us to compare our lists
          in real-time with the host's masterlist as we're playing. There's no specific way that every guest is instructed to
          manage and keep their lists, so I could be following along with a separate Google Sheets file while someone else
          is using a pen and paper, while another panel member is using the notes app in their phone. This means that the
          guests on the podcast have to divide their focus between the discussion on the podcast and making sure they're following
          along and keeping an accurate record of which songs they've played, and which of their songs have been played by other
          panel members.
        </p>
        <p>Enter <strong>The Deprogrammer!</strong></p>
        <p>The Deprogrammer is a web app that allows users to: </p>
        <ul>
          <li>Create an account</li>
          <li>View upcoming panels they're assigned to</li>
          <li>View and edit their top lists for upcoming panels</li>
          <li>Add notes for songs on their top list</li>
          <li>Enter Gameplay Mode, where they can play songs from their top list and see the live tally of other users who had matches in their top list</li>
        </ul>
        <p>This app also allows <em>admin</em> users to:</p>
        <ul>
          <li>Upload a new artist's discography playlist by simply pasting a Spotify URL</li>
          <li>Add users to / remove users from upcoming podcast panels</li>
          <li>Update recording dates for upcoming panels</li>
          <li>Set a panel and masterlist into Gameplay Mode</li>
        </ul>
      </div>
      <div>
        <h3>How was this made?</h3>
        <p>The Deprogrammer was my solo project for Tier 3 during my time studying Full-stack Javascript at Emerging Digital Academy.
          The process of creating this project involved a week of planning, which involved creating wireframes on moqups.com to display
          my ideas for each page, creating an Entity Relationship Diagram on dbdesigner.net to plan my database tables and their relationships,
          as well as importing screenshots of these into a scope document outlining the details and timeline of the project.
        </p>
        <p>This application was built using the following frameworks and tools:</p>
        <p>Full Stack:</p>
        <ul>
          <li>VSCode</li>
          <li>git / GitHub</li>
          <li>Node.js</li>
          <li>npm</li>
        </ul>
        <p>Backend:</p>
        <ul>
          <li>PostgreSQL</li>
          <li>Postico</li>
          <li>Postman</li>
          <li>Express.js</li>
          <li>Axios</li>
          <li>Passport.js</li>
          <li>Cookie-Session</li>
          <li>BCrypt</li>
          <li>Spotify API</li>
        </ul>
        <p>Front End:</p>
        <ul>
          <li>React</li>
          <li>React Redux</li>
          <li>Redux Saga</li>
          <li>React Router</li>
          <li>moment.js</li>
          <li>Axios</li>
          <li>Material UI</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
