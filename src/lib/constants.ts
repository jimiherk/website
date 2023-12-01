export const firebaseConfig = {
    apiKey: "AIzaSyB-JPPyT83rkhr5FfNI_7Q-waQtWEcb09s",
    authDomain: "jimis-website.firebaseapp.com",
    projectId: "jimis-website",
    storageBucket: "jimis-website.appspot.com",
    messagingSenderId: "189428518300",
    appId: "1:189428518300:web:17cb217ec096290d74cc59",
    measurementId: "G-JP71T9CS2B"
};

export const fileExtensions = {
    "file-code": [
        "js", "ts", "css", "html", "java", "cs",
        "php", "cpp", "rs", "json", "go", "rb",
    ],
    "file-pdf": ["pdf"],
    "file-image": ["png", "jpg", "jpeg", "gif"],
    "file-video": ["mp4"],
    "file-music": ["mp3", "wav"],
    "archive": ["zip", "rar", "7z"],
    "file-exe": ["exe"],
    "file-ppt": ["ppt", "pptx"],
    "file-word": ["doc", "docx"],
}

export const urlRegex = new RegExp(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/);

export const shortUrlBase = "https://short.jimiherken.de/";