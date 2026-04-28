// src/components/FileUploader.jsx
function FileUploader({ file, setFile }) {
  return (
    <div className="upload-box">
      <label className="upload-label">上傳租賃契約</label>

      <input
        type="file"
        accept="image/*,.pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {file && (
        <p className="file-name">
          已選擇檔案：{file.name}
        </p>
      )}
    </div>
  );
}

export default FileUploader;