const User = require("../../models/user.model");
const PreviousYearPaper = require("../../models/paperModel/previousPaper.model");
const Note = require("../../models/NotesModel/notes.model"); // adjust path if needed

// 📊 Admin Dashboard Stats API
module.exports.getAdminStats = async (req, res) => {
  try {
    // Get user stats
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: "admin" });

    // Get paper stats
    const totalPapers = await PreviousYearPaper.countDocuments();
    const totalPaperDownloadsAgg = await PreviousYearPaper.aggregate([
      { $group: { _id: null, total: { $sum: "$downloads" } } },
    ]);
    const totalPaperDownloads =
      totalPaperDownloadsAgg.length > 0 ? totalPaperDownloadsAgg[0].total : 0;

    const totalPaperLikesAgg = await PreviousYearPaper.aggregate([
      { $group: { _id: null, total: { $sum: "$likes" } } },
    ]);
    const totalPaperLikes =
      totalPaperLikesAgg.length > 0 ? totalPaperLikesAgg[0].total : 0;

    // Get notes stats
    const totalNotes = await Note.countDocuments();
    const totalNotesDownloadsAgg = await Note.aggregate([
      { $group: { _id: null, total: { $sum: "$downloads" } } },
    ]);
    const totalNotesDownloads =
      totalNotesDownloadsAgg.length > 0 ? totalNotesDownloadsAgg[0].total : 0;

    const totalNotesLikesAgg = await Note.aggregate([
      { $group: { _id: null, total: { $sum: "$likes" } } },
    ]);
    const totalNotesLikes =
      totalNotesLikesAgg.length > 0 ? totalNotesLikesAgg[0].total : 0;

    // ✅ Send combined response
    res.status(200).json({
      success: true,
      message: "Admin statistics fetched successfully",
      stats: {
        users: {
          total: totalUsers,
          admins: totalAdmins,
          Users: totalUsers - totalAdmins,
        },
        papers: {
          total: totalPapers,
          totalDownloads: totalPaperDownloads,
          totalLikes: totalPaperLikes,
        },
        notes: {
          total: totalNotes,
          totalDownloads: totalNotesDownloads,
          totalLikes: totalNotesLikes,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching admin stats",
    });
  }
};
