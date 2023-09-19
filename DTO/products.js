
function productDTO(product){
        this._id = product._id;
        this.productName = product.productName;
        this.price = product.price;
        this.category = product.category;
        this.description = product.description;
        this.discount=product.discount;
        this.image=product.image;
        this.video=product.video;
        this.landingImage=product.landingImage;
    }


module.exports = productDTO;