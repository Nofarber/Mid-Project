import { useContext, useEffect } from "react";
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
      favorites: [],
      pickUpTime: []
    }
  ],
  isConnected: Boolean,
  setIsConnected: () => { },
  currentUser: {},
  setCurrentUser: () => { },
  setUsers: () => { },
  createNewUser: () => { },
  login: () => { },
  logout: () => { },
  UpdateUser: ()=>{}
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
      favorites: [],
      pickUpTime: []
    }
  ],
  isConnected: Boolean,
  setIsConnected: () => { },
  currentUser: {},
  setCurrentUser: () => { },
  setUsers: () => { },
  createNewUser: () => { },
  login: () => { },
  logout: () => { },
  UpdateUser: ()=>{}
});

export const useCredentials = () => {
  return useContext(UserContext)
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
        firstName: 'Eddie',
        lastName: 'Zvonov',
        enlistment: 'new Date',
        discharge: new Date,
        tashType: '',
        roll: '',
        userID: '',
        phoneNumber: 0,
        favorites: ["3555653268253829", "4041599669330"],
        pickUpTime: []
      
      }
    ]
    );
    
    const [isConnected, setIsConnected] = useState(
      JSON.parse(localStorage.getItem("isConnected")) || Boolean(false)
      )
      
      const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("currentUser")) || {}
        );
        
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

    const login = ({ username, password, staySignedIn }) => {
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
        if (staySignedIn) {
          localStorage.setItem("isConnected", JSON.stringify(Boolean(true)));
          localStorage.setItem("currentUser", JSON.stringify(userExists));
        }
        setIsConnected(true);
        setCurrentUser(userExists);
      };
      
      const UpdateUser = (info)=>{
        setUsers(info)
        localStorage.setItem("users", JSON.stringify(info))
        return [info]
      }

        
      const logout = () => {
        localStorage.setItem("isConnected", JSON.stringify(Boolean(false)));
        setIsConnected(false)
        localStorage.removeItem("currentUser")
        setCurrentUser("");
    };


    return (
        <UserContext.Provider value={{ users, setUsers, createNewUser, login, UpdateUser, logout, isConnected, setIsConnected, currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

