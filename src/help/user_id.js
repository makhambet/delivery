export default({
    id: localStorage.delivery_user_id || null,
    header_download: false,
    token: localStorage.delivery_token || null,
    auth: false,
    totalPrice: 0,
    count: localStorage.delivery_count || 0
})