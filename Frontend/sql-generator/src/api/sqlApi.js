export const generateSqlFromNaturalLanguage = async (request) =>{
    try {
        const response = await fetch('http://localhost:8686/api/sql/generate',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        })

        const data = await response.json()
        return data;

    } catch (error) {
        
    }


}