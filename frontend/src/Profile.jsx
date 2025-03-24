import React, { useState, useEffect } from 'react';

const Profile = ({ userProfile, setUserProfile }) => {
  const [profile, setProfile] = useState(null);
  const [newPreference, setNewPreference] = useState('');
  const [newAllergy, setNewAllergy] = useState('');
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const userProfile = await window.canister.eatsmart_backend.getProfile();
      setProfile(userProfile);
    } catch (error) {
      console.error('Error loading profile:', error);
      setSnackbar({
        open: true,
        message: 'Failed to load profile. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const validateInput = (type, value) => {
    if (!value.trim()) {
      return 'This field cannot be empty';
    }
    if (value.length > 50) {
      return 'Input is too long (maximum 50 characters)';
    }
    if (type === 'name' && value.trim().length < 2) {
      return 'Name must be at least 2 characters long';
    }
    return '';
  };

  const handleAddPreference = () => {
    const error = validateInput('preference', newPreference);
    if (error) {
      setErrors({ ...errors, preference: error });
      return;
    }

    if (profile?.dietaryPreferences.includes(newPreference)) {
      setErrors({ ...errors, preference: 'This preference already exists' });
      return;
    }

    setProfile({
      ...profile,
      dietaryPreferences: [...profile.dietaryPreferences, newPreference.trim()],
    });
    setNewPreference('');
    setErrors({ ...errors, preference: '' });
  };

  const handleAddAllergy = () => {
    const error = validateInput('allergy', newAllergy);
    if (error) {
      setErrors({ ...errors, allergy: error });
      return;
    }

    if (profile?.allergies.includes(newAllergy)) {
      setErrors({ ...errors, allergy: 'This allergy already exists' });
      return;
    }

    setProfile({
      ...profile,
      allergies: [...profile.allergies, newAllergy.trim()],
    });
    setNewAllergy('');
    setErrors({ ...errors, allergy: '' });
  };

  const handleRemovePreference = (index) => {
    setProfile({
      ...profile,
      dietaryPreferences: profile.dietaryPreferences.filter((_, i) => i !== index),
    });
  };

  const handleRemoveAllergy = (index) => {
    setProfile({
      ...profile,
      allergies: profile.allergies.filter((_, i) => i !== index),
    });
  };

  const handleSaveProfile = async () => {
    if (!profile) return;

    const nameError = validateInput('name', profile.name);
    if (nameError) {
      setErrors({ ...errors, name: nameError });
      return;
    }

    try {
      setLoading(true);
      await window.canister.eatsmart_backend.updateProfile(profile);
      setSnackbar({
        open: true,
        message: 'Profile saved successfully!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      setSnackbar({
        open: true,
        message: 'Failed to save profile. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-700">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-primary-900 mb-6">Profile</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-secondary-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={profile.name}
              onChange={(e) => {
                setProfile({ ...profile, name: e.target.value });
                setErrors({ ...errors, name: '' });
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.name ? 'border-red-500' : 'border-secondary-300'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-primary-900 mb-4">
              Dietary Preferences
            </h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newPreference}
                onChange={(e) => {
                  setNewPreference(e.target.value);
                  setErrors({ ...errors, preference: '' });
                }}
                placeholder="Add preference"
                className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  errors.preference ? 'border-red-500' : 'border-secondary-300'
                }`}
              />
              <button
                onClick={handleAddPreference}
                disabled={!newPreference.trim()}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
            {errors.preference && (
              <p className="mb-2 text-sm text-red-600">{errors.preference}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {profile.dietaryPreferences.map((pref, index) => (
                <div
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-800"
                >
                  <span>{pref}</span>
                  <button
                    onClick={() => handleRemovePreference(index)}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-primary-900 mb-4">
              Allergies
            </h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newAllergy}
                onChange={(e) => {
                  setNewAllergy(e.target.value);
                  setErrors({ ...errors, allergy: '' });
                }}
                placeholder="Add allergy"
                className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  errors.allergy ? 'border-red-500' : 'border-secondary-300'
                }`}
              />
              <button
                onClick={handleAddAllergy}
                disabled={!newAllergy.trim()}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
            {errors.allergy && (
              <p className="mb-2 text-sm text-red-600">{errors.allergy}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {profile.allergies.map((allergy, index) => (
                <div
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800"
                >
                  <span>{allergy}</span>
                  <button
                    onClick={() => handleRemoveAllergy(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSaveProfile}
          disabled={loading}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </div>

      {snackbar.open && (
        <div
          className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
            snackbar.severity === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {snackbar.message}
        </div>
      )}
    </div>
  );
};

export default Profile; 