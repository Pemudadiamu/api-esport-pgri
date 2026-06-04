import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { responseError } from '../error/response-error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const settingsPath = path.join(__dirname, '../../assets/settings.json');
const uploadDir = path.join(__dirname, '../../assets/upload');

const defaultSettings = {
  heroImage: null,
  aboutText: "Images, Videos, PDFs and audio files are supported. Create multi impressions and dynamic directs from the app. Take photos with the mobile app and save them in a note.",
  aboutImage: null,
  gallery: []
};

// Helper to safely read settings
const readSettings = () => {
  try {
    if (!fs.existsSync(settingsPath)) {
      fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 2), 'utf8');
      return defaultSettings;
    }
    const data = fs.readFileSync(settingsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading settings file:", error);
    return defaultSettings;
  }
};

// Helper to safely write settings
const writeSettings = (settings) => {
  try {
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf8');
  } catch (error) {
    console.error("Error writing settings file:", error);
    throw new responseError(500, "Gagal menyimpan pengaturan website.");
  }
};

// Helper to safely delete file from upload directory
const deleteFile = (filename) => {
  if (!filename) return;
  const filePath = path.join(uploadDir, filename);
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error(`Error deleting file ${filename}:`, error);
  }
};

const getSettings = async () => {
  return readSettings();
};

const updateHeroImage = async (filename) => {
  if (!filename) {
    throw new responseError(400, "File gambar hero tidak ditemukan.");
  }
  const settings = readSettings();
  if (settings.heroImage) {
    deleteFile(settings.heroImage);
  }
  settings.heroImage = filename;
  writeSettings(settings);
  return settings;
};

const updateAboutImage = async (filename) => {
  if (!filename) {
    throw new responseError(400, "File gambar about us tidak ditemukan.");
  }
  const settings = readSettings();
  if (settings.aboutImage) {
    deleteFile(settings.aboutImage);
  }
  settings.aboutImage = filename;
  writeSettings(settings);
  return settings;
};

const updateAboutText = async (aboutText) => {
  const settings = readSettings();
  settings.aboutText = aboutText || "";
  writeSettings(settings);
  return settings;
};

const addGalleryItem = async (title, description, filename) => {
  if (!filename) {
    throw new responseError(400, "File gambar galeri tidak ditemukan.");
  }
  const settings = readSettings();
  const newItem = {
    id: Date.now(),
    title: title || "Foto Kegiatan",
    description: description || "Deskripsi Galeri",
    image: filename
  };
  settings.gallery.push(newItem);
  writeSettings(settings);
  return settings;
};

const deleteGalleryItem = async (id) => {
  const settings = readSettings();
  const itemIndex = settings.gallery.findIndex(item => String(item.id) === String(id));
  
  if (itemIndex === -1) {
    throw new responseError(404, "Item galeri tidak ditemukan.");
  }

  const item = settings.gallery[itemIndex];
  deleteFile(item.image);
  
  settings.gallery.splice(itemIndex, 1);
  writeSettings(settings);
  return settings;
};

export default {
  getSettings,
  updateHeroImage,
  updateAboutImage,
  updateAboutText,
  addGalleryItem,
  deleteGalleryItem
};
