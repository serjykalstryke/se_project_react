import { useState } from "react";

function LoginModal({ isOpen, handleClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button
          type="button"
          className="modal__close"
          onClick={handleClose}
        />
        <h2 className="modal__title">Log In</h2>

        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Email
            <input
              type="email"
              className="modal__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="modal__label">
            Password
            <input
              type="password"
              className="modal__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="modal__submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;