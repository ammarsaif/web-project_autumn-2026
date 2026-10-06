import { useState } from 'react';
import '../App.css';

const Admin= ()=> {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [productType, setProductType] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [allergens, setAllergens] = useState("");

    const addItem = async (event) => {
        event.preventDefault();

        const newItem = {
            category_id: 2,
            name: name,
            description: description,
            price: parseFloat(price),
            product_type: productType,
            image_url: imageUrl,
            available: 1,
            allergens: allergens};

        const response = await fetch(
            'http://127.0.0.1:3000/api/menu-items',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'},
                body: JSON.stringify(newItem)
            }
        );
        if (response.ok) {
            alert('Item added!');
        }
    };
    return (
        <section className="admin-section">
            <h2>Admin</h2>
            <div className="admin-add">
                <h3>Add Menu Item</h3>
                <form onSubmit={addItem}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}/>
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}/>
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}/>
                    <input
                        type="text"
                        placeholder="Product type"
                        value={productType}
                        onChange={(event) => setProductType(event.target.value)}/>
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={(event) => setImageUrl(event.target.value)}/>
                    <input
                        type="text"
                        placeholder="Allergens (e.g. gluten,dairy)"
                        value={allergens}
                        onChange={(event) => setAllergens(event.target.value)}/>

                    <button type="submit" className='btn'>Add Item</button>
                </form>
            </div>
        </section>
    );
}

export default Admin;