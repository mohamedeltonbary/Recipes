import React, { useEffect, useState, useContext } from 'react';
import styles from './Home.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa6";
import { BarLoader } from "react-spinners";
import { RecipeContext } from '../Context/RecipeProvider';
// للى فوق دى مكتبه بجيب منها loading اشكال وكدا

import ReactPaginate from 'react-paginate';

const Home = () => {
    // const [searchTerm] = useContext(RecipeContext);
    const [searchTerm, setSearchTerm, favorites, addToFavorites, removeFromFavorites] = useContext(RecipeContext);


    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
      
    //  نا هنا بجيب كل الكلام بتاع ال pagination من المكتبه جاهز 
    const itemsPerPage = 12;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = recipes.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(recipes.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % recipes.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };


    const getRecipes = async () => {
        try {
            const word = searchTerm === "" ? "pizza" : searchTerm;
            const { data } = await axios.get(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${word}`);
            console.log(data.data.recipes);
            setRecipes(data.data.recipes);
            setLoading(false);

        } catch (error) {
            console.log(error);

        }
    }



    useEffect(() => {
        getRecipes();
    }, [searchTerm]);
    if (loading) {
        return <div className='flex justify-center items-center min-h-screen'>
            <BarLoader
                size={50} color="green" />
        </div>
    }




    return (
        <div className="grid grid-cols-12 gap-4 mt-28">
            {currentItems.map((recipe) => {
                // هنا بنتأكد إذا كانت الوصفة دي موجودة ف المفضلة ولا لا
                const isFavorite = favorites.some(fav => fav.id === recipe.id);

                return (
                    <div key={recipe.id} className='cursor-pointer hover:scale-105 transition-all duration-300 rounded-2xl p-4 m-4 shadow-lg col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 flex flex-col items-center'>
                        <Link to={`recipeDetails/${recipe.id}`}>
                            <img src={recipe.image_url} alt={recipe.title} className='w-full h-56 rounded-xl' />
                        </Link>

                        <div className='flex justify-between items-center w-full mt-3'>
                            <p className='font-semibold text-lg'>{recipe.title.split(" ").slice(0, 3).join(" ")}</p>

                            {/* القلب هيبقى أحمر لو في المفضلة، رمادي لو مش فيها */}
                            <FaHeart
                                size={22}
                                color={isFavorite ? "red" : "gray"}
                                onClick={() => {
                                    if (isFavorite) {
                                        removeFromFavorites(recipe.id);
                                    } else {
                                        addToFavorites(recipe);
                                    }
                                }}
                                className='cursor-pointer hover:scale-110 transition-transform duration-200'
                            />
                        </div>
                    </div>
                );
            })}
            <div className='col-span-12 flex justify-center mt-8 '>
                {/* كل دا عشان انى اقلب بينهم يعنى بواسطهال pagination */}
                <ReactPaginate className='flex gap-4 cursor-pointer p-4 rounded-2xl hover:bg-amber-100 transition-colors  '
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    pageLinkClassName="px-3 py-2 border rounded-lg hover:bg-amber-200 transition-colors"
                    activeLinkClassName="bg-amber-400 text-white"
                    previousLinkClassName="px-3 py-2 border rounded-lg hover:bg-amber-200 transition-colors"
                    nextLinkClassName="px-3 py-2 border rounded-lg hover:bg-amber-200 transition-colors"
                />
            </div>
        </div>

    );
}

export default Home 
