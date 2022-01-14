import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {
  const {id} = useParams();
const [loading, setLoading] = React.useState(false),
      [cocktail, setCocktail] = React.useState(null); 

React.useEffect(() => {
  setLoading(true);
  (async function getCocktail() {
    try {
      const response = await fetch(`${url}${id}`);
      const data = await response.json();
      setLoading(false);

      if (data.drinks) {
        const {strDrink:name, strDrinkThumb: image, strAlcoholic: info, strCategory: category, strGlass: glass, strInstructions: instructions, strIngredient1, strIngredient2, strIngredient3, strIngredient4} = data.drinks[0];
        const igridients = [strIngredient1, strIngredient2, strIngredient3, strIngredient4];
        const newCocktail = {
          name, image, info, category, glass, instructions, igridients
        };
        setCocktail(newCocktail);
      }      
      else {
        setCocktail(null)
      }
    } catch (error) {
      console.log(error);
      setLoading(false);

    }
  })() 
},[id]);
if (loading) {
  return <Loading />
}
if (!cocktail) {
  return <h2 className='section-title'>no cocks here</h2>
}

const {name, image, category, info, glass, instructions, igridients} = cocktail;
// alert(cocktail);
return (
  <section className='section cocktail-section'>
    <Link to='/' className='btn btn-primary'> back </Link> 
    <h2 className='section-title'>{name}</h2> 
    <div className="drink">
      <img src={image} alt="name" />
      <div className="drink-info">
        <p>
          <span className="drink-data">name:</span>
          {name}    
        </p>
        <p>
          <span className="drink-data">info:</span>
          {info}    
        </p>
        <p>
          <span className="drink-data">category:</span>
          {category}    
        </p>
        <p>
          <span className="drink-data">glass:</span>
          {glass}    
        </p>
        <p>
          <span className="drink-data">igridients:</span>
          {igridients.map((item, index) => {
            if (item) {
            //   if (index == igridients.length-1) {
            //     return <span key={index}>{item}</span>
              
                return <span key={index}>{item} |</span> 
            }
            // return (item && index == igridients.length-1) ? 
            //   <span key={index}>{item}</span> :
            // <span key={index}>{item},</span> 
           })}    
        </p>
        <p>
          <span className="drink-data">instructions :</span>
          {instructions }    
        </p>
        
      </div>
    </div>   
  </section>
  )
}

export default SingleCocktail
