import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "server.ts");
async function uploadFile(filePath: string) {
  try {

    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));


    const response = await axios.post(
      "http://localhost:8000/api/upload_file",
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
      }
    );

    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}


const file = fs.readFile(filePath, (err, data) => {
  if (err) {
    console.log(err);
  }
});

uploadFile(filePath);
