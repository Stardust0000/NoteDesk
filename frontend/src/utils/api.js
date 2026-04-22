export async function fetchWithAuth(url, options = {}) {
    let accessToken = localStorage.getItem("accessToken");

    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
            "Authorization": `Bearer ${accessToken}`
        }
    });

    if (response.status !== 401) {
        return response;
    }

    if (options._retry) {
        throw new Error("Already retried. Session expired.");
    }

    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    const refreshResponse = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
    });

    const refreshData = await refreshResponse.json();

    if (refreshResponse.ok) {
        const newAccess = refreshData.access;
        localStorage.setItem("accessToken", newAccess);

        return fetchWithAuth(url, {
            ...options,
            _retry: true,
            headers: {
                ...options.headers,
                "Authorization": `Bearer ${newAccess}`
            }
        });
    } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        throw new Error("Session expired. Please login again.");
    }
}