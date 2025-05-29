# Lesson-07-BEP-EJS-SCSS-Ts

**PREVIOUSLY**
- Express + templates

**TODAY**
- EJS templates + SCSS + TS practice

## Practice day

- Today, the focus is on setting up a project and practicing
    - We will create a web app with Express, EJS, SCSS, and TS
    - It will be a simple board forum
    - We will use SCSS for styling and TypeScript for the client side code
    - There are many ways of setting up a project like this, this is just one

- Here's the plan
    -VIEWS:
        - GET / - show all main page with the 1- latest posts
        - GET /post - show post creation form
        - GET /post/:id - show single post

    - API:
        - POST /post create a new post
        - DELETE /post/:id/delete - delete a post

- Posts will be saved in an array of objects
    - This array will be stored in a file

- We will use SCSS for wtitting the styles
    - We will compile the SCSS to CSS with a build script
    - We will use the `sass` package fo this 

- We will use TypeScript for the client side code
    - We will compile the TypeScript to JaveScript with a build script
    - We will use `bun` or the `tsc` package for this 

- We will run our project with `bun --watch server.ts`
    - When the project runs, SCSS and TypeScript is compliled with bun
    - This would be a bit more complex with NODE 