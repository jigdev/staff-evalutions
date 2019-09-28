import products from './products.js'

let listings = products.products;

export default class ListingRepository {

    // Pagination
    static findAll(page, itensPerPage) {
        return new Promise(r => {
            if (page > 0 && itensPerPage !== null) {
                let offset = (page-1) * itensPerPage

                return r(listings.slice(offset, offset+itensPerPage))
            }

            r(listings)
        })
    }
    // Get total count for pagination
    static countAll () {
        return new Promise(r => {
            return r(listings.length)
        })
    }

}
