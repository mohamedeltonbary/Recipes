import React, { useContext } from 'react';
import { RecipeContext } from '../Context/RecipeProvider';
import { Link } from 'react-router-dom';
import { FaTrash } from "react-icons/fa6";

const Favorite = () => {
    // هنا نفك العناصر بنفس ترتيب الـ Provider
    const [searchTerm, setSearchTerm, favorites, addToFavorites, removeFromFavorites] = useContext(RecipeContext);

    if (favorites.length === 0) {
        return (
            <div className='flex justify-center items-center min-h-screen flex-col'>
                <h2 className='text-2xl font-semibold'>No favorite recipes added yet.</h2>
                <button
                    className='mt-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'
                >
                    <Link to="/">Browse Recipes</Link>
                </button>
            </div>

        );
    }

    return (
        <div className="grid grid-cols-12 gap-4 mt-28">
            {favorites.map((recipe) => (
                <div key={recipe.id} className='cursor-pointer rounded-2xl p-4 m-4 shadow-lg col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 flex flex-col items-center'>
                    <Link to={`/recipeDetails/${recipe.id}`}>
                        <img src={recipe.image_url} alt={recipe.title} className='w-full h-56 rounded-xl' />
                    </Link>

                    <div className='flex justify-between items-center w-full mt-3'>
                        <p className='font-semibold text-lg'>{recipe.title.split(" ").slice(0, 3).join(" ")}</p>

                        {/* زر الحذف */}
                        <FaTrash
                            size={20}
                            color="red"
                            onClick={() => removeFromFavorites(recipe.id)}
                            className='cursor-pointer hover:scale-110 transition-transform duration-200'
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Favorite;
