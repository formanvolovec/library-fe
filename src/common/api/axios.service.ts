export const prepareAuthHeader = (headers: Record<string, string> = {}) => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            ...headers
        }
    }
}
