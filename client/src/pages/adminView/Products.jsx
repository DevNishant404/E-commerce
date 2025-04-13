import ImageUpload from "@/components/adminLayout/ImageUpload";
import CommonForm from "@/components/common/CommonForm";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Sheet } from "@/components/ui/sheet";
import { AddProductFormElement } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/productSlice/productSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Producttile from "./Producttile";

const initalFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function Products() {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initalFormData);
  const [imagefile, setimagefile] = useState(null);
  const [uploadedImgUrl, setUploadedImgUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [currentEditedid, setCurrentediteId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();
    currentEditedid !== null
      ? dispatch(
          editProduct({
            id: currentEditedid,
            formData,
          })
        ).then((data) => {
          dispatch(fetchAllProducts());
          setFormData(initalFormData);
          setOpenCreateProductDialog(false);
          setCurrentediteId(null);
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImgUrl,
          })
        ).then((data) => {
          if (data?.meta?.requestStatus === "fulfilled") {
            dispatch(fetchAllProducts());
            setOpenCreateProductDialog(false);
            setimagefile(null);
            setFormData(initalFormData);
            toast.success("Product added successfully");
          }
        });
  }

  function handleDelete(getCurrentProductId){

   console.log(getCurrentProductId)

   dispatch(deleteProduct({
      id:getCurrentProductId
   })).then((data)=>{
      if(data?.payload?.success){
      dispatch(fetchAllProducts())

      }
   })

  }
 

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="flex mb-5 justify-end w-full">
        <Button
          className="cursor-pointer"
          onClick={() => setOpenCreateProductDialog(true)}
        >
          Add new Product
        </Button>
      </div>
      <div className="grid gap-1 sm:gap-4 grid-cols-2  sm:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem,idx) => (
              <Producttile
              key={idx}
                product={productItem}
                setOpenCreateProductDialog={setOpenCreateProductDialog}
                setFormData={setFormData}
                setCurrentediteId={setCurrentediteId}
                handleDelete={handleDelete}
              ></Producttile>
            ))
          : null}
      </div>

      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentediteId(null);
          setFormData(initalFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedid == null ? "Add a New Product" : "Edit Product"}
            </SheetTitle>
          </SheetHeader>

          <div className="py-6 px-3">
            <ImageUpload
              currentEditedid={currentEditedid !== null}
              setImageLoading={setImageLoading}
              imagefile={imagefile}
              setimagefile={setimagefile}
              uploadedImgUrl={uploadedImgUrl}
              setUploadedImgUrl={setUploadedImgUrl}
              imageLoading={imageLoading}
            ></ImageUpload>

            <CommonForm
              buttonText={currentEditedid == null ? "Add" : "Edit"}
              formData={formData}
              onSubmit={onSubmit}
              setFormData={setFormData}
              formControls={AddProductFormElement}
            ></CommonForm>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Products;
