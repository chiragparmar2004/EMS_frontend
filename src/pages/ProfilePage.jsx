import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const ProfilePage = () => {
  const data = useSelector((state) => state.user.user.data);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // Displaying profile information
  useEffect(() => {
    if (data) {
      console.log("Profile Data:", data);
    }
  }, [data]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      setLoading(true);
      const formData = new FormData();
      formData.append("profileImage", image);

      try {
        const response = await axios.post(
          "http://localhost:8000/api/employee/uploadProfileImage",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setImageUrl(response.data.imagePath); // Assuming the backend sends back the image URL
        alert("Profile image uploaded successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h2>Profile Information</h2>
      <div>
        <p>
          <strong>Full Name:</strong> {data.firstName} {data.lastName}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {data.phoneNumber}
        </p>
        <p>
          <strong>Role:</strong> {data.role}
        </p>
        <p>
          <strong>Gender:</strong> {data.gender}
        </p>
        <p>
          <strong>Position:</strong> {data.position || "Not Provided"}
        </p>
        <p>
          <strong>Date of Joining:</strong>{" "}
          {data.dateOfJoining || "Not Provided"}
        </p>
        <p>
          <strong>Status:</strong> {data.isActive ? "Active" : "Inactive"}
        </p>
        <p>
          <strong>Salary:</strong> {data.salary || "Not Provided"}
        </p>
        <p>
          <strong>Leaves:</strong> {data.leaves.length}
        </p>
      </div>

      {/* Profile Image Upload */}
      <div>
        <label htmlFor="profileImage">Upload Profile Image:</label>
        <input
          type="file"
          id="profileImage"
          onChange={handleImageUpload}
          accept="image/*"
        />
        {image && <p>Selected image: {image.name}</p>}
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Profile" width="200" />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
