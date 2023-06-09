
function productDTO(product){
        this._id = product._id;
        this.productName = product.productName;
        this.price = product.price;
        this.nature = product.nature;
        this.discription = product.discription;
        this.favorite=product.favorite;
        this.discount=product.discount;
        this.image=product.image;
        this.video=product.video;
    }


module.exports = productDTO;