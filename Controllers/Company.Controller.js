const Company = require("../models/Company.Model");

const createCompany = async (req, res) => {
  const {
    companyName,
    preferredNotaryID,
    companyAddressLine1,
    companyAddressLine2,
    companyCity,
    companyState,
    companyZIP,
    primaryContactName,
    primaryContactNumber,
    primaryContactEmailAddress,
    timeZone1,
    secondaryContactName,
    secondaryContactNumber,
    secondaryContactEmailAddress,
    timeZone2,
    thirdContactName,
    thirdContactNumber,
    thirdContactEmailAddress,
    timeZone3,
    fourthContactName,
    fourthContactNumber,
    fourthContactEmailAddress,
    timeZone4,
    requireKBA,
    userId,
  } = req.body;

  try {
    const newCompany = await Company.create({
      companyName,
      preferredNotaryID,
      companyAddressLine1,
      companyAddressLine2,
      companyCity,
      companyState,
      companyZIP,
      primaryContactName,
      primaryContactNumber,
      primaryContactEmailAddress,
      timeZone1,
      secondaryContactName,
      secondaryContactNumber,
      secondaryContactEmailAddress,
      timeZone2,
      thirdContactName,
      thirdContactNumber,
      thirdContactEmailAddress,
      timeZone3,
      fourthContactName,
      fourthContactNumber,
      fourthContactEmailAddress,
      timeZone4,
      requireKBA,
      userId,
    });

    await newCompany.save();

    return res
      .status(201)
      .json({ message: "Company created successfully", company: newCompany });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res
      .status(200)
      .json({ message: "Getting all Companies", companies: companies });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateCompany = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const updateData = req.body;
  console.log(updateData);
  try {
    // Find the company by ID and update with the provided data
    const updatedCompany = await Company.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Validate the update against the model
    });

    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({
      message: "Company updated successfully",
      company: updatedCompany,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the company by ID and delete it
    const deletedCompany = await Company.findByIdAndDelete(id);

    if (!deletedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
