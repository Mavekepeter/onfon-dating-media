import React, { useState,useContext } from 'react';
import { OnfonContext } from '../context/OnfonContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Login = ({ onClose }) => {
  const [state, setState] = useState("register");
  const { backendUrl } = useContext(OnfonContext)
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [town, setTown] = useState("");
  const [county, setCounty] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  const onSubmitHandler = async (e) => {
  e.preventDefault();
  resetMessages();

  try {
    let response;

    if (state === "register") {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("town", town);
      formData.append("county", county);
      if (image) {
        formData.append("image", image);
      }

      response = await axios.post(`${backendUrl}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(response.data.message);
    } else {
      const payload = { email, password };
      response = await axios.post(`${backendUrl}/login`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccess(response.data.message);
      navigate('/match', { state: { user: loggedInUser } });
      console.log("Logged in user:", response.data.user);
    }
  } catch (err) {
    if (err.response) {
      setError(err.response.data.message || "Server error");
    } else {
      setError("Network error occurred.");
    }
  }
};

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center px-4"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmitHandler}
        className={`bg-white rounded-xl shadow-xl border border-gray-200 p-5 sm:p-6 flex flex-col gap-4 overflow-y-auto transition-all duration-300 ease-in-out
          ${state === "register" ? "w-full max-w-xl max-h-[75vh]" : "w-[90%] max-w-md max-h-[65vh]"}`}
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
        </h2>

        {state === "register" && (
          <>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="text-sm font-medium">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-primary" />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium">Phone Number</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-primary" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="text-sm font-medium">Age</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-primary" />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium">Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} required
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-primary">
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="text-sm font-medium">Town</label>
                <input type="text" value={town} onChange={(e) => setTown(e.target.value)} required
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-primary" />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium">County</label>
                <input type="text" value={county} onChange={(e) => setCounty(e.target.value)} required
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-primary" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Profile Picture (optional)</label>
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md" />
            </div>
          </>
        )}

        <div>
          <label className="text-sm font-medium">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-primary" />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="w-full p-2 mt-1 border border-gray-300 rounded-md outline-primary" />
        </div>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        {success && <p className="text-sm text-green-600 text-center">{success}</p>}

        <div className="text-center text-sm text-gray-500">
          {state === "register" ? (
            <p>Already have an account? <span onClick={() => setState("login")} className="text-primary font-medium cursor-pointer">Login</span></p>
          ) : (
            <p>Don’t have an account? <span onClick={() => setState("register")} className="text-primary font-medium cursor-pointer">Register</span></p>
          )}
        </div>

        <button type="submit"
          className="bg-primary hover:bg-primary-dull text-white text-md font-semibold py-2.5 rounded-md">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
