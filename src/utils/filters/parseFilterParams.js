export const parseFilterParams = ({type, isFavourite}) =>{
    const filter = {};

    if (type) {
        filter.contactType = type;
    }

    if (typeof isFavourite !== "undefined") {
        filter.isFavourite = isFavourite === "true";
    }
    return filter;
};