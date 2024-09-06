// Fonction asynchrone pour récupérer les informations d'un utilisateur
export const fetchUser = async (token: string) => {
    try {
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
            method: "POST", 
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data.body;
    } catch (error) {
        console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
        throw error;
    }
};