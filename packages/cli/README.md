# zl-jspg (ZL's JS Code Playground)

A lightweight & easy-to-use code-editor for markdown & JavaScript.

## Introduction

- It is inspired and modified from [a great course on Udemy](https://www.udemy.com/course/react-and-typescript-build-a-portfolio-project/) taught by Stephen Grider. Definitely deserve to check it out, and special thanks to Stephen!
- If you are familiar with Python, this is more like a JavaScript version Jupyter notebook. Perfect for practising interview questions or running the short demo for unfamiliar packages.
- v1.0.0 is there! All the basic features are implemented. Feedbacks are very welcome and feel free to discuss the details or arrange in a UI/UX User Evaluation session with me.

## Main Features

- Add the code cell or markdown cell by hovering the divider between cells. And click the text cell to edit it.
- The code in each cell is all joined together into one file. Definition in previous cells can be referred in the upcoming cells.
- Use the built-in function `show()` to display react component, string, number, array etc in the preview window on the right-hand side.
- Format the code by clicking the right-top button in the code editor.
- Remove, reorder the cells using the three buttons on the right-top corner.

## How to use it

Make sure Node.js 16.0.0+ is on your machine. Otherwise, [Ahead to install](https://nodejs.org/en/) </br>

1. Open your terminal, type in `npm i -g zl-jspg`
2. Optional: `cd` to your favorite directory (mine is Desktop)
3. Run `zl-jspg serve` to start the server. Default port: 4005, filename: notebook.js
   - Custom port:`zl-jspg serve --port=3005` or `-p 3005`.
   - Custom file: `zl-jspg serve -p 4005 vincentBook.js`. It will create a new js file under your current directory.

## Project Structure

Currently consists of three linked packages:

- zl-jspg (a.k.a. cli) </br>
  Setting command line & start up local-api
- @zl-jspg/local-api
  - `GET '/'`: serve up the React app.
  - `POST '/cells'`: Save code cells into the local file
  - `GET 'cells'`: Load up code cells from local file
- @zl-jspg/local-client
  - Public version of the React app

## Tech Stack

TypeScript, React, Redux, ESbuild, express, commander...

## Upcoming feature

T.B.C
