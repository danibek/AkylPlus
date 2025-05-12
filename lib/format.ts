export const formatPrice = (price: number) => {
    const formatted = new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);

    return `${formatted} ₸`;
};
