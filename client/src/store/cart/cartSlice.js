import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response =await axios.post("http://localhost:5000/api/shop/cart/add", {
      userId,
      productId,
      quantity,
    });

    return response.data
  }
);


export const fetchCartItem = createAsyncThunk(
    "cart/fetchCartItem",
    async({userId}) => {
      const response =await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`);
  
      return response.data
    }
  );

  export const delteCartItem = createAsyncThunk(
    "cart/delteCartItem",
    ({ userId, productId }) => {
      const response = axios.delete(`http://localhost:5000/api/shop/cart/${userId}/${productId}`);
  
      return response.data
    }
  );

  export const updateCartQty = createAsyncThunk(
    "cart/updateCartQty",
    ({ userId, productId, quantity }) => {
      const response = axios.put("http://localhost:5000/api/shop/cart/update-cart", {
        userId,
        productId,
        quantity,
      });
  
      return response.data
    }
  );

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(addToCart.pending,(state,action)=>{
        state.isLoading=true
    }).addCase(addToCart.fulfilled,(state,action)=>{
        state.isLoading=false,
        state.cartItems=action.payload.data
    }).addCase(addToCart.rejected,(state,action)=>{
        isLoading:false,
        state.cartItems=[]
    }).addCase(fetchCartItem.pending,(state,action)=>{
        state.isLoading=true

    }).addCase(fetchCartItem.fulfilled,(state,action)=>{
        state.isLoading=false,
        state.cartItems=action.payload.data
    }).addCase(fetchCartItem.rejected,(state,action)=>{
        state.isLoading=false,
        state.cartItems=[]
    }).addCase(delteCartItem.pending,(state,action)=>{
        state.isLoading=true
    }).addCase(delteCartItem.fulfilled,(state,action)=>{
        state.isLoading=false
        state.cartItems=action.payload.data
    }).addCase(delteCartItem.rejected,(state,action)=>{
        state.isLoading=false
        state.cartItems=[]
    }).addCase(updateCartQty.pending,(state,action)=>{
        state.isLoading=true
    }).addCase(updateCartQty.fulfilled,(state,action)=>{
        state.isLoading=false
        state.cartItems=action.payload.data
    }).addCase(updateCartQty.rejected,(state,action)=>{
        state.isLoading=false
        state.cartItems=[]
    })
  },
});

export default shoppingCartSlice.reducer
