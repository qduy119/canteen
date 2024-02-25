import axios from "axios";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dlzyiprib/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "bsv3rrlo";

export async function uploadToCloudinary(imageFile, folder) {
    try {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        formData.append("folder", folder);
        return axios.post(CLOUDINARY_URL, formData);
    } catch (error) {
        const { data } = error.response;
        console.log(data?.error?.message);
    }
}
