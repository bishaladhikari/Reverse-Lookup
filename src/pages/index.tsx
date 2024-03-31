import React, { useState, useRef } from "react";
import axios from "axios";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}

const App = () => {
    const [file, setFile] = useState<File | null>(null);
    const [apiKey, setApiKey] = useState("sk_live_6609152280437b081c424fba_key_892tvqg15as");
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState<any[]>([]);
    const [isGridView, setIsGridView] = useState(true);
    const [theme, setTheme] = useState("light");
    const fileInput = useRef<HTMLInputElement>(null);    

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }
        if (!apiKey) {
            alert("Please enter an API key.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("apikey", apiKey);

        setProgress(0);

        axios
            .post("/api/process", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 0));
                setProgress(percentCompleted);
            },
            })
            .then((response) => response.data)
            .then((data) => {
            setResults(data.data);
            setProgress(0);
            })
            .catch(() => {
            alert("An error occurred during file upload.");
            setProgress(0);
            });
    };

    const toggleView = () => {
        setIsGridView(!isGridView);
    };

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <div className={`container mx-auto mt-5 ${theme}`}>
            <h2 className="text-2xl font-bold">Linkedin Email Reverse Lookup</h2>
            <button className="theme-toggle" onClick={toggleTheme}>
                {theme === "light" ? "Toggle Off" : "Toggle On"}
            </button>
            <input
                type="text"
                id="apikey"
                className="border border-gray-300 rounded p-2 mb-3"
                placeholder="API Key"
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
                required
            />
            <div
                className={`drag-area ${isGridView ? "grid-view" : "list-view"} mt-4`}
                onClick={() => fileInput.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="drag-icon">
                    Drag & Drop file here or <b>click to browse</b>
                </div>
            </div>
            <input
                type="file"
                id="file"
                name="file"
                hidden
                accept=".xlsx, .xls"
                ref={fileInput}
                onChange={handleFileChange}
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleUpload}>
                Upload
            </button>
            <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-2" onClick={toggleView}>
                {isGridView ? "List View" : "Grid View"}
            </button>
            <div className="progress mt-4">
                <div className={`progress-bar ${theme === "light" ? "bg-blue-500" : "bg-gray-500"}`} role="progressbar" style={{ width: `${progress}%`, borderRadius: "50%" }}></div>
            </div>
            <div className={isGridView ? "grid-view mt-4" : "list-view mt-4"}>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Profile Picture</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Headline</th>
                            <th className="px-4 py-2">Skills</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(results) ? (
                            results.map((item: any) => (
                                <tr key={item.id}>
                                    <td className="border px-4 py-2">
                                        <img src={item.person.photoUrl || "https://via.placeholder.com/100"} alt="Profile Picture" className="rounded-full" style={{ height: "100px", width: "100px" }} />
                                    </td>
                                    <td className="border px-4 py-2">{item.person.firstName + " " + item.person.lastName}</td>
                                    <td className="border px-4 py-2">{item.person.headline}</td>
                                    <td className="border px-4 py-2">{item.person.skills}</td>
                                </tr>
                            ))
                        ) : null}
                    </tbody>
                </table>
            </div>
            <div className="clear"></div>
        </div>
    );
};

export default App;
