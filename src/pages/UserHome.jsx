import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Dropzone from "react-dropzone";
import { BiTrash } from "react-icons/bi";

const url = "http://localhost:8000/api/";

export default function UserHome() {
  const [images, setImages] = useState([]);
  const [inputImage, setInputImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, authToken } = useContext(AuthContext);

  const getImages = async () => {
    //console.log(user);
    const data = await axios({
      method: "GET",
      url: `${url}images/user`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken.access}`,
      },
      data: {
        user_id: user.user_id,
      },
    });
    setImages(data.data);
  };

  useEffect(() => {
    getImages();
  }, []);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("file", inputImage);
      const data = await axios({
        method: "POST",
        url: `${url}images/user/`,
        data: formData,
        headers: {
          Authorization: `Bearer ${authToken.access}`,
        },
      });
      const { id } = data.data;
      setIsSubmitting(false);
      getImage(id);
      getImages();
      setInputImage(null);
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }
  };

  const getImage = async (id) => {
    try {
      const response = await fetch(`${url}images/${id}`, {
        method: "GET",
        responseType: "blob",
      });
      const data = await response.blob();
      // create url
      const href = window.URL.createObjectURL(data);
      // create element, click it, then remove it, to download file
      const downloadLink = document.createElement("a");
      downloadLink.href = href;
      downloadLink.setAttribute("download", "no_bg_img.png");
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImage = async (id) => {
    try {
      await axios({
        method: "DELETE",
        url: `${url}images/user/${id}`,
        headers: {
          Authorization: `Bearer ${authToken.access}`,
        },
      });
      getImages();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 flex overflow-y-hidden bg-slate-900">
      <div className="h-full w-2/3 flex flex-col">
        <h3 className="m-4 font-bold">
          Upload below to remove the background! 👇
        </h3>
        <h3 className="mx-4 font-bold">
          Your previous uploads are saved to the right, available for download!
          👉
        </h3>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-2/3 h-1/2 border border-white p-2 rounded-md bg-white">
            <Dropzone
              accept={{
                "image/png": [".png"],
                "image/jpeg": [".jpg", ".jpeg"],
              }}
              multiple={false}
              onDropAccepted={(acceptedFiles) =>
                setInputImage(acceptedFiles[0])
              }
            >
              {/* pass props to children components*/}
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed border-slate-900 w-full h-full cursor-pointer flex justify-center items-center hover:border-[#a667e4] ${
                    isDragActive && "purple-blue-500"
                  }`}
                >
                  <input {...getInputProps()} />
                  {!inputImage ? (
                    <p>Insert Image Here!</p>
                  ) : (
                    <p>{inputImage.name}</p>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
          <button
            type="submit"
            className={`p-2 mt-6 border-2 rounded-md bg-white hover:border-[#a667e4] hover:scale-105 font-bold ${
              isSubmitting && "opacity-50"
            }`}
            onClick={handleSubmit}
          >
            Submit Image
          </button>
        </div>
      </div>
      <div className="w-1/3 max-h-screen flex flex-col overflow-y-scroll">
        {images.map((image) => {
          return (
            <div key={image.id} className="flex p-4">
              <div className="relative p-4">
                <img
                  src={image.img}
                  className="object-cover hover:scale-105 rounded cursor-pointer"
                  onClick={() => getImage(image.id)}
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <BiTrash
                  className="cursor-pointer text-lg hover:scale-105 text-slate-50"
                  onClick={() => deleteImage(image.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
