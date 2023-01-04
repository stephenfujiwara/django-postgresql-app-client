import Dropzone from "react-dropzone";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";

const url = "https://django-postgresql-app-api.onrender.com/api/";

function Home() {
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("file", image);
      const response = await fetch(`${url}images/`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      const { id } = data;
      setIsSubmitting(false);
      getImage(id);
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
      setImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-4 justify-center items-center font-inter bg-slate-900">
      <h3 className="absolute left-4 top-20 font-bold">
        Note: It may take a little while lol 🤣
      </h3>
      <div className="flex justify-center items-center w-full h-1/3">
        <div className="w-1/3 h-full border border-white bg-white p-2 rounded-md">
          <Dropzone
            accept={{ "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] }}
            multiple={false}
            onDropAccepted={(acceptedFiles) => setImage(acceptedFiles[0])}
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
                {!image ? (
                  <p className="text-black">Insert Image Here!</p>
                ) : (
                  <p className="text-black">{image.name}</p>
                )}
              </div>
            )}
          </Dropzone>
        </div>
        {image && (
          <BiTrash
            className="text-xl cursor-pointer absolute right-[27rem] text-slate-50 hover:scale-105"
            onClick={() => setImage(null)}
          />
        )}
      </div>
      <button
        type="submit"
        className={`p-2 border-2  bg-white rounded-md hover:border-[#a667e4] hover:scale-105 font-bold ${
          isSubmitting && "opacity-50"
        }`}
        onClick={handleSubmit}
      >
        Submit Image
      </button>
    </div>
  );
}

export default Home;
