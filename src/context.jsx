import { createContext, useState } from "react";

export const UserContext = createContext({
  users: [
    {
        userName:'',
        password:'',
        mail:'',
        firstName:'',
        lastName:'',
        enlistment:new Date,
        discharge: new Date,
        tashType:'',
        roll:'',
        userID:'',
        phoneNumber:0,
        favorites:[]
    }
  ],
  setUsers: () => {},
  createNewUser: () => {},
  login: () => {},
});

export const FurnitureContext = createContext({
     furniture: [
        {
            title:'',
            description:'',
            photo:[],
            category:'',
            color:'',
            condition:'',
            publishDate:new Date,
            isAtStorage:true,
            adress:'',
            donerName:'',
            donerPhone:'',
            furnitureID:'',
        }
    ],
    setFurniture: () => {},
})



// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );


  return (
    <UserContext.Provider value={{ users, setUsers,}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

const createNewUser = (newUser) => {
    setUsers((prev) => {
      if (prev.some((user) => user.username === newUser.username)) {
        return prev;
      }
      localStorage.setItem("users", JSON.stringify([...prev, newUser]));
      return [...prev, newUser];
    });
  };

  const login = ({ username, password }) => {
    const userExists = users.find((user) => user.username === username);
    if (!userExists) {
      return alert("Wrong credentials!");
    }
    const passwordMatch = userExists.password === password;
    if (!passwordMatch) {
      return alert("Wrong credentials!");
    }
    return alert("Logged in!");
  };