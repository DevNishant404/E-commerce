import ProductDetails from "@/components/shopping-view/ProductDeatils";
import ProductFilter from "@/components/shopping-view/ProductFilter";
import ShopingProductTile from "@/components/shopping-view/ShopingProductTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { shortOptions } from "@/config";
import { addToCart, fetchCartItem } from "@/store/cart/cartSlice";
import { fetchAllFilteredProducts, fetchProdctDetails } from "@/store/shop/productSlice/productSlice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams){
    const queryParams=[]
    for(const [key,value] of Object.entries(filterParams)){
        if(Array.isArray(value) && value.length>0){
            const paramValue=value.join(',')
            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
        }
    }

    return queryParams.join('&')
}

function Listing() {
  const dispatch = useDispatch();
  const { productList,productDetails } = useSelector((state) => state.shopProducts);
  const { user, isLoading } = useSelector((state) => state.auth)
  const [filters, setFilters] = useState({});
  const [sort, setsort] = useState(null);
  const [openDetailsDailog,setOpenDetailsDailog]=useState(false)
  const [searchPararams,setSearchParams]=useSearchParams()


  function handleSort(value) {
    setsort(value);
  }

  function handleFilter(getsectionId, getCurrentOption) {
    let copyFilters = { ...filters };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getsectionId);

    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getsectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOptions =
        copyFilters[getsectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOptions === -1)
        copyFilters[getsectionId].push(getCurrentOption);
      else copyFilters[getsectionId].splice(indexOfCurrentOptions, 1);
    }

    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  }

  function handleProdctDetails(getCurrentProductID){
    dispatch(fetchProdctDetails(getCurrentProductID))


  }



  function handleAddToCart(getCurrentproductId){

    dispatch(addToCart({ userId:user?.id, productId:getCurrentproductId, quantity :1})).then((data)=>{
      if(data?.payload.success){
        dispatch(fetchCartItem({userId:user?.id}))
      }
    })

  }

  useEffect(()=>{
    if(productDetails !==null) setOpenDetailsDailog(true)
  },[productDetails])

  useEffect(() => {
    setsort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(()=>{
    if(filters && Object.keys(filters).length>0){
        const createQueryString=createSearchParamsHelper(filters)
        setSearchParams(new URLSearchParams(createQueryString))
    }
  },[filters])

  useEffect(()=>{

  })

  useEffect(() => {
    if(filters !==null && sort !==null)
    dispatch(fetchAllFilteredProducts({filterParams:filters,sortParams:sort}));
  }, [dispatch,sort,filters]);


  return (
    <div className=" grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">

      <ProductFilter
        filters={filters}
        handleFilter={handleFilter}
      ></ProductFilter>
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-3 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">All Products</h2>
          <div className=" flex items-center gap-2">
            <span className="text-muted-foreground">
              {productList.length} products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <ArrowUpDownIcon className="w-4 h-4"></ArrowUpDownIcon>
                  Short by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {shortOptions.map((sortitem) => (
                    <DropdownMenuRadioItem
                      value={sortitem.id}
                      className="cursor-pointer"
                      key={sortitem.id}
                    >
                      {sortitem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-2  md:grid-cols-2 lg:grid-cols-3 bg-slate-100 md:gap-4 md:p-1 w-full gap-1">
          {productList && productList.length > 0
            ? productList.map((product) => {
                return (
                  <ShopingProductTile
                  handleAddToCart={handleAddToCart}
                  handleProdctDetails={handleProdctDetails}
                  product={product}></ShopingProductTile>
                );
              })
            : null}
        </div>
      </div>
      {productDetails && (
  <ProductDetails
    open={openDetailsDailog}
    setOpen={setOpenDetailsDailog}
    productDetails={productDetails}
  />
)}
    </div>
  );
}

export default Listing;
