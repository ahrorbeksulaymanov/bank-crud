import { ActionTypes } from "../constants/action-types";

export const setBrands = (brands) => {
    return {
        type:ActionTypes.SET_BRANDS,
        payload: brands
    }
}

export const setGenders = (genders) => {
    return {
        type:ActionTypes.SET_GENDERS,
        payload: genders
    }
}

export const setDisCounts = (discounts) => {
    return {
        type:ActionTypes.SET_DISCOUNTS,
        payload: discounts
    }
}

export const setSeasons = (seasons) => {
    return {
        type:ActionTypes.SET_SEASONS,
        payload: seasons
    }
}

export const setColors = (colors) => {
    return {
        type:ActionTypes.SET_COLORS,
        payload: colors
    }
}

export const setCategories = (categories) => {
    return {
        type:ActionTypes.SET_CATEGORY,
        payload: categories
    }
}