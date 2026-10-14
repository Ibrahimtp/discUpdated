# DISC Assessment App

A web app for running DISC behavioural assessments. Participants register, answer "most / least like me" questions, and the app scores and stores their results. An admin dashboard lets an organization review and manage them.

## Features
- Participant sign-up with name, organization and position
- DISC questionnaire, with "most" and "least" scores totalled per participant
- Results stored in MongoDB with Mongoose
- Admin view to review submissions and delete records
- Session handling via `express-session` with a MongoDB session store (`connect-mongo`)

## Tech stack
Node.js · Express.js · MongoDB · Mongoose · EJS · express-session · connect-mongo

## Run locally
```bash
npm install
cp .env.example .env   # then set MONGODB_URI and SESSION_SECRET
npm start          # http://localhost:3000
```
