const directionsButton = document.querySelector("#directions-button");
const locationStatus = document.querySelector("#location-status");
const destination = "Hội trường C2, Đại học Bách khoa Hà Nội";

directionsButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    openMapWithoutLocation();
    return;
  }

  directionsButton.disabled = true;
  directionsButton.innerHTML =
    'Đang tìm vị trí <span aria-hidden="true">…</span>';
  locationStatus.textContent =
    "Vui lòng cho phép trình duyệt truy cập vị trí của bạn.";

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const origin = `${coords.latitude},${coords.longitude}`;
      const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${encodeURIComponent(destination)}&travelmode=driving`;
      window.open(mapUrl, "_blank", "noopener,noreferrer");
      locationStatus.textContent =
        "Đã mở Google Maps với lộ trình từ vị trí hiện tại.";
      resetDirectionsButton();
    },
    () => {
      locationStatus.textContent =
        "Không lấy được vị trí. Mình mở bản đồ Hội trường C2 để bạn chọn điểm xuất phát nhé.";
      openMapWithoutLocation();
    },
    { enableHighAccuracy: true, timeout: 10000 },
  );
});

function openMapWithoutLocation() {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`;
  window.open(mapUrl, "_blank", "noopener,noreferrer");
  resetDirectionsButton();
}

function resetDirectionsButton() {
  directionsButton.disabled = false;
  directionsButton.innerHTML =
    'Dẫn đường từ vị trí của bạn <span aria-hidden="true">↗</span>';
}
