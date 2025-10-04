// BWOKCHAINKUN >_<
const zipInput = document.getElementById('zipInput');
const processButton = document.getElementById('processButton');
const fileNameDisplay = document.getElementById('fileName');
const output = document.getElementById('output');

let zipFile = null;

// Menampilkan nama file yang dipilih
zipInput.addEventListener('change', () => {
  const fileName = zipInput.files[0] ? zipInput.files[0].name : translations[currentLang]['no_file_selected'];
  fileNameDisplay.textContent = fileName;
  zipFile = zipInput.files[0];
});

processButton.addEventListener('click', async () => {
  if (!zipFile) {
    alert(translations[currentLang]['alert_select_file']);
    return;
  }

  const zip = new JSZip();
  const zipContent = await zip.loadAsync(zipFile);
  const files = { followers: null, following: null, pending: null };


  // Extract zip yang ada jsonnya
  for (const fileName in zipContent.files) {
    if (fileName.endsWith('followers_1.json')) {
      files.followers = JSON.parse(await zip.file(fileName).async('string'));
    } else if (fileName.endsWith('following.json')) {
      files.following = JSON.parse(await zip.file(fileName).async('string'));
    } else if (fileName.endsWith('pending_follow_requests.json')) {
      files.pending = JSON.parse(await zip.file(fileName).async('string'));
    }
  }

  // Cek file zipnya
  if (!files.followers || !files.following) {
    output.innerText = translations[currentLang]['missing_files'];
    return;
  }
  // Extract follower and following data
  const followersData = files.followers.map(item => ({
    href: item.string_list_data[0].href,
    value: item.string_list_data[0].value
  }));

  const followingData = files.following.relationships_following.map(item => ({
    href: item.string_list_data[0].href,
    // new instagram json update, username is in title, not value
    title: item.title || null,
    // Keep value for older instagram json
    value: item.string_list_data[0].value,
  }));

  // Check if the followingData uses new format (title instead of value)
  const isNewJson = followingData.every(item => item.title && !item.value);
  let notFollowingBack;
  let notFollowedBack;

  // new code for new json update, to compare followers and following
  if (isNewJson) {
     notFollowingBack = followersData.filter(follower =>
    !followingData.some(following => following.title === follower.value)
    );

    notFollowedBack = followingData.filter(following =>
      !followersData.some(follower => follower.value === following.title)
    );
  } else {
    notFollowingBack = followersData.filter(follower =>
    !followingData.some(following => following.value === follower.value)
    );

    notFollowedBack = followingData.filter(following =>
      !followersData.some(follower => follower.value === following.value)
    );
  }

  //Pending follow requests
  let pendingRequests = [];
  if (files.pending?.relationships_follow_requests_sent) {
    pendingRequests = files.pending.relationships_follow_requests_sent.map(item => ({
      href: item.string_list_data[0].href,
      value: item.string_list_data[0].value
    }));
  }

  output.innerHTML = `
    <div class="item">
      <h3>${translations[currentLang]['not_following_you_back']}</h3>
      <script>// Adjust to show title if value is null (new json format)</script>
      <ul>${notFollowedBack.map(user => `<li><a href="${user.href}" target="_blank">${user.value || user.title}</a></li>`).join('')}</ul>
    </div>
    <div class="item">
      <h3>${translations[currentLang]['you_not_following_back']}</h3>
      <script>// Adjust to show title if value is null (new json format)</script>
      <ul>${notFollowingBack.map(user => `<li><a href="${user.href}" target="_blank">${user.value || user.title}</a></li>`).join('')}</ul>
    </div>
    <div class="item">
      <h3>${translations[currentLang]['pending_requests']}</h3>
      <ul>${pendingRequests.length > 0 ? pendingRequests.map(req => `<li><a href="${req.href}" target="_blank">${req.value}</a></li>`).join('') : `<li>${translations[currentLang]['none']}</li>`}</ul>
    </div>
  `;
});