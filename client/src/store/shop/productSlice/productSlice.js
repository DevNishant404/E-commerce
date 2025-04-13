import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
    isLoading:false,
    productList:[],
    productDetails:null
}

export const fetchAllFilteredProducts = createAsyncThunk(
    "/product/fetchAllFilteredProducts",
    async ({ filterParams, sortParams }) => {
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      });
  
      const result = await axios.get(
        `http://localhost:5000/api/shop/products/get?${query}`
      );
  
      return result.data;
    }
  );

  export const fetchProdctDetails=createAsyncThunk("/product/productDetails",async(id)=>{

    const result= await axios.get(`http://localhost:5000/api/shop/products/get/${id}`)
    return result.data
  })

const shopProductSlice=createSlice({
    name:"shoproducts",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchAllFilteredProducts.pending,(state,action)=>{
        state.isLoading=true

       }).addCase(fetchAllFilteredProducts.fulfilled,(state,action)=>{
        state.isLoading=false
        state.productList=action.payload.data
    }).addCase(fetchAllFilteredProducts.rejected,(state,action)=>{
        state.isLoading=false
        state.productList=[]
    }).addCase(fetchProdctDetails.pending,(state,action)=>{
        state.isLoading=true

    }).addCase(fetchProdctDetails.fulfilled,(state,action)=>{
            state.isLoading=false
            state.productDetails=action.payload.data
    }).addCase(fetchProdctDetails.rejected,(state,action)=>{
        state.isLoading=false
        state.productDetails=[]
    })
    }

})

export default shopProductSlice.reducer