function UploadButton({ onUpload, uploading }) {
    return (
      <label className="upload-button">
        {uploading ? "Uploading..." : "Upload Energy Data"}
        <input type="file" accept=".csv" onChange={onUpload} hidden />
      </label>
    );
  }
  
  export default UploadButton;