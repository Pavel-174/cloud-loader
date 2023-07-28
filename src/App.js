import React, { useState } from 'react';
import './App.scss';
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import "@uppy/dashboard/dist/style.css";
import XHR from "@uppy/xhr-upload";

function App() {

  const [number, setNumber] = useState();
  const [files, setFiles] = useState([]);

  //для загрузки файлов на сервер использованно пакетное решение (uppy)
  const uppy = new Uppy({
    restrictions: {
      minNumberOfFiles: 1,
      maxNumberOfFiles: 100 - number, //блокирую возможность за один раз загрузить файлов больше лимита
      maxTotalFileSize: 1048576, // блокировка возможности загрузить файл размером больше 1мб (число в байтах)
      allowedFileTypes: [
        "image/*",
        "application/*",
        "text/*",
      ], //поддерживаемые форматы (все форматы иизображений, все текстовые форматы и форматы приложений)
    },
  });

  uppy.use(XHR, {
    endpoint: "https://cloud-api.yandex.net/v1/disk/resources/upload",
    formData: true,
    fieldName: "files[]",
    headers: {
      Authorization: `Bearer ${ localStorage.getItem('token') }`,
    },
  })
  .on("upload-success", (response) => {
    console.log('Upload sucses');
  })
  .on("upload-error", (error) => {
    console.log(error);
  });

  return (
    <div className="App">

    </div>
  );
}

export default App;
