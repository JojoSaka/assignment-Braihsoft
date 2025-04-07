USER PROFILE ANALYZER

GitHub Activity Tracker
This project is a GitHub Activity Tracker that allows users to input their GitHub username and view:

A list of their public repositories.

An optional feature for visualizing weekly commit activity in a chart for each repository.

Built with React, TypeScript, and ShadCN UI for modern UI components.

Features
Fetch Public Repos: View all public repositories of a GitHub user.

View Weekly Commits: For each repository, visualize weekly commits in a line chart using Chart.js.

Smooth Scrolling: Includes a button to scroll to the bottom of the page after fetching repositories.

This project was deployed on Netlify.app where you would have to upload the "dist" folder.


Deployment
To deploy this project on Netlify:

Build the project to generate the production-ready files:

bash
Copy
Edit
npm run build
# or if you're using yarn
yarn build
This will generate a dist folder containing all the production files.

Upload the dist folder to Netlify:

Go to Netlify and create a new site.

Select the "Drag & Drop" option, then upload the entire dist folder.

Once the deployment is complete, Netlify will provide a live URL where you can view your app.
