import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export function fetchLeaderboard(game) {
  const auth = firebase.auth();
  const db = firebase.firestore();
  return auth
    .signInAnonymously()
    .then(() => db.collection(game).orderBy("timeMs", "asc").get()) //this is something called a callback and has to do with asynchronous functions
    .then((querySnapshot) => {
      let leaderboard = []; // creates an object out of the data found. JS don't care what's in there or what type
      querySnapshot.forEach((doc) => {
        leaderboard.push(doc.data());
      });
      return leaderboard;
    })
    .catch(function (error) {
      console.log("Error getting leaderboard: ", error);
    });

  //^^ all of the above is promise-chaining function
}
