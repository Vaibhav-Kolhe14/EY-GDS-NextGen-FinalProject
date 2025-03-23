import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    // const [token, setToken] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate()


    const addToCart = async(itemId, size) => {

        if(!size) {
            toast.error('Select Product Size')
            return;
        }

        let cartData = structuredClone(cartItems);

        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] +=1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData)

        if(token) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/cart/add`, {itemId, size}, {headers: {token}})
                console.log('\nResponse from addTocart controller :', response.data)
            } catch (error) {
                console.log('Error in addToCart context jsx :: ', error)
                toast.error(error.message)
            }
        }
    }


    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems) {
            for(const item in cartItems[items]) {
                try {
                    if(cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    toast.error('Error in getCartCount()')
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;

        setCartItems(cartData)

        if(token) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/cart/update`, {itemId, size, quantity}, {headers: {token}})
                console.log('\nResponse from updateCart controller :', response.data)
            } catch (error) {
                console.log('Error in updateCart context jsx :: ', error)
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            for(const item in cartItems[items]) {
                try {
                    if(cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    toast.error('Error in getCartAmount')
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async() => {
        try {
            const authToken = token || localStorage.getItem('token');

        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/product/list`, {
            headers: { token: authToken }
        });

            if(response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log('Error in getProductsData context :: ', error)
            toast.error(error.message)
        }
    }

    const  getUserCart = async(token) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/cart/get`, {}, {headers: {token}})

            // console.log('Response from getUserCart context :', response.data)

            if(response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log('Error in getUserCart context :: ', error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductsData()
    }, [])

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!token && storedToken) {
            // console.log("Setting token from localStorage");
            setToken(storedToken);
        }
    }, []);
    
    useEffect(() => {
        if (token) {
            // console.log("Fetching user cart with token:", token);
            getUserCart(token);
        }
    }, [token]); 

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        token,
        setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider