// import React, { createContext, useState } from 'react'
// import styles from './Context.module.css';
// export const RecipeContext = createContext();
//  export const RecipeProvider = ({ children }) => {
//     const [searchTerm, setSearchTerm] = useState("salad");
//     return (
//         <>
//             <RecipeContext.Provider value={[searchTerm, setSearchTerm ] }>
//                 {children}
//             </RecipeContext.Provider>

//         </>
//     )
// }

// export default RecipeProvider  


import React, { createContext, useState, useEffect } from 'react'
export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("pizza");
    const [favorites, setFavorites] = useState(() => {
        // عند بداية الصفحة، نجيب البيانات من localStorage إذا موجودة
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });

    // كل مرة المفضلة تتغير، نخزنها في localStorage
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (recipe) => {
        const exists = favorites.some((fav) => fav.id === recipe.id);
        if (!exists) {
            setFavorites([...favorites, recipe]);
        }
    };

    const removeFromFavorites = (id) => {
        setFavorites(favorites.filter((fav) => fav.id !== id));
    };

    return (
        <RecipeContext.Provider value={[
            searchTerm,
            setSearchTerm,
            favorites,
            addToFavorites,
            removeFromFavorites
        ]}>
            {children}
        </RecipeContext.Provider>
    );
}

export default RecipeProvider;
