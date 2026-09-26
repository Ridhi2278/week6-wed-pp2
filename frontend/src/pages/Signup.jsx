import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [membershipStatus, setMembershipStatus] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const response = await fetch("/api/users/signup", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                password,
                phone_number: phoneNumber,
                gender,
                date_of_birth: dateOfBirth,
                membership_status: membershipStatus,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error);
        } else {
            localStorage.setItem("user", JSON.stringify(data));
            setIsAuthenticated(true);
            navigate("/");
        }
    };

    return (
        <div className="signup">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Phone Number:</label>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <label>Gender:</label>
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>

                <label>Date of Birth:</label>
                <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />
                <label>Membership Status:</label>
                <select
                    value={membershipStatus}
                    onChange={(e) => setMembershipStatus(e.target.value)}
                >
                    <option value="">Select Membership Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <button type="submit">Signup</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default Signup;