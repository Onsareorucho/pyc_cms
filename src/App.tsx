/* eslint-disable */

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Music,
  Image,
  Sparkles,
  Heart,
  Star,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
} from "lucide-react";
import axios from "axios";

// Events Section Component
const EventsSectionContent = ({
  events,
  showEventForm,
  setShowEventForm,
  editingItem,
  setEditingItem,
  eventForm,
  setEventForm,
  handleEventSubmit,
  handleDelete,
  startEdit,
  openEventForm,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <Calendar size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-0">Events Management</h2>
            <p className="text-gray-600 mb-0">
              Create and manage church events
            </p>
          </div>
        </div>
        <button
          onClick={openEventForm}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-red-500 text-white border-none font-bold cursor-pointer hover:shadow-lg transition-all duration-300"
        >
          <Plus size={20} />
          Add Event
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                  <h3 className="text-xl font-bold mb-0">{event.name}</h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {event.short_description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                    {event.category}
                  </span>
                  <span className="flex items-center text-gray-600 text-sm">
                    📍 {event.location}
                  </span>
                  {event.start_time && (
                    <span className="flex items-center text-gray-600 text-sm">
                      📅 {new Date(event.start_time).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(event)}
                  className="p-3 rounded-xl bg-blue-100 text-blue-600 border-none cursor-pointer hover:bg-blue-200 transition-colors duration-200"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="p-3 rounded-xl bg-red-100 text-red-600 border-none cursor-pointer hover:bg-red-200 transition-colors duration-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-screen overflow-auto text-gray-800">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold mb-0">
                  {editingItem ? "Edit Event" : "Create New Event"}
                </h3>
                <button
                  onClick={() => {
                    setShowEventForm(false);
                    setEditingItem(null);
                  }}
                  className="p-3 bg-gray-100 border-none rounded-xl cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Event Name
                    </label>
                    <input
                      type="text"
                      required
                      value={eventForm.name}
                      onChange={(e) =>
                        setEventForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                      placeholder="Enter event name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      required
                      value={eventForm.category}
                      onChange={(e) =>
                        setEventForm((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                      placeholder="e.g., Worship, Community, Youth"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Short Description
                  </label>
                  <input
                    type="text"
                    required
                    value={eventForm.short_description}
                    onChange={(e) =>
                      setEventForm((prev) => ({
                        ...prev,
                        short_description: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                    placeholder="Brief description of the event"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={eventForm.location}
                    onChange={(e) =>
                      setEventForm((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                    placeholder="Event location"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Start Time
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={eventForm.start_time}
                      onChange={(e) =>
                        setEventForm((prev) => ({
                          ...prev,
                          start_time: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      End Time
                    </label>
                    <input
                      type="datetime-local"
                      value={eventForm.end_time}
                      onChange={(e) =>
                        setEventForm((prev) => ({
                          ...prev,
                          end_time: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEventForm(false);
                      setEditingItem(null);
                    }}
                    className="px-6 py-3 border-2 border-gray-200 rounded-xl bg-white cursor-pointer font-medium hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEventSubmit}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-none font-bold cursor-pointer hover:shadow-lg transition-all duration-300"
                  >
                    <Save size={20} />
                    Save Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Music Section Component
const MusicSectionContent = ({
  music,
  showMusicForm,
  setShowMusicForm,
  editingItem,
  setEditingItem,
  musicForm,
  setMusicForm,
  handleMusicSubmit,
  handleDelete,
  startEdit,
  openMusicForm,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-400 to-red-500 text-white">
            <Music size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-0">Music Management</h2>
            <p className="text-gray-600 mb-0">
              Manage worship songs and audio content
            </p>
          </div>
        </div>
        <button
          onClick={openMusicForm}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white border-none font-bold cursor-pointer hover:shadow-lg transition-all duration-300"
        >
          <Plus size={20} />
          Add Music
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {music.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4 flex-1">
                {item.cover_image && (
                  <img
                    src={item.cover_image}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-red-500"></div>
                    <h3 className="text-xl font-bold mb-0">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {item.artist && (
                      <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">
                        🎤 {item.artist}
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                      {item.media_type}
                    </span>
                    {item.category && (
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        {item.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(item)}
                  className="p-3 rounded-xl bg-orange-100 text-orange-600 border-none cursor-pointer hover:bg-orange-200 transition-colors duration-200"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-3 rounded-xl bg-red-100 text-red-600 border-none cursor-pointer hover:bg-red-200 transition-colors duration-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showMusicForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-screen overflow-auto text-gray-800">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold mb-0">
                  {editingItem ? "Edit Music" : "Add New Music"}
                </h3>
                <button
                  onClick={() => {
                    setShowMusicForm(false);
                    setEditingItem(null);
                  }}
                  className="p-3 bg-gray-100 border-none rounded-xl cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      required
                      value={musicForm.title}
                      onChange={(e) =>
                        setMusicForm((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                      placeholder="Song title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">
                      Artist
                    </label>
                    <input
                      type="text"
                      value={musicForm.artist}
                      onChange={(e) =>
                        setMusicForm((prev) => ({
                          ...prev,
                          artist: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                      placeholder="Artist name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Duration (seconds)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={musicForm.duration || ""}
                    onChange={(e) =>
                      setMusicForm((prev) => ({
                        ...prev,
                        duration: e.target.value
                          ? parseInt(e.target.value, 10)
                          : null,
                      }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                    placeholder="Enter duration in seconds"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Music Link
                  </label>
                  <input
                    type="url"
                    required
                    value={musicForm.link_to_music}
                    onChange={(e) =>
                      setMusicForm((prev) => ({
                        ...prev,
                        link_to_music: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                    placeholder="https://example.com/music.mp3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    value={musicForm.description}
                    onChange={(e) =>
                      setMusicForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base resize-none focus:border-blue-500 focus:outline-none transition-colors duration-200"
                    placeholder="Describe the song or audio content"
                  />
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowMusicForm(false);
                      setEditingItem(null);
                    }}
                    className="px-6 py-3 border-2 border-gray-200 rounded-xl bg-white cursor-pointer font-medium hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleMusicSubmit}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-red-500 text-white border-none font-bold cursor-pointer hover:shadow-lg transition-all duration-300"
                  >
                    <Save size={20} />
                    Save Music
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Galleries Section Component
const GalleriesSectionContent = ({
  galleries,
  showGalleryForm,
  setShowGalleryForm,
  editingItem,
  setEditingItem,
  galleryForm,
  setGalleryForm,
  existingGalleryData,
  setExistingGalleryData,
  handleGallerySubmit,
  handleDelete,
  startEdit,
  openGalleryForm,
}) => {
  // Function to handle multiple image selection - appends to existing images
  const handleMultipleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setGalleryForm((prev) => ({
      ...prev,
      gallery_images: [...(prev.gallery_images || []), ...files],
    }));
    e.target.value = '';
  };

  // Function to remove a newly selected image
  const removeNewGalleryImage = (indexToRemove) => {
    setGalleryForm((prev) => ({
      ...prev,
      gallery_images: prev.gallery_images?.filter((_, index) => index !== indexToRemove) || [],
    }));
  };

  // Function to mark an existing image for removal
  const removeExistingImage = (imageId) => {
    setExistingGalleryData((prev) => ({
      ...prev,
      images_to_remove: [...(prev.images_to_remove || []), imageId],
      existing_images: prev.existing_images.filter(img => img.image_id !== imageId),
    }));
  };

  // Function to preview selected images
  const getImagePreview = (file) => {
    return URL.createObjectURL(file);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white">
            <Image size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-0">Gallery Management</h2>
            <p className="text-gray-600 mb-0">
              Organize and showcase church photos
            </p>
          </div>
        </div>
        <button
          onClick={openGalleryForm}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-none font-bold cursor-pointer hover:shadow-lg transition-all duration-300"
        >
          <Plus size={20} />
          Add Gallery
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleries.map((gallery) => (
          <div
            key={gallery.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={gallery.cover_image}
                alt={gallery.alt}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => startEdit(gallery)}
                  className="p-2 rounded-full bg-blue-500 bg-opacity-80 text-white border-none cursor-pointer hover:bg-opacity-100 transition-all duration-200"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(gallery.id)}
                  className="p-2 rounded-full bg-red-500 bg-opacity-80 text-white border-none cursor-pointer hover:bg-opacity-100 transition-all duration-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              {gallery.image_count && (
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black bg-opacity-70 text-white text-sm font-medium">
                  {gallery.image_count} photos
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{gallery.name}</h3>
              <p className="text-gray-600 leading-relaxed">
                {gallery.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {showGalleryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-screen overflow-auto text-gray-800">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold mb-0">
                  {editingItem ? "Edit Gallery" : "Create New Gallery"}
                </h3>
                <button
                  onClick={() => {
                    setShowGalleryForm(false);
                    setEditingItem(null);
                  }}
                  className="p-3 bg-gray-100 border-none rounded-xl cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Gallery Name
                  </label>
                  <input
                    type="text"
                    required
                    value={galleryForm.name}
                    onChange={(e) =>
                      setGalleryForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                    placeholder="Gallery name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    required
                    value={galleryForm.description}
                    onChange={(e) =>
                      setGalleryForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base resize-none focus:border-blue-500 focus:outline-none transition-colors duration-200"
                    placeholder="Describe this gallery"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Cover Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setGalleryForm((prev) => ({
                        ...prev,
                        cover_image: e.target.files[0],
                      }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                  />
                  
                  {/* Show current cover image when editing */}
                  {editingItem && existingGalleryData.cover_image_url && !galleryForm.cover_image && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">Current cover image:</p>
                      <img
                        src={`http://127.0.0.1:8000/${existingGalleryData.cover_image_url}`}
                        alt="Current cover"
                        className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                      />
                    </div>
                  )}
                  
                  {/* Show preview of new cover image */}
                  {galleryForm.cover_image && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">New cover image:</p>
                      <img
                        src={getImagePreview(galleryForm.cover_image)}
                        alt="Cover preview"
                        className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    Gallery Images
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleImageUpload}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base focus:border-blue-500 focus:outline-none transition-colors duration-200"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    You can select multiple images at once. Click "Choose Files" again to add more images to your selection.
                  </p>

                  {/* Show existing gallery images when editing */}
                  {editingItem && existingGalleryData.existing_images && existingGalleryData.existing_images.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-3">
                        Current Gallery Images ({existingGalleryData.existing_images.length})
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {existingGalleryData.existing_images.map((image) => (
                          <div key={image.image_id} className="relative">
                            <img
                              src={`http://127.0.0.1:8000/${image.image_url}`}
                              alt={`Gallery image ${image.image_id}`}
                              className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <button
                              onClick={() => removeExistingImage(image.image_id)}
                              className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white border-none cursor-pointer hover:bg-red-600 transition-colors duration-200"
                            >
                              <X size={14} />
                            </button>
                            <p className="text-xs text-gray-600 mt-1 truncate">
                              Existing Image {image.image_id}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Preview newly selected gallery images */}
                  {galleryForm.gallery_images && galleryForm.gallery_images.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-3">
                        New Images to Add ({galleryForm.gallery_images.length})
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {galleryForm.gallery_images.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={getImagePreview(file)}
                              alt={`Gallery image ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <button
                              onClick={() => removeNewGalleryImage(index)}
                              className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white border-none cursor-pointer hover:bg-red-600 transition-colors duration-200"
                            >
                              <X size={14} />
                            </button>
                            <p className="text-xs text-gray-600 mt-1 truncate">
                              {file.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowGalleryForm(false);
                      setEditingItem(null);
                    }}
                    className="px-6 py-3 border-2 border-gray-200 rounded-xl bg-white cursor-pointer font-medium hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleGallerySubmit}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white border-none font-bold cursor-pointer hover:shadow-lg transition-all duration-300"
                  >
                    <Save size={20} />
                    {editingItem ? "Update Gallery" : "Create Gallery"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Main CMS Component
const CMS = () => {
  const [activeSection, setActiveSection] = useState("events");
  const [events, setEvents] = useState([]);
  const [music, setMusic] = useState([]);
  const [galleries, setGalleries] = useState([]);

  // Events Section Logic
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEventItem, setEditingEventItem] = useState(null);
  const [eventForm, setEventForm] = useState({
    name: "",
    short_description: "",
    long_description: "",
    category: "",
    start_time: "",
    end_time: "",
    location: "",
    link_to_image: "",
  });

  // Music Section Logic
  const [showMusicForm, setShowMusicForm] = useState(false);
  const [editingMusicItem, setEditingMusicItem] = useState(null);
  const [musicForm, setMusicForm] = useState({
    title: "",
    cover_image: "",
    link_to_music: "",
    category: "",
    media_type: "audio",
    description: "",
    artist: "",
    duration: "",
  });

  // Gallery Section Logic
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState(null);
  const [galleryForm, setGalleryForm] = useState({
    name: "",
    description: "",
    cover_image: null,
    gallery_images: [],
  });
  const [existingGalleryData, setExistingGalleryData] = useState({
    cover_image_url: "",
    existing_images: [],
    images_to_remove: [],
  });

  function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = remainingSeconds.toString().padStart(2, "0");

    if (hours > 0) {
      const paddedHours = hours.toString().padStart(2, "0");
      return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    } else {
      return `${paddedMinutes}:${paddedSeconds}`;
    }
  }

  useEffect(() => {
    // Fetch Events
    fetch("http://127.0.0.1:8000/api/events", {
      headers: { Accept: "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const formattedEvents = data.map((event) => {
          const startDate = new Date(event.start_time);
          return {
            id: event.id,
            name: event.name,
            date: startDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            time: startDate.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }),
            location: event.location,
            short_description: event.short_description,
            category: event.category,
            image: event.link_to_image,
            long_description: event.long_description,
            start_time: event.start_time,
            end_time: event.end_time,
          };
        });
        setEvents(formattedEvents);
      })
      .catch((error) => console.error("Error fetching events:", error));

    // Fetch Music
    fetch("http://127.0.0.1:8000/api/music", {
      headers: { Accept: "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const formattedMusic = data.map((music) => ({
          id: music.id,
          title: music.title,
          artist: music.artist,
          duration: formatDuration(music.duration),
          category: music.category,
          description: music.description,
          src: music.link_to_music,
          cover_image: music.cover_image,
          media_type: music.media_type,
          link_to_music: music.link_to_music,
        }));
        setMusic(formattedMusic);
      })
      .catch((error) => console.error("Error fetching music:", error));

    // Fetch Galleries
    fetch("http://127.0.0.1:8000/api/galleries", {
      headers: { Accept: "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const formattedGalleries = data.map((gallery) => ({
          id: gallery.id,
          cover_image: "http://127.0.0.1:8000/" + gallery.cover_image,
          description: gallery.description,
          alt: gallery.name,
          name: gallery.name,
        }));
        setGalleries(formattedGalleries);
      })
      .catch((error) => console.error("Error fetching galleries:", error));
  }, []);

  // Event handlers
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEventItem) {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/events/${editingEventItem.id}`,
          {
            name: eventForm.name,
            category: eventForm.category,
            location: eventForm.location,
            short_description: eventForm.short_description,
            long_description: eventForm.long_description,
            start_time: eventForm.start_time,
            end_time: eventForm.end_time,
            link_to_image: eventForm.link_to_image,
          }
        );
        setEvents((prev) =>
          prev.map((event) =>
            event.id === editingEventItem.id ? { ...event, ...response.data } : event
          )
        );
      } else {
        const response = await axios.post("http://127.0.0.1:8000/api/events", {
          name: eventForm.name,
          category: eventForm.category,
          location: eventForm.location,
          short_description: eventForm.short_description,
          long_description: eventForm.long_description,
          start_time: eventForm.start_time,
          end_time: eventForm.end_time,
          link_to_image: eventForm.link_to_image,
        });
        setEvents((prev) => [...prev, response.data]);
      }
      setShowEventForm(false);
      setEditingEventItem(null);
      clearEventForm();
    } catch (error) {
      console.error("Error submitting event:", error);
      alert("Something went wrong while saving the event.");
    }
  };

  const handleMusicSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMusicItem) {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/music/${editingMusicItem.id}`,
          {
            title: musicForm.title,
            cover_image: musicForm.cover_image,
            category: musicForm.category,
            link_to_music: musicForm.link_to_music,
            media_type: musicForm.media_type,
            description: musicForm.description,
            artist: musicForm.artist,
            duration: musicForm.duration,
          }
        );
        setMusic((prev) =>
          prev.map((item) =>
            item.id === editingMusicItem.id ? { ...item, ...response.data } : item
          )
        );
      } else {
        const response = await axios.post("http://127.0.0.1:8000/api/music", {
          title: musicForm.title,
          cover_image: musicForm.cover_image,
          category: musicForm.category,
          link_to_music: musicForm.link_to_music,
          media_type: musicForm.media_type,
          description: musicForm.description,
          artist: musicForm.artist,
          duration: musicForm.duration,
        });
        setMusic((prev) => [...prev, response.data]);
      }
      setShowMusicForm(false);
      setEditingMusicItem(null);
      clearMusicForm();
    } catch (error) {
      console.error("Error submitting music:", error);
      alert("Something went wrong while saving the music.");
    }
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingGalleryItem) {
        // Update existing gallery
        const formData = new FormData();
        formData.append("name", galleryForm.name);
        formData.append("description", galleryForm.description);
        
        if (galleryForm.cover_image instanceof File) {
          formData.append("cover_image", galleryForm.cover_image);
        }
        
        if (galleryForm.gallery_images && galleryForm.gallery_images.length > 0) {
          galleryForm.gallery_images.forEach((image) => {
            formData.append("files", image);
                    const response =  axios.post(
          `http://127.0.0.1:8000/api/gallery/${editingGalleryItem.id}/images`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
          });
        }
        
        // if (existingGalleryData.images_to_remove && existingGalleryData.images_to_remove.length > 0) {
        //   existingGalleryData.images_to_remove.forEach((imageId) => {
        //     formData.append("remove_image_ids", imageId);
        //   });
        // }



        if (existingGalleryData.images_to_remove && existingGalleryData.images_to_remove.length > 0) {
          await Promise.all(
            existingGalleryData.images_to_remove.map((imageId) =>
              axios.delete(`http://127.0.0.1:8000/api/gallery/images/${imageId}`, {
                headers: { Accept: "application/json" },
              })
            )
          );
        }
        
        setGalleries((prev) =>
          prev.map((item) =>
            item.id === editingGalleryItem.id ? {
              ...item,
              name: response.data.name,
              description: response.data.description,
              cover_image: `http://127.0.0.1:8000/${response.data.cover_image}`,
            } : item
          )
        );
      } else {
        // Create new gallery - Two-step process
        const basicFormData = new FormData();
        basicFormData.append("name", galleryForm.name);
        basicFormData.append("description", galleryForm.description);
        
        if (galleryForm.cover_image instanceof File) {
          basicFormData.append("cover_image", galleryForm.cover_image);
        }

        const createResponse = await axios.post(
          "http://127.0.0.1:8000/api/gallery",
          basicFormData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        const newGalleryId = createResponse.data.id;
        
        if (galleryForm.gallery_images && galleryForm.gallery_images.length > 0) {
          const imagesFormData = new FormData();
          galleryForm.gallery_images.forEach((image) => {
            imagesFormData.append("gallery_images", image);
          });

          await axios.post(
            `http://127.0.0.1:8000/api/gallery/${newGalleryId}/images`,
            imagesFormData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
        }
        
        setGalleries((prev) => [...prev, {
          id: createResponse.data.id,
          name: createResponse.data.name,
          description: createResponse.data.description,
          cover_image: `http://127.0.0.1:8000/${createResponse.data.cover_image}`,
          alt: createResponse.data.name,
        }]);
      }
      
      setShowGalleryForm(false);
      setEditingGalleryItem(null);
      clearGalleryForm();
    } catch (error) {
      console.error("Error submitting gallery:", error);
      alert("Something went wrong while saving the gallery.");
    }
  };

  const clearEventForm = () => {
    setEventForm({
      name: "",
      short_description: "",
      long_description: "",
      category: "",
      start_time: "",
      end_time: "",
      location: "",
      link_to_image: "",
    });
  };

  const clearMusicForm = () => {
    setMusicForm({
      title: "",
      cover_image: "",
      link_to_music: "",
      category: "",
      media_type: "audio",
      description: "",
      artist: "",
      duration: "",
    });
  };

  const clearGalleryForm = () => {
    setGalleryForm({ 
      name: "", 
      description: "", 
      cover_image: null,
      gallery_images: []
    });
    setExistingGalleryData({
      cover_image_url: "",
      existing_images: [],
      images_to_remove: [],
    });
  };

  const handleEventDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/events/${id}`);
      setEvents((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Something went wrong while deleting the event.");
    }
  };

  const handleMusicDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this music?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/music/${id}`);
      setMusic((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting music:", error);
      alert("Something went wrong while deleting the music.");
    }
  };

  const handleGalleryDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this gallery?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/gallery/${id}`);
      setGalleries((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting gallery:", error);
      alert("Something went wrong while deleting the gallery.");
    }
  };

  const startEventEdit = (event) => {
    setEditingEventItem(event);
    setEventForm({
      name: event.name || "",
      short_description: event.short_description || "",
      long_description: event.long_description || "",
      category: event.category || "",
      start_time: event.start_time || "",
      end_time: event.end_time || "",
      location: event.location || "",
      link_to_image: event.link_to_image || "",
    });
    setShowEventForm(true);
  };

  const startMusicEdit = (item) => {
    setEditingMusicItem(item);
    setMusicForm({
      title: item.title || "",
      cover_image: item.cover_image || "",
      link_to_music: item.link_to_music || "",
      category: item.category || "",
      media_type: item.media_type || "audio",
      description: item.description || "",
      artist: item.artist || "",
      duration: item.duration || "",
    });
    setShowMusicForm(true);
  };

  const startGalleryEdit = async (gallery) => {
    setEditingGalleryItem(gallery);
    
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/gallery/${gallery.id}`);
      const fullGalleryData = response.data;
      
      setGalleryForm({
        name: fullGalleryData.name || "",
        description: fullGalleryData.description || "",
        cover_image: null,
        gallery_images: [],
      });
      
      setExistingGalleryData({
        cover_image_url: fullGalleryData.cover_image || "",
        existing_images: fullGalleryData.gallery_images || [],
        images_to_remove: [],
      });
      
    } catch (error) {
      console.error("Error fetching gallery details:", error);
      setGalleryForm({
        name: gallery.name || "",
        description: gallery.description || "",
        cover_image: null,
        gallery_images: [],
      });
      setExistingGalleryData({
        cover_image_url: "",
        existing_images: [],
        images_to_remove: [],
      });
    }
    
    setShowGalleryForm(true);
  };

  const openEventForm = () => {
    clearEventForm();
    setEditingEventItem(null);
    setShowEventForm(true);
  };

  const openMusicForm = () => {
    clearMusicForm();
    setEditingMusicItem(null);
    setShowMusicForm(true);
  };

  const openGalleryForm = () => {
    clearGalleryForm();
    setEditingGalleryItem(null);
    setShowGalleryForm(true);
  };

  const navigationSections = [
    { id: "events", label: "Events", icon: Calendar },
    { id: "music", label: "Music", icon: Music },
    { id: "galleries", label: "Galleries", icon: Image },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case "events":
        return (
          <EventsSectionContent
            events={events}
            showEventForm={showEventForm}
            setShowEventForm={setShowEventForm}
            editingItem={editingEventItem}
            setEditingItem={setEditingEventItem}
            eventForm={eventForm}
            setEventForm={setEventForm}
            handleEventSubmit={handleEventSubmit}
            handleDelete={handleEventDelete}
            startEdit={startEventEdit}
            openEventForm={openEventForm}
          />
        );
      case "music":
        return (
          <MusicSectionContent
            music={music}
            showMusicForm={showMusicForm}
            setShowMusicForm={setShowMusicForm}
            editingItem={editingMusicItem}
            setEditingItem={setEditingMusicItem}
            musicForm={musicForm}
            setMusicForm={setMusicForm}
            handleMusicSubmit={handleMusicSubmit}
            handleDelete={handleMusicDelete}
            startEdit={startMusicEdit}
            openMusicForm={openMusicForm}
          />
        );
      case "galleries":
        return (
          <GalleriesSectionContent
            galleries={galleries}
            showGalleryForm={showGalleryForm}
            setShowGalleryForm={setShowGalleryForm}
            editingItem={editingGalleryItem}
            setEditingItem={setEditingGalleryItem}
            galleryForm={galleryForm}
            setGalleryForm={setGalleryForm}
            existingGalleryData={existingGalleryData}
            setExistingGalleryData={setExistingGalleryData}
            handleGallerySubmit={handleGallerySubmit}
            handleDelete={handleGalleryDelete}
            startEdit={startGalleryEdit}
            openGalleryForm={openGalleryForm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-purple-700 to-blue-700 text-white relative flex items-center justify-center">
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: "8s",
            }}
          >
            {i % 3 === 0 ? (
              <Sparkles size={20} />
            ) : i % 3 === 1 ? (
              <Heart size={16} />
            ) : (
              <Star size={14} />
            )}
          </div>
        ))}
      </div>

      {/* Centered Content */}
      <div className="relative z-10 max-w-6xl w-full p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-white bg-gradient-to-r from-white via-yellow-300 to-green-400 bg-clip-text text-transparent mb-4">
            PYC
          </h1>
          <p className="text-2xl font-bold mb-4">Church Content Management</p>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-green-500 mx-auto rounded"></div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-12">
          <nav className="flex gap-2 p-2 rounded-2xl bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20">
            {navigationSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold border-none cursor-pointer transition-all duration-300 ${
                    activeSection === section.id
                      ? "bg-white text-gray-800"
                      : "bg-transparent text-black hover:bg-white hover:bg-opacity-20"
                  }`}
                >
                  <Icon size={20} />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="bg-white bg-opacity-95 rounded-3xl p-8 text-gray-800 backdrop-blur-2xl border border-white border-opacity-20">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default CMS;
