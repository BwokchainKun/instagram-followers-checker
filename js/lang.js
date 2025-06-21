const translations = {
  id: {
    title: "Cek Followers Instagram",
    upload_title: "Unggah Berkas Zip dari Instagram",
    upload_zip_label: "Unggah ZIP",
    no_file_selected: "Belum ada berkas dipilih",
    process_button: "Ayo cek pengikutmu",
    how_to_get_json: "Tidak tahu cara mendapatkan file ZIP Instagram? Klik di sini",
    not_following_you_back: "Wah Mereka gak Follow back kamu",
    you_not_following_back: "Kamu jahat banget gak follow back mereka",
    pending_requests: "Permintaan follow kamu masih pending",
    none: "Tidak ada",
    missing_files: "File followers atau following tidak ditemukan.",
    alert_select_file: "Silakan pilih file ZIP terlebih dahulu.",
    already_got: "Sudah mendapatkan file ZIP kamu?",
    check_now: "Cek pengikutmu di sini",
    no_support: "Browser kamu tidak mendukung tag video.",
    videosrc: "video/vv.mp4"
  },
  en: {
    title: "Instagram Follower Checker",
    upload_title: "Upload Zip File From Instagram",
    upload_zip_label: "Upload ZIP",
    no_file_selected: "No file selected",
    process_button: "Let's Find Out",
    how_to_get_json: "Don't know how to get the Instagram JSON ZIP file? Click here",
    not_following_you_back: "They are not following you back",
    you_not_following_back: "The Account that you are not Following Back",
    pending_requests: "Pending Follow Requests",
    none: "None",
    missing_files: "Missing required JSON files (followers or following) in the ZIP.",
    alert_select_file: "Please select a ZIP file first.",
    already_got: "Already got your ZIP file?",
    check_now: "Find your follower here",
    no_support: "Your browser does not support the video tag.",
    videosrc: "video/v2.mp4"
  }
};

let currentLang = 'id';

function updateLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

    const videoSource = document.getElementById('videoSource');
  const video = document.getElementById('videoGuide');
  if (videoSource && video && translations[lang].videosrc) {
    videoSource.src = translations[lang].videosrc;
    video.load();
  }
}