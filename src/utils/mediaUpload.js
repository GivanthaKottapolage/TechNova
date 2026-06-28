import { createClient } from "@supabase/supabase-js";

const url = "https://aprhildkujwqifmzaxvj.supabase.co";
const key =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwcmhpbGRrdWp3cWlmbXpheHZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5OTgxMDcsImV4cCI6MjA5NjU3NDEwN30.E3D4kO78XueDIojocBjawAXyAXG8napvu2yKQSZp28Y";

const supabase = createClient(url, key);

export default function uploadFile(file) {
    return new Promise((resolve, reject) => {
        const timeStamp = Date.now();
        const fileName = timeStamp + "_" + file.name;
        supabase.storage.from("images").upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
        }).then(
            () => {
                const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                resolve(publicUrl);
            }
        ).catch((error) => {
            reject(error);
        })
    });
}
