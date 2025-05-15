export const calculatePaginationData = ({page, perPage, totalItems}) =>{
    const totalPages = Math.ceil(totalItems / perPage);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    return{
        page,
        perPage,
        totalPages,
        hasPrevPage,
        hasNextPage
    };
};