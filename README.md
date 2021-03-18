## React Music App

React music app is a simple implementation of react with local storage API.

[Demo](https://pensive-mirzakhani-9b857b.netlify.app/)

### Features

- Search songs
- Create/Delete playlist
- Add/Delete songs to a playlist
- Shuffle songs of a playlist
- No DB setup required
- Pagination of songs

### Setup

Clone repository

```
git clone git@github.com:Rohitturbot/music-app-react-local-storage.git
```

go to

```
cd ./music-app-react-local-storage
```

install dependencies

```
yarn install
```

run project

```
npm start
```

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.


```
npm run build
```

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### Few links for the api that used

- Albums API:  [https://jsonplaceholder.typicode.com/albums](https://jsonplaceholder.typicode.com/albums)
- Songs API: [https://jsonplaceholder.typicode.com/photos](https://jsonplaceholder.typicode.com/photos) (The photos API contains the list of songs in each album along with its thumbnail image)
