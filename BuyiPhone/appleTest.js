let products = {
    iPhone12Pro : {
        model: [{
            iphone12pro: {
                name: "iPhone 12 Pro", 
                display: "6.1-inch display", 
                startingPrice: "33,900", 
                modelImage: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-family-hero-all?wid=470&amp;hei=556&amp;fmt=jpeg&amp;qlt=95&amp;.v=1604021662000",
                finish: [
                    {name: "Graphite", 
                    bubble: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-finish-graphite-2020?wid=102&amp;hei=102&amp;fmt=jpeg&amp;qlt=95&amp;.v=1601054548000", 
                    image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-graphite-hero?wid=470&hei=556&fmt=png-alpha&.v=1604021660000"},
                    {name: "Silver", 
                    bubble: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-finish-silver-2020?wid=102&amp;hei=102&amp;fmt=jpeg&amp;qlt=95&amp;.v=1601054548000", 
                    image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-silver-hero?wid=470&hei=556&fmt=png-alpha&.v=1604021661000"},
                    {name: "Gold", 
                    bubble: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-finish-gold-2020?wid=102&amp;hei=102&amp;fmt=jpeg&amp;qlt=95&amp;.v=1601054548000", 
                    image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-gold-hero?wid=470&hei=556&fmt=png-alpha&.v=1604021659000"},
                    {name: "Pacific Blue", 
                    bubble: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-finish-blue-2020?wid=102&amp;hei=102&amp;fmt=jpeg&amp;qlt=95&amp;.v=1601054547000", 
                    image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=470&hei=556&fmt=png-alpha&.v=1604021661000"}
                ],
                capacity: [
                    {size: "128GB", price: "33,900"},
                    {size: "256GB", price: "37,400"},
                    {size: "512GB", price: "44,400"}
                ]
            },
            iphone12promax: {
                name: "iPhone 12 Pro Max", 
                display: "6.7-inch display", 
                startingPrice: "37,900",
                modelImage: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-max-family-hero-all?wid=470&amp;hei=556&amp;fmt=jpeg&amp;qlt=95&amp;.v=1604021663000",
                finish: [
                    {color: "Graphite", 
                    bubble: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-finish-graphite-2020?wid=102&amp;hei=102&amp;fmt=jpeg&amp;qlt=95&amp;.v=1601054548000", 
                    image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-max-graphite-hero?wid=470&hei=556&fmt=png-alpha&.v=1604021658000"},
                    {color: "Silver", 
                    bubble: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-finish-silver-2020?wid=102&amp;hei=102&amp;fmt=jpeg&amp;qlt=95&amp;.v=1601054548000", 
                    image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-max-silver-hero?wid=470&hei=556&fmt=png-alpha&.v=1604021658000"},
                    {color: "Gold", 
                    bubble: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-finish-gold-2020?wid=102&amp;hei=102&amp;fmt=jpeg&amp;qlt=95&amp;.v=1601054548000", 
                    image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-max-gold-hero?wid=470&hei=556&fmt=png-alpha&.v=1604021660000"},
                    {color: "Pacific Blue", 
                    bubble: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-finish-blue-2020?wid=102&amp;hei=102&amp;fmt=jpeg&amp;qlt=95&amp;.v=1601054547000", 
                    image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-pro-max-blue-hero?wid=470&hei=556&fmt=png-alpha&.v=1604021658000"}
                ],
                capacity: [
                    {size: "128GB", price: "37,900"},
                    {size: "256GB", price: "41,400"},
                    {size: "512GB", price: "48,400"}
                ]
            }
        }]

    }

}

let jsonapple = JSON.stringify(products);
console.log(jsonapple);