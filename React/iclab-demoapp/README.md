# Information Controls Lab Demo Application

## Introduction
This is a demo application for the Information Controls Lab. It uses JavaScript, Node.js, and React to display data. 

I used this as a way to demonstrate my skills with web development. I picked up this JavaScript stack because of familiarity with it, the speed at which you can get a project started with it, and also because I wanted to expand on my React skills and learn more of it.

An important thing to note is that this application looks quite basic in terms of design. This is because my experience with web design and CSS is limited and because I focused more on functionality than flair.

It took a total of about 12-13 hours to complete this project, with roughly 80% of my time devoted to Front-end and learning new things about React. I'm mainly trying to show that I can code well and that I can create applications for the web with little to no help.

## Front end

The front end for the application was built using React and React-Router.

There are 3 main pages of the app:

- Home: This is the landing page with an interactive Map that leads to pages for individual countries.
- Country: This lists out the experiments for a certain country.
- Country Search: This allows users to see a list of countries and also to search for specific ones.

#### Things to note:

- The map on the home page is functional but only supports the US and Netherlands for now since the data I was given only covered those 2 countries.

- Each of these pages has up to 4 React components with their own functionality and/or views. I wanted to make sure everything was modularized for easy updating and debugging.

- The search bar updates the list of countries every time the user types something in. Having multiple components allows this to happen.

- I used React-Router to handle the routes for the application so that I could have links to different part of the app. However, if you type in /countries or something similar in your browser, the page will NOT redirect (unless you've visited the page before). React creates Single Page Applications and so they don't have traditional routes. Users need to navigate to pages manually (using the Navbar or other links). There are workarounds to this but they take more time and code so I skipped out on those for now.

## Back-end / API

I used Node.js and Express to create the backend (which is essentially just an API) for this application. 

The backend reads the data (which I converted from CSV to JSON because it was easier to process it that way), converts into a more readable Javascript object and then provides routes to access it.

Currently, there are two routes:

- /api/getCountries which returns,
``` 
{ 
    US: { name: 'United States', experimentCount: 3, countryCode: 'US' },
    NL: { name: 'Netherlands', experimentCount: 1, countryCode: 'NL' } 
}
```
- /api/getCountry?=countryCode=US
```
[ 
   { time_taken: 298.161,
    server_time: '2017-01-12 20:50:10.805266',
    vpn_provider_name: 'hma',
    ip_address: '94.100.17.0',
    countryCode: 'NL',
    countryName: 'Netherlands',
    schedule: 'torbridges' 
   } 
]
```

Given more data, I could possibly add more routes to do more interesting things.

## [Live Version](https://iclabdemo.herokuapp.com/)










