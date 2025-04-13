import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";

function ProductDetails({ open, setOpen, productDetails }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] lg:max-w-[70vw]">
        <div className="relative  overflow-hidden rounded-lg">
          <img
            src={productDetails.image}
            alt={productDetails.title}
            width={600}
            height={600}
            className="w-full aspect-square object-cover"
            srcset=""
          />
        </div>

        <div className=" gap-6">
          <div className="">
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-xl mt-1 mb-3 font-bold tracking-tight">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`${
                productDetails?.salePrice ? "line-through" : ""
              } font-bold text-xl `}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className={`${""} font-bold text-green-600 text-xl`}>
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center">
            <StarIcon className="w-4 h-4  fill-amber-300  "></StarIcon>
            <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
            <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
            <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
            <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
            <p className="text-muted-foreground">{"(4.5)"}</p>
          </div>
          <div className="mt-5 border-b border-b-gray-300 pb-2">
            <Button className="cursor-pointer rounded mb-3 w-full">
              Add to cart
            </Button>
          </div>
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-4 relative">
              <div className="flex items-center gap-4 ">
                <Avatar className="w-10 h-10 border border-gray-400">
                  <AvatarFallback>NS</AvatarFallback>
                </Avatar>

                <div className=" border border-gray-400 bg-slate-100 w-full px-2 py-1 rounded">
                  <h3 className="felx items-center font-bold tracking-tight">
                    Nishant singh
                  </h3>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is an awsome product
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 ">
                <Avatar className="w-10 h-10 border border-gray-400">
                  <AvatarFallback>NS</AvatarFallback>
                </Avatar>

                <div className=" border border-gray-400 bg-slate-100 w-full px-2 py-1 rounded">
                  <h3 className="felx items-center font-bold tracking-tight">
                    Nishant singh
                  </h3>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is an awsome product
                  </p>
                </div>
              </div>{" "}
              <div className="flex items-center gap-4 ">
                <Avatar className="w-10 h-10 border border-gray-400">
                  <AvatarFallback>NS</AvatarFallback>
                </Avatar>

                <div className=" border border-gray-400 bg-slate-100 w-full px-2 py-1 rounded">
                  <h3 className="felx items-center font-bold tracking-tight">
                    Nishant singh
                  </h3>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is an awsome product
                  </p>
                </div>
              </div>{" "}
              <div className="flex items-center gap-4 ">
                <Avatar className="w-10 h-10 border border-gray-400">
                  <AvatarFallback>NS</AvatarFallback>
                </Avatar>

                <div className=" border border-gray-400 bg-slate-100 w-full px-2 py-1 rounded">
                  <h3 className="felx items-center font-bold tracking-tight">
                    Nishant singh
                  </h3>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is an awsome product
                  </p>
                </div>
              </div>{" "}
              <div className="flex items-center gap-4 ">
                <Avatar className="w-10 h-10 border border-gray-400">
                  <AvatarFallback>NS</AvatarFallback>
                </Avatar>

                <div className=" border border-gray-400 bg-slate-100 w-full px-2 py-1 rounded">
                  <h3 className="felx items-center font-bold tracking-tight">
                    Nishant singh
                  </h3>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                    <StarIcon className="w-4 h-4   fill-amber-300"></StarIcon>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is an awsome product
                  </p>
                </div>
              </div>
              <div className="flex gap-1 ">
                <Input placeholder="Write a review"></Input>
                <Button  className="cursor-pointer">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetails;
