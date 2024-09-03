# This is a full stack pre-interview test

## Project Overview

Caro is attending Workshop X in Nairobi at the Museum. Upon arrival at the entrance, she presents her ID and is given a QR code to scan. The QR code opens a form on her phone, prompting her to fill in her name, ID number, mobile number, and email address. She then checks a box to accept the terms and conditions. When she clicks it, a detailed terms and conditions document appears, requiring her to scroll to the bottom and append her signature (in a Docusign-style format). After submitting the form, a message pops up notifying her that her location is being geotagged while she is on the premises. Upon leaving the premises, a message will appear on her phone indicating that geotagging has stopped. The next time Caro attends an event organized by this organizer at any location, she only needs to provide her phone number, and all her information will be retrievable, allowing her to enter the premises again with geotagging. The organizer can see who attended, what time they arrived, and what time they left.

## Approach

1. ⁠When Caro reaches the workshop location, after presenting her ID, a database query is performed to check if Caro's ID number is in the database. If her ID number is in the database, go to step 3.
2. ⁠If the ID number is not in the database, Caro is prompted to fill in her name, ID number, mobile number, and email address. She is also prompted to accept the terms and conditions.
3. ⁠A message is displayed that her location will be tracked while on premise and the time she enters is logged into the database
4. ⁠When Caro leaves the premise the geotagging is stopped and the time she left is logged into the database.

![alt text](image.png)

# Implementation

- This project will be over-engineered to meet practices that would be used in production
- The project stack is:
  1. NodeJS for the backend
  2. ReactJS with CRA (Create React App) with TypeScript for the front-end
  3. MongoDB for the database

## Backend

### Dependencies

1. Express - A backend web framework for NodeJS
2. Mongoose - MongoDB object modelling tool
3. Nodemon (devDependency) - a tool used to reload the server when a change is made
4. Dotenv - A tool to access environment variables using `process.env` in files
