import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BarLoader } from "react-spinners";

const RecipeDetails = () => {
    const [recipe, setRecipe] = useState(null);
    // انا عاوز بس اقول ان يوز بارامز دى بتعرف ال اد لان انا هنا مستخدمها عشان تجيبه وهيا بتجيبه بناءا ع اللى انا بضغط عليه لانى مستخدم ف ال هووم ريسيب ديتيلز

    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const recipeDetails = async () => {
        try {
            const { data } = await axios.get(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
            setRecipe(data.data.recipe);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        recipeDetails();
    }, []);
    if (loading) {
        return <div className='flex justify-center items-center min-h-screen'>
            <BarLoader
                size={50} color="green" />
        </div>
    }

    return (
        <main className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
            <div className=" mt-20 max-w-md w-full bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <img
                    src={recipe?.image_url}
                    alt={recipe?.title}
                    className="w-full h-64 object-cover"
                />

                <div className="p-6 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{recipe?.title}</h2>
                    <p className="text-gray-500 mb-4">Publisher: <span className="font-medium text-gray-700">{recipe?.publisher}</span></p>

                    <div className="flex justify-center gap-6 mb-4 text-gray-700">
                        <p><span className="font-semibold">Servings:</span> {recipe?.servings}</p>
                        <p><span className="font-semibold">Time:</span> {recipe?.cooking_time} mins</p>
                    </div>

                    <a
                        href={recipe?.source_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-200"
                    >
                        View Full Recipe
                    </a>
                </div>
            </div>
        </main>
    );
};

export default RecipeDetails;
