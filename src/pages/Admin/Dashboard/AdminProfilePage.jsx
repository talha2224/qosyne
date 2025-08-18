import React, { useEffect, useState } from 'react';
import config from '../../../config';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminProfilePage = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const qosyne_id = localStorage.getItem("qosyne_id"); // ✅ from login

    // Fetch account details
    const getProfile = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${config.baseUrl2}/single/${qosyne_id}`);
            if (res.status === 200) {
                setFormData({
                    username: res.data.data.username || '',
                    email: res.data.data.email || '',
                    password: '' // don’t pre-fill password
                });
            }
        } catch (error) {
            toast.error("Failed to fetch profile");
        } finally {
            setLoading(false);
        }
    };

    // Update profile
    const handleUpdate = async () => {
        let loader = toast.loading("Updating...");
        try {
            const res = await axios.put(`${config.baseUrl2}/update/${qosyne_id}`, formData);
            if (res.status === 200) {
                toast.dismiss(loader);
                toast.success("Profile updated!");
                setFormData({ ...formData, password: '' }); // clear password field after update
            }
        } catch (error) {
            toast.dismiss(loader);
            toast.error(error.response?.data?.msg || "Update failed");
        }
    };

    useEffect(() => {
        if (qosyne_id) getProfile();
    }, [qosyne_id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Admin Profile</h2>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <form>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mb-3"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mb-3"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password (leave empty if not changing)"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mb-3"
                    />

                    <button
                        type="button"
                        className="w-full bg-[#010080] p-2 rounded text-white"
                        onClick={handleUpdate}
                    >
                        Update Profile
                    </button>
                </form>
            )}
        </div>
    );
};

export default AdminProfilePage;
