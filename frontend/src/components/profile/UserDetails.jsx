import { useState } from "react";
import { Mail, Phone, MapPin, UserRound, Pencil, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import EditProfileModal from "./EditProfileModal";
import { useEffect } from "react";
import {toast} from "sonner";
import api from "../../api/axios";
import  {update, logout} from "../../store/auth";

function UserDetails() {
  const { isLoggedIn, name, avatar, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.data);

        dispatch(
          update({
            isLoggedIn: true,
            role: res.data.data.role,
            name: res.data.data.name,
            avatar: res.data.data.avatar,
            id: res.data.data._id,
          }),
        );
      } catch (err) {
        console.log(err);
        const message = err.response?.data?.message ||"Unable to fetch from server"
        toast.error(message);
      } finally {
        setLoading(false);
      } 
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        {/* Avatar */}

        <div className="flex flex-col items-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-28 w-28 rounded-full border object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-600 text-5xl font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}

          <h2 className="mt-5 text-3xl font-bold">{user.name}</h2>

          <span className="mt-2 rounded-full bg-blue-100 px-4 py-1 text-sm font-medium capitalize text-blue-700">
            {user.role}
          </span>
        </div>

        {/* Details */}

        <div className="mt-10 space-y-6">
          <div className="flex items-center gap-4">
            <Mail className="text-blue-600" />

            <div>
              <p className="text-sm text-gray-500">Email</p>

              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="text-blue-600" />

            <div>
              <p className="text-sm text-gray-500">Phone</p>

              <p className="font-medium">{user.phone || "Not Added Yet"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="text-blue-600" />

            <div>
              <p className="text-sm text-gray-500">Location</p>

              <p className="font-medium">{user.location || "Not Added Yet"}</p>
            </div>
          </div>
        </div>

        {/* Buttons */}

        <div className="mt-10 flex justify-end gap-4">
          <button
            onClick={() => setEditOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-blue-600 px-5 py-3 font-medium text-blue-600 transition hover:bg-blue-50"
          >
            <Pencil size={18} />
            Edit Profile
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-medium text-white transition hover:bg-red-600">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {editOpen && <EditProfileModal close={() => setEditOpen(false)} />}
    </>
  );
}

export default UserDetails;
