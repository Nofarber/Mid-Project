import { useContext } from "react";
import { createContext, useState } from "react";

export const UserContext = createContext({
  users: [
    {
      userName: 'bob',
      password: '1234',
      mail: '',
      firstName: '',
      lastName: '',
      enlistment: 'new Date',
      discharge: new Date,
      tashType: '',
      roll: '',
      userID: '',
      phoneNumber: 0,
      favorites: []
    }
  ],
  isConnected:'cccc',
  setIsConnected: () => { },
  setUsers: () => { },
  createNewUser: () => { },
  login: () => { },
});

export const useCredentials = () => {
  return useContext(UserContext)
}


// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || [
      {
        userName: 'bob',
        password: '1234',
        mail: '',
        firstName: '',
        lastName: '',
        enlistment: 'new Date',
        discharge: new Date,
        tashType: '',
        roll: '',
        userID: '',
        phoneNumber: 0,
        favorites: []
      }
    ]
  );

  const [isConnected,setIsConnected]=useState(
    JSON.parse(localStorage.getItem("isConnected")) || ''
  )

  const createNewUser = (newUser) => {
    setUsers((prev) => {
      if (prev.some((user) => user.userName === newUser.userName)) {
        return prev,
        alert('user already exsists')
      }
      localStorage.setItem("users", JSON.stringify([...prev, newUser]));
      return [...prev, newUser];
    });
  };
  
  const login = ({ username, password }) => {
    console.log(username);
    console.log(password);
    console.log(users);
    const userExists = users.find((user) => user.userName === username);
    if (!userExists) {
      return alert("Wrong credentials!");
    }
    const passwordMatch = userExists.password === password;
    if (!passwordMatch) {
      return alert("Wrong credentials!");
    }
    localStorage.setItem("isConnected", JSON.stringify(userExists.userName))
    setIsConnected(userExists.userName);
  };


  return (
    <UserContext.Provider value={{ users, setUsers, createNewUser, login, isConnected, setIsConnected}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

