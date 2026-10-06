import '../App.css'
import Admin from './Admin';
import { useEffect, useState } from 'react';


const Menu= ()=>{
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() =>{
        const fetchMenuItems =async ()=> {
            const response= await fetch("http://127.0.0.1:3000/api/menu-items")
            const data= await response.json();

            data.forEach(item => {
                item.price = parseFloat(item.price);
            });
            setMenuItems(data);
        }

        fetchMenuItems();
    }, []);
    return(
        <div className="restaurants" id="restaurants">
            <h1>Our Menu</h1>
            <div className="restaurant-box">
                {menuItems.map((item) =>(
                    <div className="menu-card" key={item.menu_item_id}>
                        <img src={item.image_url} alt={item.name}/>
                        <div className='card-content'>
                            <h3>{item.name}</h3>
                            <p className="description">{item.description}</p>
                            
                            <div className="allergens">
                                {item.allergens.split(",").map((allergen) => (
                                    <div className="allergen" key={allergen}>
                                        {allergen}
                                    </div>
                                ))}
                            </div>
                            <div className="card-line"></div>
                            <div className='card-bottom'>
                                <h3 className='price'>{item.price.toFixed(2)} €</h3>
                                <button className="btn"><i className="fa-solid fa-cart-plus"></i></button>
                            </div>
                            
                        </div>
                        
                    </div>
                ))}
            </div>
            
            <Admin />
        </div>
    );
};

export default Menu;