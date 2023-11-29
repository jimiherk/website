import { fileExtensions } from "$lib/con7stants";
import { getDoc, DocumentReference } from "firebase/firestore";

export function convertBytes(bytes: number) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

    if (bytes == 0) {
        return "n/a";
    }

    const i = Math.floor(Math.log(bytes) / Math.log(1024))

    if (i == 0) {
        return bytes + " " + sizes[i]
    }

    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
}

export function getFileIcon(fileName: string) {
    for (const entry of Object.entries(fileExtensions)) {
        if (entry[1].includes(fileName.split('.')[fileName.split('.').length - 1])) {
            return entry[0];
        }
    }
    return 'file';
}