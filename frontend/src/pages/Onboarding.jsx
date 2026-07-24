import { useState } from "react";
import { useNavigate } from "react-router";
import { updateOnboarding } from "../services/authApi";
import { useAuth } from "../context/AuthContext";

const Onboarding = () => {
  const [selected, setSelected] = useState({
    sneakers: false,
    perfumes: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user, login } = useAuth();

  const toggle = (key) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleContinue = async () => {
    if (!selected.sneakers && !selected.perfumes) {
      setError("Please select at least one collection type");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = await updateOnboarding(selected.sneakers, selected.perfumes);
      const token = localStorage.getItem("token");
      login(data.user, token); // refresh user info in context + localStorage
      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-page">
      <h1>What do you collect?</h1>
      <p>You can always change this later in settings.</p>

      {error && <p className="auth-error">{error}</p>}

      <div className="onboarding-options">
        <button
          type="button"
          className={selected.sneakers ? "option selected" : "option"}
          onClick={() => toggle("sneakers")}
        >
          Sneakers
        </button>

        <button
          type="button"
          className={selected.perfumes ? "option selected" : "option"}
          onClick={() => toggle("perfumes")}
        >
          Perfumes
        </button>
      </div>

      <button
        onClick={handleContinue}
        disabled={loading}
        className="continue-btn"
      >
        {loading ? "Saving..." : "Continue"}
      </button>
    </div>
  );
};

export default Onboarding;
