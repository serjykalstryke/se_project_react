import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";

// New modals / components you'll need
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import {
  getItems,
  addItem,
  deleteItem,
  updateUserProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";

import * as auth from "../../utils/auth.js";

import {
  getWeatherCondition,
  requestWeather,
  parseWeatherData,
  weatherApiKey,
} from "../../utils/weatherAPI";

import { CurrentTemperatureUnitProvider } from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useForm } from "../../hooks/useForm";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [weatherData, setWeatherData] = useState({
    type: "",
    temperature: null,
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);

  const [formError, setFormError] = useState("");

  const {
    values,
    handleChange: originalHandleChange,
    resetForm,
  } = useForm({
    name: "",
    link: "",
    weather: "",
  });

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleChange = (event) => {
    originalHandleChange(event);
    if (formError) setFormError("");
  };

  const resetFormWithError = () => {
    resetForm();
    setFormError("");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setActiveModal("garment");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleClose = () => {
    setActiveModal("");
    setTimeout(() => setSelectedCard(null), 500);
    resetFormWithError();
  };

  const handleAddGarment = (newGarment) => {
    const token = localStorage.getItem("jwt");

    addItem(
      {
        name: newGarment.name,
        imageUrl: newGarment.link,
        weather: newGarment.weather,
      },
      token
    )
      .then((addedItem) => {
        setClothingItems((items) => [addedItem, ...items]);
        resetFormWithError();
        setActiveModal("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeleteGarment = (itemId) => {
    const token = localStorage.getItem("jwt");

    deleteItem(itemId, token)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== itemId)
        );
        setCardToDelete(null);
        setActiveModal("");
        setTimeout(() => setSelectedCard(null), 500);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");

    updateUserProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setActiveModal("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (!isLiked) {
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((items) =>
            items.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.error(err));
    } else {
      removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((items) =>
            items.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.error(err));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const missing = [];
    if (!values.name) missing.push("Name");
    if (!values.link) missing.push("Image URL");
    if (!values.weather) missing.push("Weather Type");

    if (missing.length > 0) {
      let errorMessage;

      if (missing.length === 1) {
        errorMessage = `${missing[0]} is required!`;
      } else if (missing.length === 2) {
        errorMessage = `${missing[0]} and ${missing[1]} are required!`;
      } else {
        const last = missing.pop();
        errorMessage = `${missing.join(", ")}, and ${last} are required!`;
      }

      setFormError(errorMessage);
    } else {
      handleAddGarment(values);
    }
  };

  const handleOpenConfirmModal = (card) => {
    setCardToDelete(card);
    setActiveModal("confirmDelete");
  };

  const handleConfirmDelete = () => {
    if (cardToDelete) {
      handleDeleteGarment(cardToDelete._id);
    }
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    auth
      .register({ name, avatar, email, password })
      .then(() => handleLogin({ email, password }))
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogin = ({ email, password }) => {
    return auth
      .authorize({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          return auth.checkToken(res.token);
        }

        return Promise.reject("No token returned");
      })
      .then((userData) => {
        setCurrentUser(userData);
        setActiveModal("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          setLatitude(40.7128);
          setLongitude(-74.006);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLatitude(40.7128);
      setLongitude(-74.006);
    }

    getItems()
      .then((items) => {
        setClothingItems(items.reverse());
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      return;
    }

    auth
      .checkToken(jwt)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
      });
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      requestWeather(weatherApiKey, latitude, longitude)
        .then((data) => {
          const parsedData = parseWeatherData(data);
          const condition = getWeatherCondition(parsedData.temperature);
          setWeatherData({ ...parsedData, type: condition });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [latitude, longitude]);

  return (
    <CurrentTemperatureUnitProvider
      currentTemperatureUnit={currentTemperatureUnit}
      handleToggleSwitchChange={handleToggleSwitchChange}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      onEditProfile={handleEditProfileClick}
                      onSignOut={handleSignOut}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            isOpen={activeModal === "garment"}
            handleClose={handleClose}
            values={values}
            handleChange={handleChange}
            resetForm={resetFormWithError}
            onSubmit={handleSubmit}
            formError={formError}
          />

          <ItemModal
            isOpen={activeModal === "preview"}
            handleClose={handleClose}
            card={selectedCard}
            handleOpenConfirmModal={handleOpenConfirmModal}
            onCardLike={handleCardLike}
            isLoggedIn={isLoggedIn}
          />

          <ConfirmationModal
            isOpen={activeModal === "confirmDelete"}
            handleClose={handleClose}
            handleConfirmDelete={handleConfirmDelete}
            itemName={cardToDelete?.name}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            handleClose={handleClose}
            onRegister={handleRegister}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            handleClose={handleClose}
            onLogin={handleLogin}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            handleClose={handleClose}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitProvider>
  );
}

export default App;