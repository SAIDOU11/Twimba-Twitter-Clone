const usersArray = [
  {
    username: "Tom",
    password: "123456",
  },
];
const userObj = usersArray[0];

userObj.username = "Bruce";

console.log(usersArray);
console.log(userObj);
