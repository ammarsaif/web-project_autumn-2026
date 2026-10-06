import '../App.css'

const menuItems = [
    {
        menu_item_id: 1,
        category_id: 1,
        name: "Sandwich",
        description: "Fresh sandwich with vegetables and cheese.",
        price: 6.50,
        product_type: "Food",
        image_url: "./Sandwich.jpg",
        available: true,
        allergens: ["G", "L"]
    },
    {
        menu_item_id: 2,
        category_id: 2,
        name: "Masala Chai",
        description: "Traditional Indian spiced tea.",
        price: 3.50,
        product_type: "Drink",
        image_url: "./MasalaChai.jpg",
        available: true,
        allergens: ["L"]
    },
    {
        menu_item_id: 3,
        category_id: 1,
        name: "Sushi",
        description: "Fresh sushi selection.",
        price: 9.90,
        product_type: "Food",
        image_url: "./sushi.avif",
        available: true,
        allergens: ["F", "S"]
    }
];

const Menu= ()=>{
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
                                {item.allergens.map((allergen) => (
                                    <div className="allergen" key={allergen}>{allergen}</div>
                                ))}
                            </div>
                            <div className="card-line"></div>
                            <div className='card-bottom'>
                                <h3 className='price'>{item.price} €</h3>
                                <button className="btn"><i class="fa-solid fa-cart-plus"></i></button>
                            </div>
                            
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;