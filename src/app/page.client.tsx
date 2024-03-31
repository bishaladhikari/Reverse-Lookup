import React, { useState } from "react";

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [apiKey, setApiKey] = useState("sk_live_66069449cc35be081b0bae9e_key_hp97wtx0116");
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const [isGridView, setIsGridView] = useState(true);

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
    fetch("/process", {
      method: "POST",
      body: formData,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percentCompleted);
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
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

  return (
    <div className="container mt-5">
      <h2>Linkedin Email Reverse Lookup</h2>
      <input
        type="text"
        id="apikey"
        className="form-control mb-3"
        placeholder="API Key"
        value={apiKey}
        onChange={(event) => setApiKey(event.target.value)}
        required
      />
      <div
        className="drag-area"
        id="dragArea"
        onClick={() => document.getElementById("file")?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          const selectedFile = event.dataTransfer.files?.[0];
          if (selectedFile) {
            setFile(selectedFile);
          }
        }}
      >
        Drag & Drop file here or <b>click to browse</b>
      </div>
      <input type="file" id="file" name="file" hidden accept=".xlsx, .xls" onChange={handleFileChange} />
      <button className="btn btn-primary" onClick={handleUpload}>
        Upload
      </button>
      <button className="btn btn-secondary" onClick={toggleView}>
        Toggle View
      </button>
      <div className="progress" style={{ visibility: progress > 0 ? "visible" : "hidden" }}>
        <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }}>
          Uploading: {progress}%
        </div>
      </div>
      <div id="results">
        {isGridView ? (
          results.map((item) => (
            <div className="profile-card" key={item.email}>
              <img
                src={item.profilePicture || "https://via.placeholder.com/100"}
                alt="Profile Picture"
                className="profile-picture"
              />
              <div className="name">{`${item.firstName} ${item.lastName}`}</div>
              <div className="skills">
                <b>{item.headline}</b>
              </div>
              <div className="skills">{item.skills}</div>
            </div>
          ))
        ) : (
          <table className="table table-dark results-table table-visible">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>LinkedIn</th>
                <th>Skills</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item) => (
                <tr key={item.email}>
                  <td>
                    <img
                      src={item.profilePicture || "https://via.placeholder.com/100"}
                      alt="Profile Picture"
                      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                    />
                  </td>
                  <td>{`${item.firstName} ${item.lastName}`}</td>
                  <td>{item.company}</td>
                  <td>{item.email}</td>
                  <td>
                    {item.linkedinUrl && (
                      <a href={item.linkedinUrl} target="_blank" rel="noopener noreferrer">
                        Profile
                      </a>
                    )}
                  </td>
                  <td>{item.skills}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default App;
