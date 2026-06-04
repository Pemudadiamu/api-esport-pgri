import settingService from "../service/setting-service.js";

const getSettings = async (req, res, next) => {
  try {
    const result = await settingService.getSettings();
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
};

const uploadHero = async (req, res, next) => {
  try {
    const filename = req.file ? req.file.filename : null;
    const result = await settingService.updateHeroImage(filename);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
};

const uploadAboutImage = async (req, res, next) => {
  try {
    const filename = req.file ? req.file.filename : null;
    const result = await settingService.updateAboutImage(filename);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
};

const updateAboutText = async (req, res, next) => {
  try {
    const { aboutText } = req.body;
    const result = await settingService.updateAboutText(aboutText);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
};

const uploadGallery = async (req, res, next) => {
  try {
    const filename = req.file ? req.file.filename : null;
    const { title, description } = req.body;
    const result = await settingService.addGalleryItem(title, description, filename);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
};

const deleteGallery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await settingService.deleteGalleryItem(id);
    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
};

export default {
  getSettings,
  uploadHero,
  uploadAboutImage,
  updateAboutText,
  uploadGallery,
  deleteGallery
};
