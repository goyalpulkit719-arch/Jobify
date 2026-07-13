import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  FiBriefcase,
  FiFileText,
  FiCode,
  FiFolder,
  FiLink,
} from "react-icons/fi";

import api from "../../api/axios";

function CandidateProfileApp() {
  const { candidateId } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/candidate/profile/${candidateId}`);

      setProfile(data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [candidateId]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center">
        Loading Profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center">
        Candidate not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-3xl font-bold mb-8">Candidate Profile</h1>

      {/* Basic Details */}

      <div className="flex items-center gap-5 mb-10">
        {profile.owner.avatar ? (
          <img
            src={profile.owner.avatar}
            alt={profile.owner.name}
            className="w-24 h-24 rounded-full object-cover border"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-4xl font-bold">
            {profile.owner.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-semibold">{profile.owner.name}</h2>

          <p className="text-gray-600">{profile.owner.email}</p>

          <p className="text-gray-500">
            📍 {profile.owner.location || "Location not provided"}
          </p>
        </div>
      </div>

      {/* Headline */}

      <section className="mb-8">
        <div className="flex items-center gap-2 font-semibold text-lg mb-2">
          <FiBriefcase />
          Headline
        </div>

        <p>{profile.headline || "Not Added Yet"}</p>
      </section>

      {/* Bio */}

      <section className="mb-8">
        <div className="flex items-center gap-2 font-semibold text-lg mb-2">
          <FiFileText />
          Bio
        </div>

        <p>{profile.bio || "Not Added Yet"}</p>
      </section>

      {/* Skills */}

      <section className="mb-8">
        <div className="flex items-center gap-2 font-semibold text-lg mb-3">
          <FiCode />
          Skills
        </div>

        <div className="flex flex-wrap gap-2">
          {profile.skills?.length ? (
            profile.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full"
              >
                {skill}
              </span>
            ))
          ) : (
            <p>Not Added Yet</p>
          )}
        </div>
      </section>

      {/* Experience */}

      <section className="mb-8">
        <div className="flex items-center gap-2 font-semibold text-lg mb-2">
          <FiBriefcase />
          Experience
        </div>

        <p>{profile.experience} Year(s)</p>
      </section>

      {/* Projects */}

      <section className="mb-8">
        <div className="flex items-center gap-2 font-semibold text-lg mb-2">
          <FiFolder />
          Projects
        </div>

        {profile.projects?.length ? (
          <ul className="list-disc ml-6 space-y-1">
            {profile.projects.map((project, index) => (
              <li key={index}>{project}</li>
            ))}
          </ul>
        ) : (
          <p>Not Added Yet</p>
        )}
      </section>

      {/* Resume */}

      <section className="mb-8">
        <div className="flex items-center gap-2 font-semibold text-lg mb-2">
          <FiFileText />
          Resume
        </div>

        {profile.resume ? (
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Resume
          </a>
        ) : (
          <p>Not Uploaded Yet</p>
        )}
      </section>

      {/* Links */}

      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <div className="flex items-center gap-2 font-semibold text-lg mb-2">
            <FiLink />
            GitHub
          </div>

          {profile.github ? (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {profile.github}
            </a>
          ) : (
            <p>Not Added Yet</p>
          )}
        </section>

        <section>
          <div className="flex items-center gap-2 font-semibold text-lg mb-2">
            <FiLink />
            LinkedIn
          </div>

          {profile.linkedin ? (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {profile.linkedin}
            </a>
          ) : (
            <p>Not Added Yet</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default CandidateProfileApp;
