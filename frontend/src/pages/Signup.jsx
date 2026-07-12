import { useState } from "react";
import { User, Mail, Lock, Phone, MapPin, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import api from "../api/axios";
import { update } from "../store/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Signup() {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
    phone: "",
    location: "",
    avatar: null,
  });

  const [preview, setPreview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("role", formData.role);
      data.append("phone", formData.phone);
      data.append("location", formData.location);
      console.log(data);
      if (formData.avatar) {
        data.append("avatar", formData.avatar);
      }

      const res = await api.post("/auth/register", data);
      dispatch(
        update({
          isLoggedIn: true,
          id: res.data.data._id,
          role: res.data.data.role,
          name: res.data.data.name,
          avatar: res.data.data.avatar,
        }),
      );

      toast.success("User registered successfully");
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Server error";
      toast.error(message);
    }
    finally{
        setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      avatar: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        {/* Header */}

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>

          <p className="mt-2 text-gray-500">
            Join Jobify and start your journey
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {/* Avatar */}

          <div className="flex flex-col items-center">
            {preview ? (
              <img
                src={preview}
                alt="avatar"
                className="h-28 w-28 rounded-full border object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-600 text-5xl font-bold text-white">
                {formData.name ? formData.name.charAt(0).toUpperCase() : "?"}
              </div>
            )}

            <label className="mt-4 flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-50">
              <Camera size={18} />
              Upload Avatar
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatar}
              />
            </label>
          </div>

          {/* Name */}

          <div className="relative">
            <User
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Full Name"
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Email */}

          <div className="relative">
            <Mail
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Password */}

          <div className="relative">
            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Phone */}

          <div className="relative">
            <Phone
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Location */}

          <div className="relative">
            <MapPin
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Role */}

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Register As
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label
                className={`cursor-pointer rounded-xl border p-4 text-center transition ${
                  formData.role === "candidate"
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="candidate"
                  checked={formData.role === "candidate"}
                  onChange={handleChange}
                  hidden
                />
                Candidate
              </label>

              <label
                className={`cursor-pointer rounded-xl border p-4 text-center transition ${
                  formData.role === "company"
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="company"
                  checked={formData.role === "company"}
                  onChange={handleChange}
                  hidden
                />
                Company
              </label>
            </div>
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
          >
            {loading? "Creating Account...." : "Create Account"}
          </button>
        </form>

        {/* Footer */}

        <div className="mt-8 border-t pt-6 text-center">
          <p className="text-gray-500">Already have an account?</p>

          <Link
            to="/login"
            className="mt-3 inline-block font-semibold text-blue-600 hover:text-blue-700"
          >
            Login Instead
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Signup;
