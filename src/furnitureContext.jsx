import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

export const FurnitureContext = createContext({
    furniture: [ ],
    setFurniture: () => { },
    createNewFurniture: () => { }
})

export const useFurniture = () => {
    return useContext(FurnitureContext)
}

const FurnitureProvider = ({ children }) => {
    const [furniture, setFurniture] = useState(
        JSON.parse(localStorage.getItem("Furniture")) || [
            {
                title: '',
                description: '',
                photo: [],
                category: '',
                color: '',
                condition: '',
                publishDate: new Date,
                isAtStorage: true,
                address: '',
                donerName: '',
                donerPhone: '',
                furnitureID: '',
            }
        ]
    );



    const createNewFurniture = (newFurniture) => {
        setFurniture((prev) => {
            if (prev.some((Furniture) => Furniture.title === newFurniture.title)) {
                return prev,
                    alert('furniture already exsists')
            }
            localStorage.setItem("Furniture", JSON.stringify([...prev, newFurniture]));
            return [...prev, newFurniture];
        });
    };

    return (
        <FurnitureContext.Provider value={{ furniture, setFurniture, createNewFurniture }}>
            {children}
        </FurnitureContext.Provider>
    )
}

export default FurnitureProvider