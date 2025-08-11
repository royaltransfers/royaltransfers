export const getCoordinates = async (
  options?: PositionOptions
): Promise<{
  status: boolean;
  message: string;
  data: { lat: number; lng: number; accuracy: number } | null;
}> => {
  const defaultOptions: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  if (!navigator.geolocation) {
    return {
      status: false,
      message: "Geolocation is not supported by your browser.",
      data: null,
    };
  }

  if (navigator.permissions) {
    try {
      const status = await navigator.permissions.query({ name: "geolocation" });
      if (status.state === "denied") {
        return {
          status: false,
          message:
            "Location access denied. Please enable it in your browser settings.",
          data: null,
        };
      }
    } catch (error) {
      // Ignore permission API errors
      console.log("Error checking geolocation permissions: ", error);
    }
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (isNaN(position.coords.latitude)) {
          resolve({
            status: false,
            message: "Invalid latitude value received",
            data: null,
          });
          return;
        }

        resolve({
          status: true,
          message: "Location fetched successfully",
          data: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
          },
        });
      },
      (error) => {
        let errorMessage = "Geolocation error: ";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage +=
              "User denied location access. Please enable it in your browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage += "Location request timed out.";
            break;
          default:
            errorMessage += "Unknown error.";
        }

        resolve({
          status: false,
          message: errorMessage,
          data: null,
        });
      },
      options || defaultOptions
    );
  });
};
