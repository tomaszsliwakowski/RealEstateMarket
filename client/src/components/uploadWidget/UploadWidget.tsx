import { createContext, useEffect, useState } from "react";

type ConfigType = {
  cloudName: string;
  uploadPreset: string;
  multiple: boolean;
  maxImageFileSize: number;
  folder: string;
};

type PROPS = {
  uwConfig: ConfigType;
  changeAvatar: Function;
};

const CloudinaryScriptContext = createContext({});

function UploadWidget({ uwConfig, changeAvatar }: PROPS) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      let myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error: unknown, result: any) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            changeAvatar(result.info.secure_url);
          }
        }
      );

      document.getElementById("upload_widget")?.addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={initializeCloudinaryWidget}
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };
