import { Label } from "@/components/ui/label";
import axios from "axios";
import { UploadCloudIcon, XIcon, FileIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton"; 

function ImageUpload({ imagefile, setimagefile, uploadedImgUrl, setUploadedImgUrl, setImageLoading, imageLoading ,currentEditedid}) {
    const inputRef = useRef(null);

    function handleImageFileChange(e) {
        console.log(e.target.files);
        const selectedFile = e.target.files?.[0];
        if (selectedFile) setimagefile(selectedFile);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) setimagefile(droppedFile);
    }

    function handleremoveImage() {
        setimagefile(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    async function uploadImageToCloudinary() {
        setImageLoading(true);

        const data = new FormData();
        data.append("my_file", imagefile);

        const response = await axios.post("http://localhost:5000/api/admin/products/upload-image", data);
        console.log(response.data);
        
        if (response.data?.success) {
            setUploadedImgUrl(response.data.result.url);
        }
        setImageLoading(false);
    }

    useEffect(() => {
        if (imagefile !== null) uploadImageToCloudinary();
    }, [imagefile]);

    return (
        <div className="max-w-md w-full mx-auto">
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            
            <div
                
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`border-2 border-dashed p-4 mb-2 rounded-lg flex justify-center items-center`}
            >
                <input
                disabled={currentEditedid}
                    id="image-upload"
                    type="file"
                    className="hidden"
                    ref={inputRef}
                    
                    onChange={handleImageFileChange}
                />

                {!imagefile ? (
                    <Label htmlFor="image-upload" className={`${currentEditedid? "cursor-not-allowed":"cursor-pointer"} flex flex-col justify-center items-center h-32`}>
                        <UploadCloudIcon className="w-10 h-10 text-gray-500 mb-2" />
                        <span className="text-gray-500">Drag & drop or Click to upload image</span>
                    </Label>
                ) : imageLoading ? (
                    <Skeleton className="w-full h-24 rounded-md" />
                ) : (
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-3">
                            <FileIcon className="w-10 h-10 text-gray-500" /> 
                            <p className="text-sm">{imagefile.name}</p>
                        </div>
                        <button
                            className="text-gray-500 hover:text-gray-900"
                            onClick={handleremoveImage}
                        >
                            <XIcon className="w-4 h-4 ml-2" />
                            <span className="sr-only">Remove file</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ImageUpload;
